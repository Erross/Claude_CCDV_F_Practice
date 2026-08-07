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

  // Scenario exams: draw a subset of scenarios, then fill each block against an
  // exam-level domain quota. Sampling each block uniformly would let pool composition
  // decide the exam's domain mix instead of the blueprint.
  function drawScenario(course) {
    var chosen = pickN(course.scenarios, course.scenarioDraw.scenarios);
    var per = course.scenarioDraw.perScenario;
    var remaining = domainTargets(course, chosen.length * per);

    var pools = chosen.map(function (sc) {
      var byDom = {};
      course.domains.forEach(function (d) {
        byDom[d.id] = shuffle(course.questions.filter(function (q) {
          return q.sc === sc.id && q.d === d.id;
        }));
      });
      return byDom;
    });

    var picked = chosen.map(function () { return []; });

    // Scarcest domain first, round-robin across blocks, so a thin domain isn't crowded out.
    Object.keys(remaining).sort(function (a, b) {
      return pools.reduce(function (s, p) { return s + p[a].length; }, 0) -
             pools.reduce(function (s, p) { return s + p[b].length; }, 0);
    }).forEach(function (dom) {
      var want = remaining[dom], guard = 0;
      while (want > 0 && guard < 1000) {
        var progressed = false;
        for (var i = 0; i < pools.length && want > 0; i++) {
          if (picked[i].length >= per || !pools[i][dom].length) continue;
          picked[i].push(pools[i][dom].pop());
          want--; progressed = true;
        }
        if (!progressed) break;
        guard++;
      }
    });

    // Backfill any block left short by a pool gap.
    picked.forEach(function (list, i) {
      if (list.length >= per) return;
      var left = [];
      course.domains.forEach(function (d) { left = left.concat(pools[i][d.id]); });
      shuffle(left).slice(0, per - list.length).forEach(function (q) { list.push(q); });
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
  // bank has changed underneath it. Cheap order-sensitive fingerprint over the stems.
  function bankFingerprint(course) {
    var h = 5381;
    var s = course.code + "|" + course.questions.length + "|" +
            course.questions.map(function (q) { return q.q.length + ":" + q.c.join(","); }).join("|");
    for (var i = 0; i < s.length; i++) {
      h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    }
    return course.code + "-" + course.questions.length + "-" + (h >>> 0).toString(36);
  }

  var api = {
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
