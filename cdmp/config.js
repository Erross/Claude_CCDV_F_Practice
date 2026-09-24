// Unpublished CDMP draft. This catalog is only loaded by the preview builder.
(function(global){
  'use strict';
  var rows = [
    ['DM','Data Management Process',2], ['BD','Big Data',2],
    ['DA','Data Architecture',6], ['DC','Document and Content Management',6],
    ['DE','Data Ethics',2], ['DG','Data Governance',11],
    ['DI','Data Integration and Interoperability',6], ['MR','Master and Reference Data Management',10],
    ['MD','Data Modelling and Design',11], ['DQ','Data Quality',11],
    ['DS','Data Security',6], ['SO','Data Storage and Operations',6],
    ['BI','Data Warehousing and Business Intelligence',10], ['MM','Metadata Management',11]
  ];
  var domains = rows.map(function(r){ return { id:r[0], name:r[1], weight:r[2], examCount:r[2] }; });
  // The 40-item calibration allocation is fixed to the authored pilot. It is a
  // rounded practice allocation, not a claim that DAMA publishes a 40-item form.
  var pilotCounts = { DM:1, BD:1, DA:3, DC:3, DE:1, DG:4, DI:3, MR:4,
    MD:4, DQ:4, DS:2, SO:2, BI:4, MM:4 };
  var full = { code:'CDMP-DMF', name:'Data Management Fundamentals', tier:'Full simulation - in development',
    status:'coming-soon', asset:'cdmp/questions.js', bankSize:40, items:100, minutes:90, eslMinutes:110,
    passScore:60, scoring:'percentage', domains:domains,
    blurb:'Full simulation is locked until the question bank and independent reviews are complete.' };
  var pilot = Object.assign({}, full, { code:'CDMP-DMF-PILOT', tier:'Draft calibration pilot',
    status:'draft', items:40, minutes:36, eslMinutes:44,
    domains:domains.map(function(d){ return Object.assign({}, d, { examCount:pilotCounts[d.id] }); }),
    blurb:'40 original draft questions. Review content and behavior before full bank expansion.',
    practiceNote:'Pilot only: all 40 questions repeat on retakes. Topic counts are rounded from the official weights. The 36/44-minute limits scale the 90/110-minute full-exam pace; they are our practice settings. Questions use four single-answer options pending independent format calibration. You may consult your own reference. Detailed feedback appears after submission.' });
  global.CDMPConfig = { full:full, pilot:pilot, version:'0.1.1-draft', sourceChecked:'2026-09-24' };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.CDMPConfig;
})(typeof window !== 'undefined' ? window : globalThis);
