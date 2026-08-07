// Shared exam-generation engine.
//
// Both the browser app and tools/audit.js run these functions, so the audit measures
// the same draw the candidate actually gets. Keeping a second implementation in the
// audit was a standing hazard: the two could drift and the audit would certify a draw
// nobody was using.

(function (global) {
  "use strict";

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function pickN(arr, n) {
    return shuffle(arr).slice(0, Math.min(n, arr.length));
  }

  // Apportion a total across domains by blueprint weight, largest remainder.
  function domainTargets(course, total) {
    var parts = course.domains.map(function (d) {
      var exact = total * d.weight / 100;
      return { id: d.id, n: Math.floor(exact), rem: exact - Math.floor(exact) };
    });
    var short = total - parts.reduce(function (s, p) { return s + p.n; }, 0);
    parts.slice().sort(function (a, b) { return b.rem - a.rem; })
         .slice(0, short).forEach(function (p) { p.n++; });
    var out = {};
    parts.forEach(function (p) { out[p.id] = p.n; });
    return out;
  }

  function isScenarioCourse(course) {
    return !!(course && course.scenarioDraw && course.scenarios && course.scenarios.length);
  }


  // Exact allocation of an exam-level domain quota across the chosen scenario blocks.
  //
  // Rows are scenarios (each must contribute exactly `per` questions), columns are
  // domains (each must contribute exactly its blueprint target), and a cell is capped
  // by how many questions that scenario actually holds in that domain. A greedy fill
  // gets this right most of the time but can wedge: it commits a block to capacity and
  // then finds a later domain has nowhere left to go. Max-flow has no such failure mode
  // — if a feasible allocation exists it finds one, and it can prove when none does.
  function allocate(rowCaps, colCaps, cellCaps) {
    var R = rowCaps.length, C = colCaps.length;
    var N = R + C + 2, S = 0, T = N - 1;
    var cap = [];
    for (var i = 0; i < N; i++) cap.push(new Array(N).fill(0));

    for (var r = 0; r < R; r++) cap[S][1 + r] = rowCaps[r];
    for (var c = 0; c < C; c++) cap[1 + R + c][T] = colCaps[c];
    for (r = 0; r < R; r++)
      for (c = 0; c < C; c++) cap[1 + r][1 + R + c] = cellCaps[r][c];

    var flow = [];
    for (i = 0; i < N; i++) flow.push(new Array(N).fill(0));

    // Edmonds-Karp: the graph is 11 nodes, so BFS augmentation is more than fast enough.
    for (;;) {
      var prev = new Array(N).fill(-1);
      prev[S] = S;
      var queue = [S];
      while (queue.length && prev[T] === -1) {
        var u = queue.shift();
        for (var v = 0; v < N; v++) {
          if (prev[v] === -1 && cap[u][v] - flow[u][v] > 0) { prev[v] = u; queue.push(v); }
        }
      }
      if (prev[T] === -1) break;
      var bottleneck = Infinity, x = T;
      while (x !== S) { bottleneck = Math.min(bottleneck, cap[prev[x]][x] - flow[prev[x]][x]); x = prev[x]; }
      x = T;
      while (x !== S) { flow[prev[x]][x] += bottleneck; flow[x][prev[x]] -= bottleneck; x = prev[x]; }
    }

    var total = 0;
    for (c = 0; c < C; c++) total += flow[1 + R + c][T];
    var want = colCaps.reduce(function (a, b) { return a + b; }, 0);

    var matrix = [];
    for (r = 0; r < R; r++) {
      matrix.push([]);
      for (c = 0; c < C; c++) matrix[r].push(flow[1 + r][1 + R + c]);
    }
    return { matrix: matrix, exact: total === want, placed: total };
  }

  // Scenario exams: draw a subset of scenarios, then fill each block against an
  // exam-level domain quota. Sampling each block uniformly would let pool composition
  // decide the exam's domain mix instead of the blueprint.
  function drawScenario(course) {
    var chosen = pickN(course.scenarios, course.scenarioDraw.scenarios);
    var per = course.scenarioDraw.perScenario;
    var targets = domainTargets(course, chosen.length * per);
    var domIds = course.domains.map(function (d) { return d.id; });

    var pools = chosen.map(function (sc) {
      return domIds.map(function (id) {
        return shuffle(course.questions.filter(function (q) {
          return q.sc === sc.id && q.d === id;
        }));
      });
    });

    var rowCaps = chosen.map(function () { return per; });
    var colCaps = domIds.map(function (id) { return targets[id]; });
    var cellCaps = pools.map(function (row) { return row.map(function (list) { return list.length; }); });

    var alloc = allocate(rowCaps, colCaps, cellCaps);

    // An infeasible bank is a configuration error, not permission to generate an
    // off-blueprint exam. CI proves every configured combination is feasible; throwing
    // here prevents a future content edit from silently weakening a live attempt.
    if (!alloc.exact) {
      throw new Error("Question bank cannot satisfy the configured scenario/domain allocation");
    }

    var picked = chosen.map(function (_, r) {
      var out = [];
      alloc.matrix[r].forEach(function (n, c) {
        for (var k = 0; k < n; k++) out.push(pools[r][c].pop());
      });
      return out;
    });

    var out = [];
    picked.forEach(function (list) { shuffle(list).forEach(function (q) { out.push(q); }); });
    return out;
  }

  function drawWeighted(course) {
    var out = [];
    course.domains.forEach(function (dom) {
      out = out.concat(pickN(course.questions.filter(function (q) {
        return q.d === dom.id;
      }), dom.examCount));
    });
    return shuffle(out);
  }

  // Returns the raw bank questions for this attempt, in presentation order.
  function drawQuestions(course) {
    return isScenarioCourse(course) ? drawScenario(course) : drawWeighted(course);
  }

  // A saved attempt refers to questions by bank index, so it must be rejected if the
  // bank has changed underneath it. An earlier version hashed only question count, stem
  // LENGTH and key positions — which meant swapping a stem for different text of the same
  // length, or rewriting an option, left the fingerprint identical. A restored attempt
  // would then map saved answer positions onto different content. Hash the full content.
  function bankFingerprint(course) {
    var payload = JSON.stringify(course.questions.map(function (q) {
      return { d: q.d, t: q.t, q: q.q, o: q.o, c: q.c, sc: q.sc || null };
    }));
    // FNV-1a over the payload, plus a second pass with a different seed, so a short
    // digest still distinguishes small edits reliably.
    var h1 = 2166136261, h2 = 5381;
    for (var i = 0; i < payload.length; i++) {
      var ch = payload.charCodeAt(i);
      h1 ^= ch; h1 = Math.imul(h1, 16777619);
      h2 = ((h2 << 5) + h2 + ch) | 0;
    }
    return course.code + "-" + course.questions.length + "-" +
           (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
  }

  var api = {
    allocate: allocate,
    shuffle: shuffle,
    pickN: pickN,
    domainTargets: domainTargets,
    isScenarioCourse: isScenarioCourse,
    drawQuestions: drawQuestions,
    bankFingerprint: bankFingerprint
  };

  global.ExamEngine = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
