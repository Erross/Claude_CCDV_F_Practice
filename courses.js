// Course registry for the Claude certification practice exams.
// Each data/<code>.js file calls registerCourse(...) to add itself here.
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

  var COURSES = [];

  global.registerCourse = function (course) {
    COURSES.push(course);
  };

  global.getCourses = function () {
    return COURSES.slice();
  };

  global.getCourse = function (code) {
    for (var i = 0; i < COURSES.length; i++) {
      if (COURSES[i].code === code) return COURSES[i];
    }
    return null;
  };

  // Courses are released by default. This lets a bank remain loaded, audited and
  // exercised by the shared engine while the web interface keeps it unavailable.
  global.isCourseAvailable = function (course) {
    return !!course && course.status !== "coming-soon";
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
      isCourseAvailable: global.isCourseAvailable,
      isScenarioCourse: global.isScenarioCourse,
      domainColor: global.domainColor
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
