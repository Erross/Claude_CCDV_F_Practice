const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),os=require('os');
const {JSDOM}=require('jsdom');
const E=require('../exam');global.ExamEngine=E;
const config=require('../cdmp/config');
let bank;global.registerCourse=c=>{bank=c;};require('../cdmp/questions');
const {buildPreview}=require('./build-cdmp-preview');const preview=buildPreview();
let passed=0;
function test(name,fn){fn();passed++;console.log('  pass  '+name);}
function boot(saved={},clock={now:Date.now()}) {
 const html=fs.readFileSync(path.join(preview,'index.html'),'utf8');
 const dom=new JSDOM(html,{url:'https://cdmp.test/',runScripts:'outside-only'});const w=dom.window;const intervals=[];
 w.scrollTo=()=>{};w.Date.now=()=>clock.now;
 w.setInterval=f=>(intervals.push(f),intervals.length);w.clearInterval=id=>{intervals[id-1]=null;};
 for(const [k,v] of Object.entries(saved))w.localStorage.setItem(k,v);
 for(const m of html.matchAll(/<script src="([^"]+)"/g)) w.eval(fs.readFileSync(path.join(preview,m[1]),'utf8'));
 w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 return {w,d:w.document,clock,close:()=>w.close(),tick:()=>intervals.forEach(f=>f&&f()),snapshot:()=>Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)]))};
}
function select(ctx,target=60,esl=false) {
 const {d,w}=ctx;d.querySelector('.course-card:not(:disabled)').click();
 const targetEl=d.getElementById('score-target');targetEl.value=String(target);targetEl.dispatchEvent(new w.Event('change'));
 if(esl){const t=d.getElementById('timing-mode');t.value='esl';t.dispatchEvent(new w.Event('change'));}
 d.getElementById('start-btn').click();
}
function finish(ctx){ctx.d.getElementById('submit-btn').click();ctx.d.getElementById('presubmit-submit').click();}
const active='cdmp-draft:v1:active-attempt',history='cdmp-draft:v1:history';
test('pilot inventory and all 14 domain quotas agree',()=>{
 assert.equal(bank.questions.length,40);assert.equal(config.pilot.domains.length,14);
 for(const d of config.pilot.domains)assert.equal(bank.questions.filter(q=>q.d===d.id).length,d.examCount,d.id);
 assert.equal(config.full.items,100);assert.equal(config.full.minutes,90);assert.equal(config.full.eslMinutes,110);
 assert.equal(config.pilot.minutes,36);assert.equal(config.pilot.eslMinutes,44);
});
test('all pilot items have unique identities, per-option rationales and provenance',()=>{
 assert.equal(new Set(bank.questions.map(q=>q.id)).size,40);assert.equal(new Set(bank.questions.map(q=>q.family)).size,40);
 for(const q of bank.questions){assert.equal(q.o.length,4);assert.equal(new Set(q.o).size,4);assert.equal(q.rationales.length,4);assert.equal(q.c.length,1);assert.ok(q.c[0]>=0&&q.c[0]<4);assert.ok(q.e.length>25);assert.ok(q.sources.length);assert.equal(q.reviewStatus,'draft-author-checked');for(const source of q.sources)assert.match(source.url,/^https:\/\//);}
});
test('5,000 pilot shuffles preserve exact topic counts and keys',()=>{
 for(let i=0;i<5000;i++){
  const draw=E.drawQuestions(bank);assert.equal(new Set(draw).size,40);
  for(const d of bank.domains)assert.equal(draw.filter(q=>q.d===d.id).length,d.examCount);
  const q=draw[i%40], order=E.shuffle([0,1,2,3]);assert.equal(q.o[order[order.indexOf(q.c[0])]],q.o[q.c[0]]);
 }
});
test('5,000 synthetic full forms preserve all official quotas',()=>{
 const fixture={...config.full,questions:config.full.domains.flatMap(d=>Array.from({length:d.examCount*4},(_,i)=>({id:d.id+i,d:d.id})))};
 for(let i=0;i<5000;i++){const draw=E.drawQuestions(fixture);assert.equal(new Set(draw).size,100);for(const d of fixture.domains)assert.equal(draw.filter(q=>q.d===d.id).length,d.weight);}
});
test('insufficient real pilot bank fails a full form explicitly',()=>assert.throws(()=>E.drawQuestions({...config.full,questions:bank.questions}),/cannot satisfy/));
test('percentage scoring honors exact 60, 70 and 80 boundaries',()=>{
 for(const target of [60,70,80]){assert.equal(E.scoreAttempt(config.full,target-1,100,target).passed,false);assert.equal(E.scoreAttempt(config.full,target,100,target).passed,true);}
 assert.equal(E.scoreAttempt(config.pilot,23,40,60).value,57.5);assert.equal(E.scoreAttempt(config.pilot,24,40,60).passed,true);
 assert.throws(()=>E.scoreAttempt(config.pilot,40,40,75),/target/);assert.throws(()=>E.scoreAttempt(config.pilot,41,40),/counts/);
});
test('short-form tie allocation is deterministic without floating-point bias',()=>{
 const targets=E.domainTargets(config.full,40);assert.equal(targets.DA,3);assert.equal(targets.DC,3);assert.equal(targets.DI,2);assert.equal(targets.DG,5);
 assert.equal(config.pilot.domains.reduce((n,d)=>n+d.examCount,0),40);
});
test('full exam stays disabled; draft status and repeat limitations are visible',()=>{
 const c=boot();try{assert.equal(c.d.querySelectorAll('.course-card:disabled').length,1);assert.match(c.d.body.textContent,/Draft calibration/);c.d.querySelector('.course-card:not(:disabled)').click();assert.match(c.d.getElementById('format-note').textContent,/all 40 questions repeat/);assert.equal(c.d.getElementById('stat-pass').textContent,'60%');}finally{c.close();}
});
test('ESL setting and target survive resume without extending deadline',()=>{
 const c=boot();select(c,80,true);let saved=JSON.parse(c.w.localStorage.getItem(active));assert.equal(saved.durationMinutes,44);assert.equal(saved.target,80);assert.equal(saved.deadline-saved.startedAt,44*60000);
 const snapshot=c.snapshot(),clock=c.clock;clock.now+=60000;c.close();const r=boot(snapshot,clock);
 try{r.d.getElementById('resume-go').click();assert.equal(r.d.getElementById('timer').textContent,'43:00');finish(r);const row=JSON.parse(r.w.localStorage.getItem(history)).attempts[0];assert.equal(row.target,80);assert.equal(row.durationMinutes,44);assert.equal(row.percentage,0);assert.ok(!('scaled' in row));assert.doesNotMatch(r.d.getElementById('score-detail').textContent,/scaled/);assert.match(r.d.getElementById('threshold-detail').textContent,/60%: not met/);}finally{r.close();}
});
test('pre-submit expiry automatically scores and clears the active pilot',()=>{
 const c=boot();try{select(c);c.d.getElementById('submit-btn').click();c.clock.now+=36*60000+1;c.tick();assert.equal(c.w.localStorage.getItem(active),null);assert.equal(c.d.getElementById('results-screen').hidden,false);assert.equal(JSON.parse(c.w.localStorage.getItem(history)).attempts[0].seconds,2160);}finally{c.close();}
});
test('all-correct shuffled pilot scores 100% with explanations and history',()=>{
 const c=boot();try{select(c,70);const saved=JSON.parse(c.w.localStorage.getItem(active));
 for(let i=0;i<40;i++){const rec=saved.questions[i],q=bank.questions[rec.i],correct=rec.o.indexOf(q.c[0]);const input=c.d.querySelectorAll('#options input')[correct];input.checked=true;input.dispatchEvent(new c.w.Event('change'));if(i<39)c.d.getElementById('next-btn').click();}
 finish(c);assert.equal(c.d.getElementById('score-pct').textContent,'100%');assert.equal(c.d.getElementById('pass-badge').textContent,'Target met');assert.equal(c.d.querySelectorAll('.option-rationales li').length,160);assert.match(c.d.querySelector('.source-note').textContent,/independent content review pending/);
 c.d.getElementById('retake-btn').click();assert.match(c.d.getElementById('history-body').textContent,/100%/);assert.doesNotMatch(c.d.getElementById('history-body').textContent,/Likely pass|Scaled/);
 }finally{c.close();}
});
test('corrupt pilot timing, target and option permutation cannot resume',()=>{
 const c=boot();select(c);const snapshot=c.snapshot(),original=JSON.parse(snapshot[active]);c.close();
 for(const mutate of [a=>{a.target=75;},a=>{a.durationMinutes=120;},a=>{a.questions[0].o=[0,0,1,2];}]){
 const bad=JSON.parse(JSON.stringify(original));mutate(bad);const r=boot({...snapshot,[active]:JSON.stringify(bad)});try{assert.equal(r.w.localStorage.getItem(active),null);}finally{r.close();}}
});
test('production build excludes all pilot content and has no preview activation',()=>{
 const {buildSite}=require('./build');const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'cdmp-gate-'));
 try{const r=buildSite(path.join(tmp,'site'));assert.equal(fs.existsSync(path.join(r.outDir,'cdmp')),false);assert.doesNotMatch(fs.readFileSync(path.join(r.outDir,'index.html'),'utf8'),/cdmp\/questions|CDMPConfig/);}finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
const longest=bank.questions.filter(q=>q.o[q.c[0]].length>Math.max(...q.o.filter((_,i)=>i!==q.c[0]).map(o=>o.length))).length;
console.log(`\nCDMP: ${passed} checks passed. Draft editorial metric: correct answer uniquely longest in ${longest}/40 items. Independent semantic review is still required.`);
