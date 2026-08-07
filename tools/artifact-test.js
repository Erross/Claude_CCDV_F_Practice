// Verify the exact bytes destined for GitHub Pages, not just the source-level UI gate.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { buildSite } = require("./build.js");

const root = fs.mkdtempSync(path.join(os.tmpdir(), "claude-exams-artifact-"));
let failed = 0;
function assert(value, message) { if (!value) { failed++; console.log("  FAIL  " + message); } }

try {
  const result = buildSite(path.join(root, "site"));
  const html = fs.readFileSync(path.join(result.outDir, "index.html"), "utf8");
  result.available.forEach(course => {
    assert(fs.existsSync(path.join(result.outDir, course.asset)), "released bank missing: " + course.asset);
    assert(html.includes('src="' + course.asset + '"'), "released bank not referenced: " + course.asset);
  });
  result.gated.forEach(course => {
    assert(!fs.existsSync(path.join(result.outDir, course.asset)), "gated bank published: " + course.asset);
    assert(!html.includes(course.asset), "gated bank referenced by HTML: " + course.asset);
  });
  assert(!fs.existsSync(path.join(result.outDir, "tools")), "developer tooling was published");
  assert(!fs.existsSync(path.join(result.outDir, "questions.js")), "legacy question file was published");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}

if (failed) process.exit(1);
console.log("\npublic artifact: pass (released banks only; gated content excluded)");
