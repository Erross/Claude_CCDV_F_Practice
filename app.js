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
    reviewFilter: "all",
    reviewDomain: "all"
  };

  // ---------- small helpers ----------
  function fmtTime(sec){
    var m = Math.floor(sec / 60), s = sec % 60;
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }
  function $(id){ return document.getElementById(id); }
  function show(id){ $(id).classList.remove("hidden"); }
  function hide(id){ $(id).classList.add("hidden"); }

  var SCREENS = ["course-screen","splash-screen","exam-screen","presubmit-screen","results-screen"];

  // Every screen transition goes through here. Focus was previously left on whichever
  // control was clicked — which then got hidden or rebuilt, dropping the keyboard user
  // back to <body>. Requiring a focus target makes that omission impossible.
  function showScreen(screenId, focusId){
    SCREENS.forEach(function(id){
      if (id === screenId) $(id).classList.remove("hidden");
      else $(id).classList.add("hidden");
    });
    var el = $(focusId);
    if (el) el.focus();
    window.scrollTo(0,0);
  }
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

  // An imported file is untrusted. Coerce every field to a known type and range and
  // drop anything unrecognised, so nothing arbitrary can reach the DOM or the store.
  function sanitiseAttempt(a){
    if (!a || typeof a !== "object") return null;
    var course = window.getCourse(a.code);
    if (!course) return null;                                   // unknown certification
    var at = a.at;
    if (typeof at !== "number" || !isFinite(at) || at <= 0 || at > Date.now() + 86400000) return null;

    function int(v, lo, hi){
      var n = typeof v === "number" ? Math.round(v) : NaN;
      return (isFinite(n) && n >= lo && n <= hi) ? n : null;
    }
    var total = int(a.total, 1, 500);
    var correct = total === null ? null : int(a.correct, 0, total);
    var scaled = int(a.scaled, 0, 1000);
    var seconds = int(a.seconds, 0, 86400);
    if (total === null || correct === null || scaled === null) return null;

    var domains = {};
    if (a.domains && typeof a.domains === "object"){
      course.domains.forEach(function(d){
        var pair = a.domains[d.id];
        if (!Array.isArray(pair) || pair.length !== 2) return;
        var dt = int(pair[1], 0, 500);
        var dc = dt === null ? null : int(pair[0], 0, dt);
        if (dc !== null && dt !== null) domains[d.id] = [dc, dt];
      });
    }
    return {
      code: course.code, at: at, correct: correct, total: total,
      scaled: scaled, pass: a.pass === true,
      seconds: seconds === null ? 0 : seconds, domains: domains
    };
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
      var added = 0, rejected = 0;
      incoming.attempts.forEach(function(a){
        var clean = sanitiseAttempt(a);
        if (!clean){ rejected++; return; }
        var key = clean.code + "@" + clean.at;
        if (seen.has(key)) return;       // merge rather than duplicate
        seen.add(key); h.attempts.push(clean); added++;
      });
      h.attempts.sort(function(x, y){ return x.at - y.at; });
      if (h.attempts.length > HISTORY_LIMIT) h.attempts = h.attempts.slice(-HISTORY_LIMIT);
      writeHistory(h);
      if (state.course) renderHistory();
      window.alert(added + " attempt(s) imported." +
        (rejected ? " " + rejected + " record(s) were rejected as invalid." : ""));
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
    showScreen("splash-screen", "splash-title");
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
    var thead = document.createElement("thead");
    var hr = document.createElement("tr");
    ["When","Score","Scaled","Time","Result"].forEach(function(h){
      var th = document.createElement("th");
      th.scope = "col"; th.textContent = h; hr.appendChild(th);
    });
    thead.appendChild(hr); table.appendChild(thead);

    var tb = document.createElement("tbody");
    list.slice(0, 10).forEach(function(a){
      var tr = document.createElement("tr");
      // textContent throughout: imported records are untrusted input.
      function cell(label, text, mono){
        var td = document.createElement("td");
        td.setAttribute("data-label", label);
        if (mono) td.style.fontFamily = "var(--mono)";
        td.textContent = text;
        tr.appendChild(td);
      }
      cell("When", fmtDate(a.at));
      cell("Score", a.correct + " / " + a.total, true);
      cell("Scaled", String(a.scaled), true);
      cell("Time", fmtTime(a.seconds || 0), true);
      var td = document.createElement("td");
      td.setAttribute("data-label", "Result");
      var badge = document.createElement("span");
      badge.className = "badge-sm " + (a.pass ? "pass" : "fail");
      // Matches the results screen: the scaled score is an approximation.
      badge.textContent = a.pass ? "Likely pass" : "Likely fail";
      td.appendChild(badge); tr.appendChild(td);
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
    showScreen("exam-screen", "q-text");
    renderNavGrid();
    renderQuestion();
    $("q-text").focus();
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
      cell.addEventListener("click", function(){ goTo(i, { fromGrid: true }); });
      cell.addEventListener("keydown", function(ev){
        var cols = navColumns(), next = null;
        if (ev.key === "ArrowRight") next = i + 1;
        else if (ev.key === "ArrowLeft") next = i - 1;
        else if (ev.key === "ArrowDown") next = i + cols;
        else if (ev.key === "ArrowUp") next = i - cols;
        else if (ev.key === "Home") next = 0;
        else if (ev.key === "End") next = state.examQuestions.length - 1;
        if (next === null) return;
        ev.preventDefault();
        next = Math.max(0, Math.min(state.examQuestions.length - 1, next));
        goTo(next);   // arrow keys keep focus in the grid for continued navigation
        var cells = grid.querySelectorAll(".nav-cell");
        if (cells[next]) cells[next].focus();
      });
      grid.appendChild(cell);
    });
  }

  function navColumns(){
    // Must track the CSS breakpoints, or Arrow Up/Down moves diagonally.
    var w = window.innerWidth || 1024;
    if (w <= 620) return 6;
    if (w <= 820) return 8;
    return 6;
  }

  function closeMobileNav(){
    var panel = $("nav-panel");
    if (!panel.classList.contains("open")) return;
    panel.classList.remove("open");
    $("nav-toggle").setAttribute("aria-expanded", "false");
  }

  // fromGrid: the grid is rebuilt on every render, so the focused cell is destroyed.
  // Move focus somewhere stable rather than letting it fall back to <body>.
  function goTo(i, opts){
    opts = opts || {};
    state.current = i;
    renderQuestion();
    saveAttempt();
    if (opts.fromGrid){
      closeMobileNav();
      $("q-text").focus();
    }
  }

  // ---------- question ----------
  function renderQuestion(){
    // Every option control below is destroyed and recreated. Answering or striking calls
    // back into here, so without restoring focus the keyboard user is dumped on <body>
    // mid-question. Controls carry stable ids precisely so they survive the rebuild.
    var prevFocusId = (document.activeElement && document.activeElement.id) || "";

    var q = state.examQuestions[state.current];
    $("progress-txt").textContent = "Question " + (state.current+1) + " / " + state.examQuestions.length;
    $("domain-pill").textContent = domainName(q.domain);
    var howMany = q.type === "m"
      ? "Select " + q.correct.length + " answers"
      : "Select one answer";
    $("type-pill").textContent = howMany;

    var scWrap = $("scenario-panel");
    if (q.scenario && state.scenarioById[q.scenario]){
      var sc = state.scenarioById[q.scenario];
      $("scenario-title").textContent = sc.title;
      $("scenario-text").textContent = sc.text;
      scWrap.classList.remove("hidden");
    } else scWrap.classList.add("hidden");

    $("q-text").textContent = q.question;
    $("q-legend").textContent =
      "Question " + (state.current+1) + " of " + state.examQuestions.length + ". " + howMany + ".";

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
      input.addEventListener("change", function(){
        // Choosing an option contradicts having ruled it out; clear the strikeout.
        if (input.checked && q.struck[idx]) delete q.struck[idx];
        toggleAnswer(q, idx);
        renderQuestion();
      });

      var label = document.createElement("label");
      label.className = "option-label";
      label.setAttribute("for", inputId);
      label.textContent = optText;

      var strike = document.createElement("button");
      strike.type = "button";
      strike.id = "strike-" + state.current + "-" + idx;
      strike.className = "strike-btn" + (q.struck[idx] ? " active" : "");
      strike.setAttribute("aria-pressed", q.struck[idx] ? "true" : "false");
      strike.setAttribute("aria-label", "Rule out option: " + optText);
      strike.textContent = "S̶";
      strike.addEventListener("click", function(){
        var nowStruck = !q.struck[idx];
        if (nowStruck) q.struck[idx] = true; else delete q.struck[idx];
        // Ruling an option out contradicts having selected it; drop the selection.
        if (nowStruck){
          var at = q.userAnswer.indexOf(idx);
          if (at !== -1) q.userAnswer.splice(at, 1);
        }
        renderQuestion();
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

    // Put focus back on the recreated counterpart of whatever held it. Callers that
    // deliberately move focus elsewhere (goTo, screen changes) do so after this returns.
    if (prevFocusId && document.activeElement !== document.getElementById(prevFocusId)){
      var again = document.getElementById(prevFocusId);
      if (again && typeof again.focus === "function") again.focus();
    }
  }

  function toggleAnswer(q, idx){
    if (q.type === "s") q.userAnswer = [idx];
    else {
      var pos = q.userAnswer.indexOf(idx);
      if (pos === -1) q.userAnswer.push(idx); else q.userAnswer.splice(pos, 1);
    }
    saveAttempt();
  }

  function toggleFlag(){
    var q = state.examQuestions[state.current];
    q.flagged = !q.flagged;
    renderQuestion();
    saveAttempt();
    announce(q.flagged ? "Question flagged." : "Flag removed.");
  }

  function goPrev(){ if (state.current > 0){ goTo(state.current - 1); $("q-text").focus(); } }
  function goNext(){
    if (state.current < state.examQuestions.length - 1){ goTo(state.current + 1); $("q-text").focus(); }
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
          showScreen("exam-screen", "q-text");
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
    showScreen("presubmit-screen", "presubmit-heading");
  }

  function closePresubmit(){
    showScreen("exam-screen", "q-text");
    renderQuestion();
    $("q-text").focus();
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
    showScreen("results-screen", "results-heading");
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
        " · " + (delta === 0 ? "level with"
                              : Math.abs(delta) + (delta > 0 ? " above" : " below")) +
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

    var sel = $("review-domain");
    sel.innerHTML = '<option value="all">All domains</option>';
    c.domains.forEach(function(d){
      if (!byDomain[d.id]) return;
      var o = document.createElement("option");
      o.value = d.id;
      o.textContent = d.name + " (" + byDomain[d.id].correct + "/" + byDomain[d.id].total + ")";
      sel.appendChild(o);
    });
    state.reviewDomain = "all";
    sel.value = "all";

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
      if (state.reviewDomain !== "all" && q.domain !== state.reviewDomain) return;
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
      var partial = "";
      if (!correct && q.type === "m" && q.userAnswer.length){
        var hit = q.userAnswer.filter(function(i2){ return q.correct.indexOf(i2) !== -1; }).length;
        var wrong = q.userAnswer.length - hit;
        if (hit > 0) partial =
          '<div class="review-partial">Partially correct: ' + hit + ' of ' + q.correct.length +
          ' right' + (wrong ? ', ' + wrong + ' incorrect' : '') +
          '. Multi-select is scored all-or-nothing.</div>';
      }
      // Architect answers often can't be judged without the scenario they sit under.
      var sc = q.scenario ? state.scenarioById[q.scenario] : null;
      var scLine = sc
        ? '<div class="review-scenario"><strong>Scenario: ' + escapeHtml(sc.title) + '</strong>' +
          '<span class="review-scenario-text">' + escapeHtml(sc.text) + '</span></div>'
        : '';

      body.innerHTML =
        '<div><strong>Domain:</strong> ' + escapeHtml(domainName(q.domain)) + '</div>' + scLine +
        '<div class="your-ans"><strong>Your answer:</strong> ' + escapeHtml(yourAns) + '</div>' +
        '<div class="correct-ans"><strong>Correct answer:</strong> ' + escapeHtml(correctAns) + '</div>' +
        partial +
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

  function setAllExpanded(open){
    var list = $("review-list");
    Array.prototype.forEach.call(list.querySelectorAll(".review-head"), function(h){
      h.setAttribute("aria-expanded", open ? "true" : "false");
    });
    Array.prototype.forEach.call(list.querySelectorAll(".review-body"), function(b){
      b.classList.toggle("hidden", !open);
    });
  }

  // Only buttons carrying data-filter are filters. Expand/Collapse sit in the same row
  // but are view controls: selecting them must not reset which questions are shown.
  var FILTER_SELECTOR = ".filter-btn[data-filter]";

  function setFilter(f, btn){
    state.reviewFilter = f;
    Array.prototype.forEach.call(document.querySelectorAll(FILTER_SELECTOR), function(b){
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    renderReviewList();
  }

  // ---------- navigation between screens ----------
  function retake(){
    // Re-render so the history panel reflects the attempt just completed.
    renderSplash();
    showScreen("splash-screen", "splash-title");
  }
  function changeCourse(){ showScreen("course-screen", "main-content"); }

  function abandonAttempt(){
    if (!window.confirm("Discard the attempt in progress?")) return;
    state.submitted = true;
    clearInterval(state.timerId);
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    clearAttempt();
    showScreen("course-screen", "main-content");
  }

  // ---------- boot ----------
  // Bound once at startup. Previously this lived where a filter click could re-run it,
  // stacking duplicate listeners so "Clear" raised one confirm per click.
  function wireHistoryControls(){
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
  }

  document.addEventListener("DOMContentLoaded", function(){
    renderCoursePicker();
    wireHistoryControls();

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

    Array.prototype.forEach.call(document.querySelectorAll(FILTER_SELECTOR), function(b){
      b.addEventListener("click", function(){ setFilter(b.dataset.filter, b); });
    });
    $("review-domain").addEventListener("change", function(){
      state.reviewDomain = this.value;
      renderReviewList();
    });
    $("expand-all").addEventListener("click", function(){ setAllExpanded(true); });
    $("collapse-all").addEventListener("click", function(){ setAllExpanded(false); });

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
