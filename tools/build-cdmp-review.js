// Generate a cold-review packet from an explicit allowlist of question fields.
// Source option order is used; answers must be recorded against the packet fingerprint.
const fs = require('node:fs');
const path = require('node:path');
const E = require('../exam');
const config = require('../cdmp/config');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');

function loadBank() {
  let bank;
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'cdmp/questions.js'), 'utf8'), {
    CDMPConfig: config,
    registerCourse: course => { bank = course; }
  });
  return bank;
}

function renderPacket(bank = loadBank()) {
  const fingerprint = E.bankFingerprint(bank);
  const lines = [
    '# CDMP cold-review pilot', '',
    `Version: ${config.version}`, `Bank fingerprint: ${fingerprint}`, '',
    'This unofficial draft has not been calibrated against the real exam.',
    'Allow 36 minutes, or 44 minutes at the ESL practice pace. You may use your own reference.',
    'Do not read the source bank, explanations, review records or answer key before recording your answers.',
    'The four-option format is provisional; official option-count verification is still pending.', '',
    'Record the packet version, your prior DMBOK study, whether you saw the previous pilot, and total time.',
    'For each item record the letter, confidence (low/medium/high), whether you looked it up,',
    'and any ambiguity or alternative you consider defensible. A blank means unanswered.',
    'Return responses before opening feedback. This packet contains only stems and choices.', ''
  ];
  bank.questions.forEach((q, i) => {
    lines.push(`## ${i + 1}. ${q.id}`, '', q.q, '');
    q.o.forEach((option, j) => lines.push(`${String.fromCharCode(65 + j)}. ${option}`, ''));
    lines.push('Response: ___ | Confidence: ___ | Looked up: ___ | Comment: ___', '');
  });
  return lines.join('\n');
}

if (require.main === module) {
  const dest = path.join(ROOT, 'cdmp/BLIND_PILOT.md');
  fs.writeFileSync(dest, renderPacket());
  console.log('Wrote cdmp/BLIND_PILOT.md (stems and options only).');
}
module.exports = { renderPacket, loadBank };
