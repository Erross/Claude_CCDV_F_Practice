// Explicit developer preview only. Production tools/build.js never includes cdmp/.
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
function buildPreview(outDir=path.join(ROOT,'_cdmp-preview')) {
  outDir=path.resolve(outDir);
  if (outDir!==path.join(ROOT,'_cdmp-preview')) throw new Error('Preview output must be _cdmp-preview');
  fs.rmSync(outDir,{recursive:true,force:true});fs.mkdirSync(outDir,{recursive:true});
  for(const file of ['courses.js','exam.js','app.js','style.css','LICENSE','cdmp/config.js','cdmp/questions.js']) {
    fs.mkdirSync(path.dirname(path.join(outDir,file)),{recursive:true});
    let text=fs.readFileSync(path.join(ROOT,file),'utf8');
    if(file==='app.js') text=text.replaceAll('claude-exams:v1:','cdmp-draft:v1:').replaceAll('claude-exam-history-','cdmp-draft-history-');
    fs.writeFileSync(path.join(outDir,file),text);
  }
  fs.writeFileSync(path.join(outDir,'catalog.js'),
    '// Preview-only activation; source CDMP status remains draft.\nregisterCourseMetadata([Object.assign({},CDMPConfig.pilot,{status:"available"}),CDMPConfig.full]);\n');
  let html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
  html=html.replace(/<title>.*?<\/title>/,'<title>CDMP Practice - Draft Pilot</title>')
    .replace(/<meta name="description"[^>]+>/,'<meta name="description" content="Unpublished CDMP practice pilot for content and runtime review.">')
    .replaceAll('CLAUDE CERT//','CDMP DRAFT//')
    .replace(/<h1 id="main-content"[^>]*>.*?<\/h1>/,'<h1 id="main-content" class="hero-title" tabindex="-1">Data Management Fundamentals</h1>')
    .replace(/<p class="hero-sub">[\s\S]*?<\/p>/,'<p class="hero-sub">Draft calibration pilot. Review 40 original questions across 14 topics. The full 100-question simulation is in development.</p>')
    .replace(/<p class="disclaimer">[\s\S]*?<\/p>/g,'<p class="disclaimer">Independent, unofficial draft practice. Not affiliated with or endorsed by DAMA International. Questions and difficulty are not independently certified. Scores describe this pilot only; they do not award a credential or predict an official exam result.</p>')
    .replace('Domain weighting (mirrors the official blueprint)','Official topic weights (pilot question counts are rounded)')
    .replace('Every attempt pulls a fresh set, sampled per domain in proportion to its exam weight.','All 40 pilot items appear on each attempt, with shuffled question and option order. Full-bank retake variety is planned.')
    .replace('Weighted random draw','Shuffled pilot')
    .replace(/<script src="(?:catalog|exam)\.js"><\/script>\s*/g,'')
    .replace(/<script src="data\/[^\"]+"><\/script>\s*/g,'')
    .replace('<script src="app.js"></script>','<script src="exam.js"></script>\n<script src="cdmp/config.js"></script>\n<script src="catalog.js"></script>\n<script src="cdmp/questions.js"></script>\n<script src="app.js"></script>');
  fs.writeFileSync(path.join(outDir,'index.html'),html);
  return outDir;
}
if(require.main===module) console.log('Built unpublished CDMP preview: '+buildPreview());
module.exports={buildPreview};
