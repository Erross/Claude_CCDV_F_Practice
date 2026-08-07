(function(){
  "use strict";

  var state = {
    course: null,
    examQuestions: [],
    scenarioById: {},
    current: 0,
    timeLeft: 0,
    timerId: null,
    submitted: false
  };

  // ---------- helpers ----------
  function shuffle(arr){
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function pickN(arr, n){
    return shuffle(arr).slice(0, Math.min(n, arr.length));
  }

  function fmtTime(sec){
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }

  function domainName(id){
    var d = state.course.domains.find(function(x){ return x.id === id; });
    return d ? d.name : id;
  }

  function colorFor(id){ return window.domainColor(state.course, id); }

  function escapeHtml(str){
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function show(id){ document.getElementById(id).classList.remove("hidden"); }
  function hide(id){ document.getElementById(id).classList.add("hidden"); }

  // ---------- build exam ----------
  function prepare(orig){
    var order = shuffle(orig.o.map(function(_, i){ return i; }));
    var newOptions = order.map(function(i){ return orig.o[i]; });
    var newCorrect = orig.c.map(function(ci){ return order.indexOf(ci); })
                           .sort(function(a,b){ return a-b; });
    return {
      domain: orig.d,
      type: orig.t,
      question: orig.q,
      scenario: orig.sc || null,
      options: newOptions,
      correct: newCorrect,
      explanation: orig.e,
      userAnswer: [],
      flagged: false,
      struck: {}
    };
  }

  // Apportion a total across domains by their blueprint weights (largest remainder).
  function domainTargets(course, total){
    var parts = course.domains.map(function(d){
      var exact = total * d.weight / 100;
      return { id: d.id, n: Math.floor(exact), rem: exact - Math.floor(exact) };
    });
    var short = total - parts.reduce(function(s, p){ return s + p.n; }, 0);
    parts.slice().sort(function(a, b){ return b.rem - a.rem; })
         .slice(0, short).forEach(function(p){ p.n++; });
    var out = {};
    parts.forEach(function(p){ out[p.id] = p.n; });
    return out;
  }

  // Scenario exams draw a subset of scenarios and ask a block of questions about each.
  // Sampling each block uniformly would let the pools' own domain mix decide the exam's
  // mix, which drifts away from the blueprint. So the exam-level domain quota is computed
  // first, then spread across the chosen scenarios — each still contributing one block.
  function buildScenarioExam(course){
    var chosen = pickN(course.scenarios, course.scenarioDraw.scenarios);
    var perScenario = course.scenarioDraw.perScenario;
    var remaining = domainTargets(course, chosen.length * perScenario);

    // pool[scenarioIndex][domainId] = shuffled questions still available
    var pools = chosen.map(function(sc){
      var byDom = {};
      course.domains.forEach(function(d){
        byDom[d.id] = shuffle(course.questions.filter(function(q){
          return q.sc === sc.id && q.d === d.id;
        }));
      });
      return byDom;
    });

    var picked = chosen.map(function(){ return []; });
    // Fill the scarcest domain first so a domain thin on the ground isn't crowded out.
    var order = Object.keys(remaining).sort(function(a, b){
      var availA = pools.reduce(function(s, p){ return s + p[a].length; }, 0);
      var availB = pools.reduce(function(s, p){ return s + p[b].length; }, 0);
      return availA - availB;
    });

    order.forEach(function(dom){
      var want = remaining[dom];
      // round-robin across scenarios so no single block is dominated by one domain
      var guard = 0;
      while (want > 0 && guard < 1000){
        var progressed = false;
        for (var i = 0; i < pools.length && want > 0; i++){
          if (picked[i].length >= perScenario) continue;
          if (!pools[i][dom].length) continue;
          picked[i].push(pools[i][dom].pop());
          want--; progressed = true;
        }
        if (!progressed) break;   // pools exhausted for this domain
        guard++;
      }
      remaining[dom] = want;      // any shortfall backfilled below
    });

    // Backfill any block still short (pool gaps) with whatever remains in that scenario.
    picked.forEach(function(list, i){
      if (list.length >= perScenario) return;
      var leftovers = [];
      course.domains.forEach(function(d){ leftovers = leftovers.concat(pools[i][d.id]); });
      shuffle(leftovers).slice(0, perScenario - list.length).forEach(function(q){ list.push(q); });
    });

    var out = [];
    picked.forEach(function(list){ shuffle(list).forEach(function(q){ out.push(prepare(q)); }); });
    return out;
  }

  function buildWeightedExam(course){
    var byDomain = {};
    course.questions.forEach(function(q){
      (byDomain[q.d] = byDomain[q.d] || []).push(q);
    });
    var out = [];
    course.domains.forEach(function(dom){
      pickN(byDomain[dom.id] || [], dom.examCount).forEach(function(q){
        out.push(prepare(q));
      });
    });
    return shuffle(out);
  }

  function buildExam(course){
    return window.isScenarioCourse(course)
      ? buildScenarioExam(course)
      : buildWeightedExam(course);
  }

  // ---------- course picker ----------
  function renderCoursePicker(){
    var wrap = document.getElementById("course-list");
    wrap.innerHTML = "";
    window.getCourses().forEach(function(c){
      var card = document.createElement("button");
      card.type = "button";
      card.className = "course-card";
      card.innerHTML =
        '<div class="cc-code">' + escapeHtml(c.code) + '</div>' +
        '<div class="cc-name">' + escapeHtml(c.name) + '</div>' +
        '<div class="cc-tier">' + escapeHtml(c.tier) + '</div>' +
        '<div class="cc-blurb">' + escapeHtml(c.blurb) + '</div>' +
        '<div class="cc-meta">' +
          '<span>' + c.items + ' questions</span>' +
          '<span>' + c.minutes + ' min</span>' +
          '<span>' + c.questions.length + ' in bank</span>' +
        '</div>';
      card.addEventListener("click", function(){ selectCourse(c.code); });
      wrap.appendChild(card);
    });
  }

  function selectCourse(code){
    state.course = window.getCourse(code);
    state.scenarioById = {};
    if (window.isScenarioCourse(state.course)){
      state.course.scenarios.forEach(function(s){ state.scenarioById[s.id] = s; });
    }
    renderSplash();
    hide("course-screen");
    show("splash-screen");
    window.scrollTo(0,0);
  }

  function renderSplash(){
    var c = state.course;
    document.getElementById("splash-title").textContent =
      "Practice for the " + c.name + " – " + c.tier + " exam";
    document.getElementById("splash-code").textContent = c.code + "//";
    document.getElementById("splash-sub").textContent =
      c.items + " questions, drawn at random from a bank of " + c.questions.length +
      ", weighted to match the official domain blueprint. Timed to " + c.minutes +
      " minutes, with a question navigator, flag-for-review, and a strikeout tool.";

    document.getElementById("stat-items").textContent = c.items;
    document.getElementById("stat-time").innerHTML = c.minutes + '<span style="font-size:.9rem">m</span>';
    document.getElementById("stat-pass").textContent = c.passScore;
    document.getElementById("stat-bank").textContent = c.questions.length;

    var note = document.getElementById("format-note");
    if (window.isScenarioCourse(c)){
      note.textContent = "This exam is scenario-based: " + c.scenarioDraw.scenarios +
        " scenarios are drawn from a pool of " + c.scenarios.length + ", with " +
        c.scenarioDraw.perScenario + " questions on each.";
      note.classList.remove("hidden");
    } else {
      note.classList.add("hidden");
    }

    var bar = document.getElementById("weight-bar");
    var legend = document.getElementById("weight-legend");
    bar.innerHTML = ""; legend.innerHTML = "";
    c.domains.forEach(function(d){
      var seg = document.createElement("div");
      seg.className = "weight-seg";
      seg.style.width = d.weight + "%";
      seg.style.background = colorFor(d.id);
      seg.textContent = d.weight >= 6 ? d.weight + "%" : "";
      seg.title = d.name + " — " + d.weight + "%";
      bar.appendChild(seg);

      var item = document.createElement("div");
      item.className = "weight-legend-item";
      var count = d.examCount != null ? ", " + d.examCount + " Q" : "";
      item.innerHTML = '<span class="swatch" style="background:' + colorFor(d.id) + '"></span>' +
        escapeHtml(d.name) + ' <span style="color:var(--text-faint)">(' + d.weight + '%' + count + ')</span>';
      legend.appendChild(item);
    });
  }

  // ---------- exam lifecycle ----------
  function startExam(){
    var c = state.course;
    state.examQuestions = buildExam(c);
    state.current = 0;
    state.timeLeft = c.minutes * 60;
    state.submitted = false;
    document.getElementById("exam-code").textContent = c.code + "//";
    hide("splash-screen"); hide("results-screen"); show("exam-screen");
    renderNavGrid();
    renderQuestion();
    startTimer();
    window.addEventListener("beforeunload", beforeUnloadHandler);
  }

  function beforeUnloadHandler(e){
    if (!state.submitted){ e.preventDefault(); e.returnValue = ""; }
  }

  function startTimer(){
    updateTimerDisplay();
    state.timerId = setInterval(function(){
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0){ clearInterval(state.timerId); submitExam(); }
    }, 1000);
  }

  function updateTimerDisplay(){
    var el = document.getElementById("timer");
    el.textContent = fmtTime(Math.max(0, state.timeLeft));
    el.classList.remove("warn","danger");
    if (state.timeLeft <= 120) el.classList.add("danger");
    else if (state.timeLeft <= 600) el.classList.add("warn");
  }

  // ---------- nav grid ----------
  function renderNavGrid(){
    var grid = document.getElementById("nav-grid");
    grid.innerHTML = "";
    state.examQuestions.forEach(function(q, i){
      var cell = document.createElement("button");
      cell.type = "button";
      cell.className = "nav-cell";
      cell.textContent = i + 1;
      cell.setAttribute("aria-label", "Go to question " + (i+1));
      if (q.userAnswer.length) cell.classList.add("answered");
      if (q.flagged) cell.classList.add("flagged");
      if (i === state.current) cell.classList.add("current");
      cell.addEventListener("click", function(){ state.current = i; renderQuestion(); });
      grid.appendChild(cell);
    });
  }

  // ---------- question rendering ----------
  function renderQuestion(){
    var q = state.examQuestions[state.current];
    document.getElementById("progress-txt").textContent =
      "Question " + (state.current+1) + " / " + state.examQuestions.length;

    document.getElementById("domain-pill").textContent = domainName(q.domain);
    document.getElementById("type-pill").textContent =
      q.type === "m" ? "Select multiple" : "Select one";

    var scWrap = document.getElementById("scenario-panel");
    if (q.scenario && state.scenarioById[q.scenario]){
      var sc = state.scenarioById[q.scenario];
      document.getElementById("scenario-title").textContent = sc.title;
      document.getElementById("scenario-text").textContent = sc.text;
      scWrap.classList.remove("hidden");
    } else {
      scWrap.classList.add("hidden");
    }

    document.getElementById("q-text").textContent = q.question;

    var flagBtn = document.getElementById("flag-btn");
    flagBtn.classList.toggle("active", q.flagged);
    flagBtn.textContent = q.flagged ? "★ Flagged for review" : "☆ Flag for review";

    var opts = document.getElementById("options");
    opts.innerHTML = "";
    q.options.forEach(function(optText, idx){
      var row = document.createElement("div");
      row.className = "option-row";
      if (q.userAnswer.indexOf(idx) !== -1) row.classList.add("selected");
      if (q.struck[idx]) row.classList.add("struck");

      var main = document.createElement("button");
      main.type = "button";
      main.className = "option-main";
      main.innerHTML =
        '<span class="option-mark ' + (q.type === "m" ? "checkbox" : "radio") + '"></span>' +
        '<span class="option-text"></span>';
      main.querySelector(".option-text").textContent = optText;
      main.addEventListener("click", function(){ toggleAnswer(q, idx); });

      var strike = document.createElement("button");
      strike.type = "button";
      strike.className = "strike-btn" + (q.struck[idx] ? " active" : "");
      strike.setAttribute("aria-pressed", q.struck[idx] ? "true" : "false");
      strike.setAttribute("aria-label", "Strike out this option");
      strike.textContent = "S̶";
      strike.addEventListener("click", function(ev){
        ev.stopPropagation();
        q.struck[idx] = !q.struck[idx];
        renderQuestion();
      });

      row.appendChild(main);
      row.appendChild(strike);
      opts.appendChild(row);
    });

    document.getElementById("prev-btn").disabled = state.current === 0;
    document.getElementById("next-btn").textContent =
      state.current === state.examQuestions.length - 1 ? "Finish" : "Next →";

    renderNavGrid();
  }

  function toggleAnswer(q, idx){
    if (q.type === "s"){
      q.userAnswer = [idx];
    } else {
      var pos = q.userAnswer.indexOf(idx);
      if (pos === -1) q.userAnswer.push(idx);
      else q.userAnswer.splice(pos, 1);
    }
    renderQuestion();
  }

  function toggleFlag(){
    state.examQuestions[state.current].flagged = !state.examQuestions[state.current].flagged;
    renderQuestion();
  }

  function goPrev(){ if (state.current > 0){ state.current--; renderQuestion(); } }
  function goNext(){
    if (state.current < state.examQuestions.length - 1){ state.current++; renderQuestion(); }
    else confirmSubmit();
  }

  function confirmSubmit(){
    var unanswered = state.examQuestions.filter(function(q){ return q.userAnswer.length === 0; }).length;
    var msg = unanswered > 0
      ? "You have " + unanswered + " unanswered question(s). Submit anyway?"
      : "Submit the exam now?";
    if (window.confirm(msg)) submitExam();
  }

  // ---------- scoring ----------
  function isCorrect(q){
    var a = q.userAnswer.slice().sort(function(x,y){return x-y;});
    var c = q.correct.slice().sort(function(x,y){return x-y;});
    if (a.length !== c.length) return false;
    for (var i=0;i<a.length;i++){ if (a[i] !== c[i]) return false; }
    return true;
  }

  function submitExam(){
    if (state.submitted) return;
    state.submitted = true;
    clearInterval(state.timerId);
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    renderResults();
    hide("exam-screen"); show("results-screen");
    window.scrollTo(0,0);
  }

  function renderResults(){
    var c = state.course;
    var total = state.examQuestions.length;
    var correctCount = 0;
    var byDomain = {};

    state.examQuestions.forEach(function(q){
      if (!byDomain[q.domain]) byDomain[q.domain] = { correct:0, total:0 };
      byDomain[q.domain].total++;
      if (isCorrect(q)){ correctCount++; byDomain[q.domain].correct++; }
    });

    var pct = Math.round((correctCount/total)*100);
    var scaled = Math.round(100 + (correctCount/total) * 900);
    var pass = scaled >= c.passScore;

    document.getElementById("score-pct").textContent = pct + "%";
    document.getElementById("score-detail").textContent =
      correctCount + " / " + total + " correct · approx. scaled score " + scaled +
      " / 1000 (" + c.passScore + " to pass)";
    var badge = document.getElementById("pass-badge");
    badge.textContent = pass ? "Likely pass" : "Likely fail";
    badge.className = "badge " + (pass ? "pass" : "fail");

    var tbody = document.getElementById("domain-table-body");
    tbody.innerHTML = "";
    c.domains.forEach(function(d){
      var stat = byDomain[d.id];
      if (!stat) return; // scenario draws may not touch every domain
      var dpct = stat.total ? Math.round((stat.correct/stat.total)*100) : 0;
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td>' + escapeHtml(d.name) + '</td>' +
        '<td style="font-family:var(--mono)">' + stat.correct + ' / ' + stat.total + '</td>' +
        '<td style="width:160px">' +
          '<div class="mini-bar-track"><div class="mini-bar-fill" style="width:' + dpct +
          '%; background:' + colorFor(d.id) + '"></div></div>' +
        '</td>' +
        '<td style="font-family:var(--mono); text-align:right">' + dpct + '%</td>';
      tbody.appendChild(tr);
    });

    var reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";
    state.examQuestions.forEach(function(q, i){
      var correct = isCorrect(q);
      var item = document.createElement("div");
      item.className = "review-item";

      var head = document.createElement("button");
      head.type = "button";
      head.className = "review-head";
      head.innerHTML =
        '<span class="status-dot ' + (correct ? "correct" : "incorrect") + '"></span>' +
        '<span class="qnum">Q' + (i+1) + '</span>' +
        '<span class="q-summary">' + escapeHtml(q.question) + '</span>';

      var body = document.createElement("div");
      body.className = "review-body hidden";

      var yourAnsText = q.userAnswer.length
        ? q.userAnswer.map(function(idx){ return q.options[idx]; }).join("; ")
        : "(no answer selected)";
      var correctAnsText = q.correct.map(function(idx){ return q.options[idx]; }).join("; ");
      var scLine = (q.scenario && state.scenarioById[q.scenario])
        ? '<div><strong>Scenario:</strong> ' + escapeHtml(state.scenarioById[q.scenario].title) + '</div>'
        : '';

      body.innerHTML =
        '<div><strong>Domain:</strong> ' + escapeHtml(domainName(q.domain)) + '</div>' +
        scLine +
        '<div class="your-ans"><strong>Your answer:</strong> ' + escapeHtml(yourAnsText) + '</div>' +
        '<div class="correct-ans"><strong>Correct answer:</strong> ' + escapeHtml(correctAnsText) + '</div>' +
        '<div class="exp">' + escapeHtml(q.explanation) + '</div>';

      head.addEventListener("click", function(){ body.classList.toggle("hidden"); });
      item.appendChild(head);
      item.appendChild(body);
      reviewList.appendChild(item);
    });
  }

  function retake(){
    hide("results-screen"); show("splash-screen");
    window.scrollTo(0,0);
  }

  function changeCourse(){
    hide("results-screen"); hide("splash-screen"); show("course-screen");
    window.scrollTo(0,0);
  }

  // ---------- wire up ----------
  document.addEventListener("DOMContentLoaded", function(){
    renderCoursePicker();
    document.getElementById("start-btn").addEventListener("click", startExam);
    document.getElementById("prev-btn").addEventListener("click", goPrev);
    document.getElementById("next-btn").addEventListener("click", goNext);
    document.getElementById("flag-btn").addEventListener("click", toggleFlag);
    document.getElementById("submit-btn").addEventListener("click", confirmSubmit);
    document.getElementById("retake-btn").addEventListener("click", retake);
    document.getElementById("retake-btn-2").addEventListener("click", retake);
    document.getElementById("change-course-btn").addEventListener("click", changeCourse);
    document.getElementById("change-course-btn-2").addEventListener("click", changeCourse);
  });

})();
