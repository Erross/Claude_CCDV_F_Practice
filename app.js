(function(){
  "use strict";

  var EXAM_SECONDS = 120 * 60;

  var DOMAIN_COLORS = {
    D2: "#54c7b8", D5: "#e8a33d", D1: "#7f9ce8", D6: "#e86ba0",
    D8: "#9d7fe8", D7: "#e5646a", D3: "#6bc9e8", D4: "#8fd16b"
  };

  var state = {
    examQuestions: [],
    current: 0,
    timeLeft: EXAM_SECONDS,
    timerId: null,
    startedAt: null,
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
    var shuffled = shuffle(arr);
    return shuffled.slice(0, Math.min(n, shuffled.length));
  }

  function fmtTime(sec){
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }

  function domainName(id){
    var d = DOMAINS.find(function(x){ return x.id === id; });
    return d ? d.name : id;
  }
  function domainWeight(id){
    var d = DOMAINS.find(function(x){ return x.id === id; });
    return d ? d.weight : 0;
  }

  // ---------- build exam ----------
  function buildExam(){
    var byDomain = {};
    QUESTIONS.forEach(function(q){
      if (!byDomain[q.d]) byDomain[q.d] = [];
      byDomain[q.d].push(q);
    });

    var examQs = [];
    DOMAINS.forEach(function(dom){
      var pool = byDomain[dom.id] || [];
      var drawn = pickN(pool, dom.examCount);
      drawn.forEach(function(orig){
        // shuffle option order and remap correct indices + selected strike state
        var order = shuffle(orig.o.map(function(_, i){ return i; }));
        var newOptions = order.map(function(i){ return orig.o[i]; });
        var newCorrect = orig.c.map(function(ci){ return order.indexOf(ci); }).sort(function(a,b){return a-b;});
        examQs.push({
          domain: orig.d,
          type: orig.t,
          question: orig.q,
          options: newOptions,
          correct: newCorrect,
          explanation: orig.e,
          userAnswer: [],
          flagged: false,
          struck: {}
        });
      });
    });

    return shuffle(examQs);
  }

  // ---------- splash ----------
  function renderSplashWeights(){
    var bar = document.getElementById("weight-bar");
    var legend = document.getElementById("weight-legend");
    bar.innerHTML = "";
    legend.innerHTML = "";
    DOMAINS.forEach(function(d){
      var seg = document.createElement("div");
      seg.className = "weight-seg";
      seg.style.width = d.weight + "%";
      seg.style.background = DOMAIN_COLORS[d.id];
      seg.textContent = d.weight >= 6 ? d.weight + "%" : "";
      seg.title = d.name + " — " + d.weight + "%";
      bar.appendChild(seg);

      var item = document.createElement("div");
      item.className = "weight-legend-item";
      item.innerHTML = '<span class="swatch" style="background:' + DOMAIN_COLORS[d.id] + '"></span>' +
        d.name + ' <span style="color:var(--text-faint)">(' + d.weight + '%, ' + d.examCount + ' Q)</span>';
      legend.appendChild(item);
    });
  }

  function startExam(){
    state.examQuestions = buildExam();
    state.current = 0;
    state.timeLeft = EXAM_SECONDS;
    state.submitted = false;
    document.getElementById("splash-screen").classList.add("hidden");
    document.getElementById("results-screen").classList.add("hidden");
    document.getElementById("exam-screen").classList.remove("hidden");
    renderNavGrid();
    renderQuestion();
    startTimer();
    window.addEventListener("beforeunload", beforeUnloadHandler);
  }

  function beforeUnloadHandler(e){
    if (!state.submitted){
      e.preventDefault();
      e.returnValue = "";
    }
  }

  // ---------- timer ----------
  function startTimer(){
    updateTimerDisplay();
    state.timerId = setInterval(function(){
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0){
        clearInterval(state.timerId);
        submitExam();
      }
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
      cell.addEventListener("click", function(){
        state.current = i;
        renderQuestion();
      });
      grid.appendChild(cell);
    });
  }

  // ---------- question rendering ----------
  function renderQuestion(){
    var q = state.examQuestions[state.current];
    document.getElementById("progress-txt").textContent = "Question " + (state.current+1) + " / " + state.examQuestions.length;

    document.getElementById("domain-pill").textContent = domainName(q.domain);
    document.getElementById("type-pill").textContent = q.type === "m" ? "Select multiple" : "Select one";
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
    var nextBtn = document.getElementById("next-btn");
    nextBtn.textContent = state.current === state.examQuestions.length - 1 ? "Finish" : "Next →";

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
    var q = state.examQuestions[state.current];
    q.flagged = !q.flagged;
    renderQuestion();
  }

  function goPrev(){
    if (state.current > 0){ state.current--; renderQuestion(); }
  }
  function goNext(){
    if (state.current < state.examQuestions.length - 1){
      state.current++;
      renderQuestion();
    } else {
      confirmSubmit();
    }
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
    document.getElementById("exam-screen").classList.add("hidden");
    document.getElementById("results-screen").classList.remove("hidden");
    window.scrollTo(0,0);
  }

  function renderResults(){
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
    var pass = scaled >= 720;

    document.getElementById("score-pct").textContent = pct + "%";
    document.getElementById("score-detail").textContent =
      correctCount + " / " + total + " correct · approx. scaled score " + scaled + " / 1000 (720 to pass)";
    var badge = document.getElementById("pass-badge");
    badge.textContent = pass ? "Likely pass" : "Likely fail";
    badge.className = "badge " + (pass ? "pass" : "fail");

    var tbody = document.getElementById("domain-table-body");
    tbody.innerHTML = "";
    DOMAINS.forEach(function(d){
      var stat = byDomain[d.id] || { correct:0, total:0 };
      var dpct = stat.total ? Math.round((stat.correct/stat.total)*100) : 0;
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td>' + d.name + '</td>' +
        '<td style="font-family:var(--mono)">' + stat.correct + ' / ' + stat.total + '</td>' +
        '<td style="width:160px">' +
          '<div class="mini-bar-track"><div class="mini-bar-fill" style="width:' + dpct + '%; background:' + DOMAIN_COLORS[d.id] + '"></div></div>' +
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
        '<span>' + escapeHtml(q.question) + '</span>';
      var body = document.createElement("div");
      body.className = "review-body hidden";

      var yourAnsText = q.userAnswer.length
        ? q.userAnswer.map(function(idx){ return q.options[idx]; }).join("; ")
        : "(no answer selected)";
      var correctAnsText = q.correct.map(function(idx){ return q.options[idx]; }).join("; ");

      body.innerHTML =
        '<div><strong>Domain:</strong> ' + domainName(q.domain) + '</div>' +
        '<div class="your-ans"><strong>Your answer:</strong> ' + escapeHtml(yourAnsText) + '</div>' +
        '<div class="correct-ans"><strong>Correct answer:</strong> ' + escapeHtml(correctAnsText) + '</div>' +
        '<div class="exp">' + escapeHtml(q.explanation) + '</div>';

      head.addEventListener("click", function(){
        body.classList.toggle("hidden");
      });

      item.appendChild(head);
      item.appendChild(body);
      reviewList.appendChild(item);
    });
  }

  function escapeHtml(str){
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function retake(){
    document.getElementById("results-screen").classList.add("hidden");
    document.getElementById("splash-screen").classList.remove("hidden");
    window.scrollTo(0,0);
  }

  // ---------- wire up ----------
  document.addEventListener("DOMContentLoaded", function(){
    renderSplashWeights();
    document.getElementById("start-btn").addEventListener("click", startExam);
    document.getElementById("prev-btn").addEventListener("click", goPrev);
    document.getElementById("next-btn").addEventListener("click", goNext);
    document.getElementById("flag-btn").addEventListener("click", toggleFlag);
    document.getElementById("submit-btn").addEventListener("click", confirmSubmit);
    document.getElementById("retake-btn").addEventListener("click", retake);
    document.getElementById("retake-btn-2").addEventListener("click", retake);
  });

})();
