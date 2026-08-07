// Course registry for the Claude certification practice exams.
// catalog.js registers lightweight public metadata for every course. Each
// data/<code>.js file then calls registerCourse(...) to attach its question bank.
//
// A course object looks like:
// {
//   code:        "CCDV-F",
//   name:        "Claude Certified Developer",
//   tier:        "Foundations",
//   blurb:       short description shown on the course card,
//   audience:    who the exam targets,
//   items:       number of questions drawn per attempt,
//   minutes:     time limit,
//   passScore:   scaled score needed to pass (100-1000 scale),
//   fee:         Anthropic's published exam fee, for reference only,
//   status:      "coming-soon" keeps an unreleased course registered but inaccessible,
//   domains:     [{ id, name, weight, examCount }]  (examCount omitted for scenario exams),
//   scenarioDraw:{ scenarios: 4, perScenario: 15 }  (scenario-based exams only),
//   scenarios:   [{ id, title, text }]              (scenario-based exams only),
//   questions:   [{ d, t, q, o, c, e, sc? }]
// }

(function (global) {
  "use strict";

  var COURSE_META = [];
  var BANKS = {};

  global.registerCourseMetadata = function (entries) {
    COURSE_META = entries.slice();
  };

  global.registerCourse = function (course) {
    BANKS[course.code] = course;
  };

  function resolveCourse(meta) {
    var bank = BANKS[meta.code];
    if (!bank) return Object.assign({}, meta);
    // Release status and asset selection belong to the catalog, not to a bank that
    // may be present in the repository for private auditing.
    return Object.assign({}, meta, bank, {
      status: meta.status,
      asset: meta.asset,
      bankSize: meta.bankSize
    });
  }

  global.getCourses = function () {
    var out = COURSE_META.map(resolveCourse);
    Object.keys(BANKS).forEach(function (code) {
      if (!COURSE_META.some(function (m) { return m.code === code; })) out.push(BANKS[code]);
    });
    return out;
  };

  global.getCourse = function (code) {
    for (var i = 0; i < COURSE_META.length; i++) {
      if (COURSE_META[i].code === code) return resolveCourse(COURSE_META[i]);
    }
    return BANKS[code] || null;
  };

  global.getCourseCatalog = function () {
    return COURSE_META.map(function (m) { return Object.assign({}, m); });
  };

  global.isCourseLoaded = function (course) {
    return !!(course && Array.isArray(course.questions));
  };

  // Availability requires both release approval and a loaded bank. A catalog entry
  // alone can render a Coming soon card, but can never start an exam.
  global.isCourseAvailable = function (course) {
    return !!course && course.status === "available" && global.isCourseLoaded(course);
  };

  // Scenario exams don't carry per-domain examCount, so derive the domain mix
  // from the questions that were actually drawn instead.
  global.isScenarioCourse = function (course) {
    return !!(course && course.scenarioDraw && course.scenarios && course.scenarios.length);
  };

  // Palette applied by position, so it works for any course's domain ids.
  var PALETTE = [
    "#54c7b8", "#e8a33d", "#7f9ce8", "#e86ba0",
    "#9d7fe8", "#e5646a", "#6bc9e8", "#8fd16b"
  ];

  global.domainColor = function (course, domainId) {
    if (!course) return PALETTE[0];
    for (var i = 0; i < course.domains.length; i++) {
      if (course.domains[i].id === domainId) return PALETTE[i % PALETTE.length];
    }
    return PALETTE[0];
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      getCourses: global.getCourses,
      getCourse: global.getCourse,
      registerCourse: global.registerCourse,
      registerCourseMetadata: global.registerCourseMetadata,
      getCourseCatalog: global.getCourseCatalog,
      isCourseAvailable: global.isCourseAvailable,
      isCourseLoaded: global.isCourseLoaded,
      isScenarioCourse: global.isScenarioCourse,
      domainColor: global.domainColor
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
