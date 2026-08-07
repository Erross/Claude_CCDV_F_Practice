(function(){
  "use strict";

  var E = window.ExamEngine;
  var STORE_KEY = "claude-exams:v1:active-attempt";
  var HISTORY_KEY = "claude-exams:v1:history";
  var SCHEMA = 1;
  var HISTORY_LIMIT = 200;   // FIFO cap so storage can't grow without bound

  var state = {
    course: null,
    examQuestions: [],
    scenarioById: {},
    current: 0,
    deadline: null,      // epoch ms; the timer is derived from this, never decremented
    startedAt: null,
    timerId: null,
    submitted: false,
    reviewFilter: "all"
  };

  // ---------- small helpers ----------
  function fmtTime(sec){
    var m = Math.floor(sec / 60), s = sec % 60;
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }
  function $(id){ return document.getElementById(id); }
  function show(id){ $(id).classList.remove("hidden"); }
  function hide(id){ $(id).classList.add("hidden"); }
  function escapeHtml(str){ var d = document.createElement("div"); d.textContent = str; return d.innerHTML; }
  function domainName(id){
    var d = state.course.domains.find(function(x){ return x.id === id; });
    return d ? d.name : id;
  }
  function colorFor(id){ return window.domainColor(state.course, id); }
  function announce(msg){
    var el = $("live-region");
    if (el) el.textContent = msg;
  }

  // ---------- attempt construction ----------
  // Questions are stored by bank index so a saved attempt stays small and never
  // duplicates question text.
  function prepareFromIndex(idx, order){
    var orig = state.course.questions[idx];
    order = order || E.shuffle(orig.o.map(function(_, i){ return i; }));
    return {
      idx: idx,
      order: order,
      domain: orig.d,
      type: orig.t,
      question: orig.q,
      scenario: orig.sc || null,
      options: order.map(function(i){ return orig.o[i]; }),
      correct: orig.c.map(function(ci){ return order.indexOf(ci); }).sort(function(a,b){ return a-b; }),
      explanation: orig.e,
      userAnswer: [],
      flagged: false,
      struck: {}
    };
  }

  function buildAttempt(){
    var indexOf = new Map();
    state.course.questions.forEach(function(q, i){ indexOf.set(q, i); });
    return E.drawQuestions(state.course).map(function(q){
      return prepareFromIndex(indexOf.get(q));
    });
  }

  // ---------- persistence ----------
  function saveAttempt(){
    if (state.submitted || !state.course) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        schema: SCHEMA,
        code: state.course.code,
        fingerprint: E.bankFingerprint(state.course),
        deadline: state.deadline,
        startedAt: state.startedAt,
        current: state.current,
        questions: state.examQuestions.map(function(q){
          return {
            i: q.idx,
            o: q.order,
            a: q.userAnswer,
            f: q.flagged ? 1 : 0,
            s: Object.keys(q.struck).filter(function(k){ return q.struck[k]; }).map(Number)
          };
        })
      }));
    } catch (e) { /* storage unavailable or full — the exam still works, just not resumable */ }
  }

  function clearAttempt(){
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  }

  // ---------- attempt history ----------
  // Results only: score, timing and the per-domain breakdown. No question text and no
  // answers, so the record stays small and reveals nothing about the bank.
  function readHistory(){
    var raw;
    try { raw = localStorage.getItem(HISTORY_KEY); } catch (e) { return { schema: SCHEMA, attempts: [] }; }
    if (!raw) return { schema: SCHEMA, attempts: [] };
    try {
      var h = JSON.parse(raw);
      if (!h || h.schema !== SCHEMA || !Array.isArray(h.attempts)) return { schema: SCHEMA, attempts: [] };
      return h;
    } catch (e) { return { schema: SCHEMA, attempts: [] }; }
  }

  function writeHistory(h){
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch (e) {}
  }

  function recordAttempt(rec){
    var h = readHistory();
    h.attempts.push(rec);
    if (h.attempts.length > HISTORY_LIMIT) h.attempts = h.attempts.slice(-HISTORY_LIMIT);
    writeHistory(h);
  }

  function historyFor(code){
    return readHistory().attempts
      .filter(function(a){ return a.code === code; })
      .sort(function(a, b){ return b.at - a.at; });
  }

  function clearHistory(code){
    var h = readHistory();
    h.attempts = code ? h.attempts.filter(function(a){ return a.code !== code; }) : [];
    writeHistory(h);
  }

  function fmtDate(ms){
    var d = new Date(ms);
    return d.toLocaleDateString(undefined, { day:"numeric", month:"short", year:"numeric" }) +
           " " + d.toLocaleTimeString(undefined, { hour:"2-digit", minute:"2-digit" });
  }

  function exportHistory(){
    var h = readHistory();
    if (!h.attempts.length){ announce("There is no history to export."); return; }
    var blob = new Blob([JSON.stringify(h, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "claude-exam-history-" + new Date().toISOString().slice(0,10) + ".json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 0);
    announce("History exported.");
  }

  function importHistory(file){
    var reader = new FileReader();
    reader.onload = function(){
      var incoming;
      try { incoming = JSON.parse(reader.result); }
      catch (e) { window.alert("That file could not be read as exam history."); return; }
      if (!incoming || incoming.schema !== SCHEMA || !Array.isArray(incoming.attempts)){
        window.alert("That file is not a compatible exam history export.");
        return;
      }
      var h = readHistory();
      var seen = new Set(h.attempts.map(function(a){ return a.code + "@" + a.at; }));
      var added = 0;
      incoming.attempts.forEach(function(a){
        if (!a || typeof a.at !== "number" || !a.code) return;
        var key = a.code + "@" + a.at;
        if (seen.has(key)) return;       // merge rather than duplicate
        seen.add(key); h.attempts.push(a); added++;
      });
      h.attempts.sort(function(x, y){ return x.at - y.at; });
      if (h.attempts.length > HISTORY_LIMIT) h.attempts = h.attempts.slice(-HISTORY_LIMIT);
      writeHistory(h);
      if (state.course) renderHistory();
      window.alert(added + " attempt(s) imported.");
    };
    reader.readAsText(file);
  }

  function readSavedAttempt(){
    var raw;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) { return null; }
    if (!raw) return null;
    var data;
    try { data = JSON.parse(raw); } catch (e) { clearAttempt(); return null; }
    if (!data || data.schema !== SCHEMA) { clearAttempt(); return null; }
    var course = window.getCourse(data.code);
    if (!course) { clearAttempt(); return null; }
    // The bank may have been edited since the attempt was saved; indices would no
    // longer point at the same questions, so the attempt has to be discarded.
    if (data.fingerprint !== E.bankFingerprint(course)) return { stale: true, code: data.code };
    if (typeof data.deadline !== "number" || data.deadline - Date.now() <= 0) { clearAttempt(); return null; }
    return { data: data, course: course };
  }

  function resumeAttempt(saved){
    state.course = saved.course;
    indexScenarios();
    state.examQuestions = saved.data.questions.map(function(rec){
      var q = prepareFromIndex(rec.i, rec.o);
      q.userAnswer = rec.a || [];
      q.flagged = !!rec.f;
      (rec.s || []).forEach(function(i){ q.struck[i] = true; });
      return q;
    });
    state.current = Math.min(saved.data.current || 0, state.examQuestions.length - 1);
    state.deadline = saved.data.deadline;
    state.startedAt = saved.data.startedAt || (saved.data.deadline - saved.course.minutes * 60 * 1000);
    state.submitted = false;
    enterExam();
    announce("Resumed your previous attempt with " + fmtTime(remainingSeconds()) + " remaining.");
  }

  // ---------- course selection ----------
  function indexScenarios(){
    state.scenarioById = {};
    if (E.isScenarioCourse(state.course)){
      state.course.scenarios.forEach(function(s){ state.scenarioById[s.id] = s; });
    }
  }

  function renderCoursePicker(){
    var wrap = $("course-list");
    wrap.innerHTML = "";
    window.getCourses().forEach(function(c){
      var card = document.createElement("button");
      card.type = "button";
      card.className = "course-card";
      card.innerHTML =
        '<span class="cc-code">' + escapeHtml(c.code) + '</span>' +
        '<span class="cc-name">' + escapeHtml(c.name) + '</span>' +
        '<span class="cc-tier">' + escapeHtml(c.tier) + '</span>' +
        '<span class="cc-blurb">' + escapeHtml(c.blurb) + '</span>' +
        '<span class="cc-meta">' +
          '<span>' + c.items + ' questions</span>' +
          '<span>' + c.minutes + ' min</span>' +
          '<span>' + c.questions.length + ' in bank</span>' +
        '</span>';
      card.addEventListener("click", function(){ selectCourse(c.code); });
      wrap.appendChild(card);
    });
  }

  function selectCourse(code){
    state.course = window.getCourse(code);
    indexScenarios();
    renderSplash();
    hide("course-screen"); show("splash-screen");
    $("splash-title").focus();
    window.scrollTo(0,0);
  }

  function renderSplash(){
    var c = state.course;
    $("splash-title").textContent = "Practice for the " + c.name + " – " + c.tier + " exam";
    $("splash-code").textContent = c.code + "//";
    $("splash-sub").textContent =
      c.items + " questions, drawn at random from a bank of " + c.questions.length +
      ", weighted to match the official domain blueprint. Timed to " + c.minutes + " minutes.";
    $("stat-items").textContent = c.items;
    $("stat-time").innerHTML = c.minutes + '<span style="font-size:.9rem">m</span>';
    $("stat-pass").textContent = c.passScore;
    $("stat-bank").textContent = c.questions.length;

    var note = $("format-note");
    if (E.isScenarioCourse(c)){
      note.textContent = "This exam is scenario-based: " + c.scenarioDraw.scenarios +
        " scenarios are drawn from a pool of " + c.scenarios.length + ", with " +
        c.scenarioDraw.perScenario + " questions on each. The draw is balanced by domain " +
        "so each attempt still matches the published weights.";
      note.classList.remove("hidden");
    } else note.classList.add("hidden");

    var bar = $("weight-bar"), legend = $("weight-legend");
    bar.innerHTML = ""; legend.innerHTML = "";
    c.domains.forEach(function(d){
      var seg = document.createElement("div");
      seg.className = "weight-seg";
      seg.style.width = d.weight + "%";
      seg.style.background = colorFor(d.id);
      seg.textContent = d.weight >= 6 ? d.weight + "%" : "";
      bar.appendChild(seg);
      var item = document.createElement("div");
      item.className = "weight-legend-item";
      var count = d.examCount != null ? ", " + d.examCount + " Q" : "";
      item.innerHTML = '<span class="swatch" style="background:' + colorFor(d.id) + '"></span>' +
        escapeHtml(d.name) + ' <span style="color:var(--text-faint)">(' + d.weight + '%' + count + ')</span>';
      legend.appendChild(item);
    });
    bar.setAttribute("aria-label",
      "Domain weighting: " + c.domains.map(function(d){ return d.name + " " + d.weight + " percent"; }).join(", "));
    renderHistory();
  }

  function renderHistory(){
    var c = state.course;
    var list = historyFor(c.code);
    var panel = $("history-panel");
    var body = $("history-body");
    body.innerHTML = "";

    if (!list.length){
      body.innerHTML = '<p class="presubmit-empty">No attempts recorded on this device yet.</p>';
      $("history-stats").textContent = "";
      panel.classList.remove("hidden");
      return;
    }

    var best = list.reduce(function(m, a){ return a.scaled > m.scaled ? a : m; }, list[0]);
    var avg = Math.round(list.reduce(function(s2, a){ return s2 + a.scaled; }, 0) / list.length);
    var passes = list.filter(function(a){ return a.pass; }).length;
    $("history-stats").textContent =
      list.length + " attempt" + (list.length === 1 ? "" : "s") +
      " · best " + best.scaled + " · average " + avg + " · " + passes + " above the pass mark";

    var table = document.createElement("table");
    table.className = "history-table";
    table.innerHTML =
      '<thead><tr><th scope="col">When</th><th scope="col">Score</th>' +
      '<th scope="col">Scaled</th><th scope="col">Time</th><th scope="col">Result</th></tr></thead>';
    var tb = document.createElement("tbody");
    list.slice(0, 10).forEach(function(a){
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td data-label="When">' + escapeHtml(fmtDate(a.at)) + '</td>' +
        '<td data-label="Score" style="font-family:var(--mono)">' + a.correct + ' / ' + a.total + '</td>' +
        '<td data-label="Scaled" style="font-family:var(--mono)">' + a.scaled + '</td>' +
        '<td data-label="Time" style="font-family:var(--mono)">' + fmtTime(a.seconds || 0) + '</td>' +
        '<td data-label="Result"><span class="badge-sm ' + (a.pass ? "pass" : "fail") + '">' +
          (a.pass ? "Pass" : "Fail") + '</span></td>';
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    body.appendChild(table);

    // weakest domains across recent attempts, to point at what to restudy
    var agg = {};
    list.slice(0, 5).forEach(function(a){
      Object.keys(a.domains || {}).forEach(function(id){
        if (!agg[id]) agg[id] = [0, 0];
        agg[id][0] += a.domains[id][0];
        agg[id][1] += a.domains[id][1];
      });
    });
    var weak = Object.keys(agg)
      .filter(function(id){ return agg[id][1] >= 3; })
      .map(function(id){ return { id: id, pct: 100 * agg[id][0] / agg[id][1] }; })
      .sort(function(x, y){ return x.pct - y.pct; }).slice(0, 3);
    if (weak.length){
      var p = document.createElement("p");
      p.className = "history-weak";
      p.innerHTML = "Weakest across your recent attempts: " + weak.map(function(w){
        return '<span class="swatch" style="background:' + colorFor(w.id) + '"></span>' +
               escapeHtml(domainName(w.id)) + " (" + Math.round(w.pct) + "%)";
      }).join(" · ");
      body.appendChild(p);
    }
    panel.classList.remove("hidden");
  }

  // ---------- exam lifecycle ----------
  function startExam(){
    state.examQuestions = buildAttempt();
    state.current = 0;
    state.deadline = Date.now() + state.course.minutes * 60 * 1000;
    state.startedAt = Date.now();
    state.submitted = false;
    saveAttempt();
    enterExam();
  }

  function enterExam(){
    $("exam-code").textContent = state.course.code + "//";
    hide("course-screen"); hide("splash-screen");
    hide("results-screen"); hide("presubmit-screen");
    show("exam-screen");
    renderNavGrid();
    renderQuestion();
    startTimer();
    window.addEventListener("beforeunload", beforeUnloadHandler);
  }

  function beforeUnloadHandler(e){
    if (!state.submitted){ e.preventDefault(); e.returnValue = ""; }
  }

  // ---------- timer ----------
  // Derived from an absolute deadline. A decrementing counter loses time whenever the
  // tab is throttled in the background or the device sleeps.
  function remainingSeconds(){
    return Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
  }

  function startTimer(){
    if (state.timerId) clearInterval(state.timerId);
    updateTimerDisplay();
    state.timerId = setInterval(function(){
      updateTimerDisplay();
      if (remainingSeconds() <= 0){ clearInterval(state.timerId); submitExam(true); }
    }, 1000);
    document.addEventListener("visibilitychange", onVisible);
  }

  function onVisible(){
    if (document.visibilityState === "visible" && !state.submitted){
      updateTimerDisplay();
      if (remainingSeconds() <= 0) submitExam(true);
    }
  }

  var lastAnnouncedBand = null;
  function updateTimerDisplay(){
    var left = remainingSeconds();
    var el = $("timer");
    el.textContent = fmtTime(left);
    el.classList.remove("warn","danger");
    var band = null;
    if (left <= 120){ el.classList.add("danger"); band = "2"; }
    else if (left <= 600){ el.classList.add("warn"); band = "10"; }
    if (band && band !== lastAnnouncedBand){
      lastAnnouncedBand = band;
      announce(band + " minutes remaining.");
    }
  }

  // ---------- navigator ----------
  function renderNavGrid(){
    var grid = $("nav-grid");
    grid.innerHTML = "";
    state.examQuestions.forEach(function(q, i){
      var cell = document.createElement("button");
      cell.type = "button";
      cell.className = "nav-cell";
      cell.textContent = i + 1;
      // Roving tabindex: one stop for the whole grid, arrow keys move within it.
      cell.tabIndex = (i === state.current) ? 0 : -1;
      var status = q.userAnswer.length ? "answered" : "unanswered";
      if (q.flagged) status += ", flagged";
      cell.setAttribute("aria-label", "Question " + (i+1) + ", " + status);
      if (i === state.current) cell.setAttribute("aria-current", "true");
      if (q.userAnswer.length) cell.classList.add("answered");
      if (q.flagged) cell.classList.add("flagged");
      if (i === state.current) cell.classList.add("current");
      cell.addEventListener("click", function(){ goTo(i); });
      cell.addEventListener("keydown", function(ev){
        var cols = 6, next = null;
        if (ev.key === "ArrowRight") next = i + 1;
        else if (ev.key === "ArrowLeft") next = i - 1;
        else if (ev.key === "ArrowDown") next = i + cols;
        else if (ev.key === "ArrowUp") next = i - cols;
        else if (ev.key === "Home") next = 0;
        else if (ev.key === "End") next = state.examQuestions.length - 1;
        if (next === null) return;
        ev.preventDefault();
        next = Math.max(0, Math.min(state.examQuestions.length - 1, next));
        goTo(next);
        var cells = grid.querySelectorAll(".nav-cell");
        if (cells[next]) cells[next].focus();
      });
      grid.appendChild(cell);
    });
  }

  function goTo(i){
    state.current = i;
    renderQuestion();
    saveAttempt();
  }

  // ---------- question ----------
  function renderQuestion(){
    var q = state.examQuestions[state.current];
    $("progress-txt").textContent = "Question " + (state.current+1) + " / " + state.examQuestions.length;
    $("domain-pill").textContent = domainName(q.domain);
    $("type-pill").textContent = q.type === "m" ? "Select all that apply" : "Select one";

    var scWrap = $("scenario-panel");
    if (q.scenario && state.scenarioById[q.scenario]){
      var sc = state.scenarioById[q.scenario];
      $("scenario-title").textContent = sc.title;
      $("scenario-text").textContent = sc.text;
      scWrap.classList.remove("hidden");
    } else scWrap.classList.add("hidden");

    $("q-text").textContent = q.question;
    $("q-legend").textContent =
      "Question " + (state.current+1) + " of " + state.examQuestions.length + ". " +
      (q.type === "m" ? "Select all that apply." : "Select one answer.");

    var flagBtn = $("flag-btn");
    flagBtn.classList.toggle("active", q.flagged);
    flagBtn.setAttribute("aria-pressed", q.flagged ? "true" : "false");
    flagBtn.textContent = q.flagged ? "★ Flagged for review" : "☆ Flag for review";

    var opts = $("options");
    opts.innerHTML = "";
    q.options.forEach(function(optText, idx){
      var inputId = "opt-" + state.current + "-" + idx;
      var row = document.createElement("div");
      row.className = "option-row";
      if (q.struck[idx]) row.classList.add("struck");

      var input = document.createElement("input");
      input.type = q.type === "m" ? "checkbox" : "radio";
      input.name = "q-" + state.current;
      input.id = inputId;
      input.className = "option-input";
      input.checked = q.userAnswer.indexOf(idx) !== -1;
      input.addEventListener("change", function(){ toggleAnswer(q, idx); });

      var label = document.createElement("label");
      label.className = "option-label";
      label.setAttribute("for", inputId);
      label.textContent = optText;

      var strike = document.createElement("button");
      strike.type = "button";
      strike.className = "strike-btn" + (q.struck[idx] ? " active" : "");
      strike.setAttribute("aria-pressed", q.struck[idx] ? "true" : "false");
      strike.setAttribute("aria-label", "Rule out option: " + optText);
      strike.textContent = "S̶";
      strike.addEventListener("click", function(){
        q.struck[idx] = !q.struck[idx];
        row.classList.toggle("struck", !!q.struck[idx]);
        strike.classList.toggle("active", !!q.struck[idx]);
        strike.setAttribute("aria-pressed", q.struck[idx] ? "true" : "false");
        saveAttempt();
      });

      row.appendChild(input);
      row.appendChild(label);
      row.appendChild(strike);
      opts.appendChild(row);
    });

    $("prev-btn").disabled = state.current === 0;
    $("next-btn").textContent =
      state.current === state.examQuestions.length - 1 ? "Review & submit" : "Next →";
    renderNavGrid();
  }

  function toggleAnswer(q, idx){
    if (q.type === "s") q.userAnswer = [idx];
    else {
      var pos = q.userAnswer.indexOf(idx);
      if (pos === -1) q.userAnswer.push(idx); else q.userAnswer.splice(pos, 1);
    }
    renderNavGrid();
    saveAttempt();
  }

  function toggleFlag(){
    var q = state.examQuestions[state.current];
    q.flagged = !q.flagged;
    renderQuestion();
    saveAttempt();
    announce(q.flagged ? "Question flagged." : "Flag removed.");
  }

  function goPrev(){ if (state.current > 0) goTo(state.current - 1); }
  function goNext(){
    if (state.current < state.examQuestions.length - 1) goTo(state.current + 1);
    else openPresubmit();
  }

  // ---------- pre-submission review ----------
  function openPresubmit(){
    var unanswered = [], flagged = [];
    state.examQuestions.forEach(function(q, i){
      if (!q.userAnswer.length) unanswered.push(i);
      if (q.flagged) flagged.push(i);
    });

    $("presubmit-summary").textContent =
      state.examQuestions.length + " questions · " +
      (state.examQuestions.length - unanswered.length) + " answered · " +
      unanswered.length + " unanswered · " + flagged.length + " flagged";

    function fill(containerId, list, emptyMsg){
      var el = $(containerId);
      el.innerHTML = "";
      if (!list.length){
        el.innerHTML = '<p class="presubmit-empty">' + emptyMsg + '</p>';
        return;
      }
      var grid = document.createElement("div");
      grid.className = "presubmit-grid";
      list.forEach(function(i){
        var b = document.createElement("button");
        b.type = "button";
        b.className = "nav-cell";
        b.textContent = i + 1;
        b.setAttribute("aria-label", "Go to question " + (i+1));
        b.addEventListener("click", function(){
          hide("presubmit-screen"); show("exam-screen");
          goTo(i);
          $("q-text").focus();
        });
        grid.appendChild(b);
      });
      el.appendChild(grid);
    }

    fill("presubmit-unanswered", unanswered, "Every question has an answer.");
    fill("presubmit-flagged", flagged, "No questions are flagged.");

    $("presubmit-timer").textContent = fmtTime(remainingSeconds()) + " remaining";
    hide("exam-screen"); show("presubmit-screen");
    $("presubmit-heading").focus();
    window.scrollTo(0,0);
  }

  function closePresubmit(){
    hide("presubmit-screen"); show("exam-screen");
    renderQuestion();
  }

  // ---------- scoring ----------
  function isCorrect(q){
    var a = q.userAnswer.slice().sort(), c = q.correct.slice().sort();
    if (a.length !== c.length) return false;
    for (var i=0;i<a.length;i++) if (a[i] !== c[i]) return false;
    return true;
  }

  function submitExam(auto){
    if (state.submitted) return;
    state.submitted = true;
    clearInterval(state.timerId);
    document.removeEventListener("visibilitychange", onVisible);
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    clearAttempt();
    renderResults();
    hide("exam-screen"); hide("presubmit-screen"); show("results-screen");
    $("results-heading").focus();
    window.scrollTo(0,0);
    if (auto) announce("Time expired. Your exam was submitted automatically.");
  }

  function renderResults(){
    var c = state.course;
    var total = state.examQuestions.length, correctCount = 0, byDomain = {};
    state.examQuestions.forEach(function(q){
      if (!byDomain[q.domain]) byDomain[q.domain] = { correct:0, total:0 };
      byDomain[q.domain].total++;
      if (isCorrect(q)){ correctCount++; byDomain[q.domain].correct++; }
    });

    var pct = Math.round((correctCount/total)*100);
    var scaled = Math.round(100 + (correctCount/total) * 900);
    var pass = scaled >= c.passScore;

    $("score-pct").textContent = pct + "%";
    $("score-detail").textContent =
      correctCount + " / " + total + " correct · approx. scaled score " + scaled +
      " / 1000 (" + c.passScore + " to pass)";
    var badge = $("pass-badge");
    badge.textContent = pass ? "Likely pass" : "Likely fail";
    badge.className = "badge " + (pass ? "pass" : "fail");

    // Compare against history before this attempt is written into it.
    var prior = historyFor(c.code);
    var cmp = $("score-compare");
    if (prior.length){
      var bestBefore = Math.max.apply(null, prior.map(function(a){ return a.scaled; }));
      var avgBefore = Math.round(prior.reduce(function(s2, a){ return s2 + a.scaled; }, 0) / prior.length);
      var delta = scaled - avgBefore;
      cmp.textContent =
        "Attempt " + (prior.length + 1) + " on this device · " +
        (scaled > bestBefore ? "a new best (previous best " + bestBefore + ")"
                             : "best so far " + bestBefore) +
        " · " + (delta === 0 ? "level with" : (delta > 0 ? "+" + delta + " above" : delta + " below")) +
        " your average";
      cmp.classList.remove("hidden");
    } else {
      cmp.textContent = "First attempt recorded on this device.";
      cmp.classList.remove("hidden");
    }

    var domainRec = {};
    Object.keys(byDomain).forEach(function(id){
      domainRec[id] = [byDomain[id].correct, byDomain[id].total];
    });
    recordAttempt({
      code: c.code,
      at: Date.now(),
      correct: correctCount,
      total: total,
      scaled: scaled,
      pass: pass,
      seconds: state.startedAt ? Math.round((Date.now() - state.startedAt) / 1000) : 0,
      domains: domainRec
    });

    var tbody = $("domain-table-body");
    tbody.innerHTML = "";
    c.domains.forEach(function(d){
      var stat = byDomain[d.id];
      if (!stat) return;
      var dpct = stat.total ? Math.round((stat.correct/stat.total)*100) : 0;
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td data-label="Domain">' + escapeHtml(d.name) + '</td>' +
        '<td data-label="Correct" style="font-family:var(--mono)">' + stat.correct + ' / ' + stat.total + '</td>' +
        '<td data-label="Progress"><div class="mini-bar-track"><div class="mini-bar-fill" style="width:' +
          dpct + '%; background:' + colorFor(d.id) + '"></div></div></td>' +
        '<td data-label="Percent" style="font-family:var(--mono); text-align:right">' + dpct + '%</td>';
      tbody.appendChild(tr);
    });

    renderReviewList();
  }

  function renderReviewList(){
    var list = $("review-list");
    list.innerHTML = "";
    var shown = 0;
    state.examQuestions.forEach(function(q, i){
      var correct = isCorrect(q);
      if (state.reviewFilter === "incorrect" && correct) return;
      if (state.reviewFilter === "flagged" && !q.flagged) return;
      if (state.reviewFilter === "unanswered" && q.userAnswer.length) return;
      shown++;

      var item = document.createElement("div");
      item.className = "review-item";
      var bodyId = "review-body-" + i;

      var head = document.createElement("button");
      head.type = "button";
      head.className = "review-head";
      head.setAttribute("aria-expanded", "false");
      head.setAttribute("aria-controls", bodyId);
      head.innerHTML =
        '<span class="status-dot ' + (correct ? "correct" : "incorrect") + '"></span>' +
        '<span class="qnum">Q' + (i+1) + '</span>' +
        '<span class="q-summary">' + escapeHtml(q.question) + '</span>' +
        '<span class="sr-only">' + (correct ? "Correct" : "Incorrect") + '</span>';

      var body = document.createElement("div");
      body.className = "review-body hidden";
      body.id = bodyId;

      var yourAns = q.userAnswer.length
        ? q.userAnswer.map(function(idx){ return q.options[idx]; }).join("; ")
        : "(no answer selected)";
      var correctAns = q.correct.map(function(idx){ return q.options[idx]; }).join("; ");
      var scLine = (q.scenario && state.scenarioById[q.scenario])
        ? '<div><strong>Scenario:</strong> ' + escapeHtml(state.scenarioById[q.scenario].title) + '</div>' : '';

      body.innerHTML =
        '<div><strong>Domain:</strong> ' + escapeHtml(domainName(q.domain)) + '</div>' + scLine +
        '<div class="your-ans"><strong>Your answer:</strong> ' + escapeHtml(yourAns) + '</div>' +
        '<div class="correct-ans"><strong>Correct answer:</strong> ' + escapeHtml(correctAns) + '</div>' +
        '<div class="exp">' + escapeHtml(q.explanation) + '</div>';

      head.addEventListener("click", function(){
        var open = body.classList.toggle("hidden");
        head.setAttribute("aria-expanded", open ? "false" : "true");
      });

      item.appendChild(head); item.appendChild(body);
      list.appendChild(item);
    });

    if (!shown){
      list.innerHTML = '<p class="presubmit-empty">Nothing matches this filter.</p>';
    }
    $("review-count").textContent = shown + " shown";
  }

  function setFilter(f, btn){
    state.reviewFilter = f;
    $("history-export").addEventListener("click", exportHistory);
    $("history-import").addEventListener("click", function(){ $("history-file").click(); });
    $("history-file").addEventListener("change", function(){
      if (this.files && this.files[0]) importHistory(this.files[0]);
      this.value = "";
    });
    $("history-clear").addEventListener("click", function(){
      if (!state.course) return;
      if (!window.confirm("Delete recorded attempts for " + state.course.code + " on this device?")) return;
      clearHistory(state.course.code);
      renderHistory();
      announce("History cleared for this certification.");
    });

    Array.prototype.forEach.call(document.querySelectorAll(".filter-btn"), function(b){
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    renderReviewList();
  }

  // ---------- navigation between screens ----------
  function retake(){
    // Re-render so the history panel reflects the attempt just completed.
    renderSplash();
    hide("results-screen"); show("splash-screen");
    $("splash-title").focus();
    window.scrollTo(0,0);
  }
  function changeCourse(){
    hide("results-screen"); hide("splash-screen"); show("course-screen");
    window.scrollTo(0,0);
  }

  function abandonAttempt(){
    if (!window.confirm("Discard the attempt in progress?")) return;
    state.submitted = true;
    clearInterval(state.timerId);
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    clearAttempt();
    hide("exam-screen"); hide("presubmit-screen"); show("course-screen");
  }

  // ---------- boot ----------
  document.addEventListener("DOMContentLoaded", function(){
    renderCoursePicker();

    $("start-btn").addEventListener("click", startExam);
    $("prev-btn").addEventListener("click", goPrev);
    $("next-btn").addEventListener("click", goNext);
    $("flag-btn").addEventListener("click", toggleFlag);
    $("submit-btn").addEventListener("click", openPresubmit);
    $("presubmit-back").addEventListener("click", closePresubmit);
    $("presubmit-submit").addEventListener("click", function(){ submitExam(false); });
    $("retake-btn").addEventListener("click", retake);
    $("retake-btn-2").addEventListener("click", retake);
    $("change-course-btn").addEventListener("click", changeCourse);
    $("change-course-btn-2").addEventListener("click", changeCourse);
    $("abandon-btn").addEventListener("click", abandonAttempt);
    $("nav-toggle").addEventListener("click", function(){
      var panel = $("nav-panel");
      var open = panel.classList.toggle("open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });

    $("history-export").addEventListener("click", exportHistory);
    $("history-import").addEventListener("click", function(){ $("history-file").click(); });
    $("history-file").addEventListener("change", function(){
      if (this.files && this.files[0]) importHistory(this.files[0]);
      this.value = "";
    });
    $("history-clear").addEventListener("click", function(){
      if (!state.course) return;
      if (!window.confirm("Delete recorded attempts for " + state.course.code + " on this device?")) return;
      clearHistory(state.course.code);
      renderHistory();
      announce("History cleared for this certification.");
    });

    Array.prototype.forEach.call(document.querySelectorAll(".filter-btn"), function(b){
      b.addEventListener("click", function(){ setFilter(b.dataset.filter, b); });
    });

    // Offer to resume an interrupted attempt.
    var saved = readSavedAttempt();
    if (saved && saved.stale){
      $("resume-bar").classList.remove("hidden");
      $("resume-text").textContent =
        "A saved attempt for " + saved.code + " could not be restored because the question bank has changed since.";
      $("resume-go").classList.add("hidden");
      $("resume-dismiss").textContent = "Dismiss";
      $("resume-dismiss").addEventListener("click", function(){
        clearAttempt(); $("resume-bar").classList.add("hidden");
      });
    } else if (saved){
      $("resume-bar").classList.remove("hidden");
      $("resume-text").textContent =
        "You have an unfinished " + saved.course.code + " attempt with " +
        fmtTime(Math.max(0, Math.ceil((saved.data.deadline - Date.now())/1000))) + " remaining.";
      $("resume-go").addEventListener("click", function(){
        $("resume-bar").classList.add("hidden");
        resumeAttempt(saved);
      });
      $("resume-dismiss").addEventListener("click", function(){
        clearAttempt(); $("resume-bar").classList.add("hidden");
      });
    }

    // Persist periodically as a backstop against an abrupt close.
    setInterval(function(){ if (!state.submitted && state.course) saveAttempt(); }, 5000);
  });

})();
