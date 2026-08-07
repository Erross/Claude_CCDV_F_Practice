// Build the public GitHub Pages artifact from the release catalog.
// Gated bank files stay in the repository for auditing but never enter _site.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
global.window = global;
require(path.join(ROOT, "courses.js"));
require(path.join(ROOT, "catalog.js"));

const RUNTIME_FILES = [
  "index.html", "style.css", "courses.js", "catalog.js", "exam.js", "app.js", "LICENSE"
];

function copy(relative, outDir) {
  const source = path.join(ROOT, relative);
  const target = path.join(outDir, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function buildSite(outDir) {
  outDir = path.resolve(outDir || path.join(ROOT, "_site"));
  if (outDir === path.resolve(ROOT)) throw new Error("Refusing to build over the repository root");
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  RUNTIME_FILES.forEach(file => copy(file, outDir));
  const catalog = global.getCourseCatalog();
  const available = catalog.filter(course => course.status === "available");
  const gated = catalog.filter(course => course.status !== "available");
  available.forEach(course => copy(course.asset, outDir));

  const html = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
  available.forEach(course => {
    if (!html.includes('src="' + course.asset + '"')) {
      throw new Error("Released bank is not loaded by index.html: " + course.asset);
    }
  });
  gated.forEach(course => {
    if (html.includes(course.asset) || fs.existsSync(path.join(outDir, course.asset))) {
      throw new Error("Gated bank leaked into the public artifact: " + course.asset);
    }
  });
  return { outDir, available, gated };
}

if (require.main === module) {
  const result = buildSite(process.argv[2]);
  console.log("Built " + result.outDir + " with " + result.available.length + " released bank(s); " +
    result.gated.length + " gated bank(s) excluded.");
}

module.exports = { buildSite };
