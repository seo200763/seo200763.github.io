/* 공통: 저장소 설정, 깃허브 API(토큰), 올리기/삭제 창, 기종 목록 */
const C={owner:'youngho1206',repo:'youngho1206.github.io',br:'main',max:100};
(()=>{const h=location.hostname;if(/\.github\.io$/.test(h)){C.owner=h.split('.')[0];const p=location.pathname.split('/')[1];C.repo=p&&!/\./.test(p)?p:h}})();
const $=s=>document.querySelector(s),mb=n=>n>=1048576?(n/1048576).toFixed(1)+'MB':Math.max(1,Math.round(n/1024))+'KB';
const tok=()=>localStorage.gh_token||'',hd=()=>({Accept:'application/vnd.github+json',...(tok()?{Authorization:'Bearer '+tok()}:{})});
const API=p=>`https://api.github.com/repos/${C.owner}/${C.repo}/contents/`+p.split('/').map(encodeURIComponent).join('/');
const RAW=p=>p.split('/').map(encodeURIComponent).join('/');   /* 같은 사이트의 상대 주소 */
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=m;t.style.display='block';clearTimeout(t.h);t.h=setTimeout(()=>t.style.display='none',2600)}
async function ls(dir){const r=await fetch(API(dir)+'?ref='+C.br+'&t='+Date.now(),{headers:hd(),cache:'no-store'});if(r.status==404)return[];if(!r.ok)throw Error('목록 불러오기 실패('+r.status+')');return(await r.json()).filter(f=>f.type=='file'&&f.name!='.gitkeep')}
async function put(path,file){const b=await new Promise((o,x)=>{const f=new FileReader();f.onload=()=>o(f.result.split(',')[1]);f.onerror=x;f.readAsDataURL(file)});
 let sha;const g=await fetch(API(path)+'?ref='+C.br,{headers:hd()});if(g.ok)sha=(await g.json()).sha;
 const r=await fetch(API(path),{method:'PUT',headers:{...hd(),'Content-Type':'application/json'},body:JSON.stringify({message:'upload '+path,content:b,branch:C.br,sha})});if(!r.ok)throw Error((await r.json()).message||r.status)}
async function del(path,sha){const r=await fetch(API(path),{method:'DELETE',headers:{...hd(),'Content-Type':'application/json'},body:JSON.stringify({message:'delete '+path,sha,branch:C.br})});if(!r.ok)throw Error((await r.json()).message||r.status)}
function dlg(h){const d=document.createElement('div');d.className='dlg';d.innerHTML='<div>'+h+'</div>';document.body.appendChild(d);d.onclick=e=>{if(e.target==d)d.remove()};return d}
/* 토큰 확인 창: run(상태표시함수) 를 실행 */
function conf(title,msg,run){const d=dlg(`<h3>${title}</h3>${msg}<input id=tk type=password placeholder="GitHub 토큰 (Contents 읽기/쓰기)" value="${tok()}"><div class=bt><button id=no>취소</button><button id=ok>확인</button></div><p id=st></p>`);
 d.querySelector('#no').onclick=()=>d.remove();
 d.querySelector('#ok').onclick=async()=>{const t=d.querySelector('#tk').value.trim();if(!t)return toast('토큰을 입력하세요');localStorage.gh_token=t;const ok=d.querySelector('#ok');ok.disabled=true;
  try{await run(m=>d.querySelector('#st').textContent=m);d.remove()}catch(e){d.querySelector('#st').textContent='실패: '+(e.message||e);ok.disabled=false}}}
/* 올리기: 용량 표시 → 토큰 → 저장소에 저장 */
function upDlg(files,dir,done,rename){files=[...files];const okf=files.filter(f=>f.size<=C.max*1048576),n=files.length-okf.length;
 if(!okf.length)return toast('최대 '+C.max+'MB 를 넘는 파일입니다');
 conf('올리기',`<p>선택 ${okf.length}개 · 합계 ${mb(okf.reduce((s,f)=>s+f.size,0))}</p><p>깃허브 웹 API 기준 <b>파일당 최대 ${C.max}MB</b> (25MB 이하 권장)</p>${n?`<p class=bad>${n}개는 ${C.max}MB 초과로 제외됩니다</p>`:''}`,async st=>{
  for(let i=0;i<okf.length;i++){st(`올리는 중 ${i+1}/${okf.length} · ${okf[i].name}`);await put(dir+'/'+(rename?rename(okf[i],i):okf[i].name),okf[i])}
  toast('올리기 완료 (반영까지 1~2분)');done&&done()})}
const SYS=[
{id:'dos',n:'도스게임',f:'DOS',core:'dos',x:'zip dosz exe com bat iso cue',a:'#8a93a3',b:'#1c2230',l:'DOS'},
{id:'win95',n:'윈도우95게임',f:'WIN95',core:null,x:'iso img zip',a:'#35c5c0',b:'#0b5a63',l:'95'},
{id:'mame',n:'마메',f:'MAME',core:'fbneo',x:'zip 7z',a:'#ffa13a',b:'#8a3400',l:'MAME'},
{id:'neogeo',n:'네오지오',f:'NEOGEO',core:'fbneo',x:'zip',a:'#ffd53a',b:'#8a5a00',l:'NEO'},
{id:'gbc',n:'GBC',f:'GBC',core:'gb',x:'gbc gb',a:'#3de0c9',b:'#0a5a50',l:'GBC'},
{id:'gba',n:'GBA',f:'GBA',core:'gba',x:'gba',a:'#8a8dff',b:'#2a2a8a',l:'GBA'},
{id:'nes',n:'NES',f:'NES',core:'nes',x:'nes',a:'#ff5a6a',b:'#7a1020',l:'NES'},
{id:'snes',n:'SNES',f:'SNES',core:'snes',x:'sfc smc',a:'#b48aff',b:'#3a1a8a',l:'SFC'},
{id:'md',n:'세가 제네시스',f:'GENESIS',core:'segaMD',x:'md gen smd bin',a:'#5a6070',b:'#0a0c12',l:'MD'},
{id:'32x',n:'세가 32X',f:'SEGA32X',core:'sega32x',x:'32x bin',a:'#ff6a3a',b:'#6a1a00',l:'32X'},
{id:'segacd',n:'세가CD',f:'SEGACD',core:'segaCD',x:'iso cue bin chd',a:'#3a8aff',b:'#0a2a7a',l:'MCD'},
{id:'saturn',n:'세가새턴',f:'SATURN',core:'segaSaturn',x:'cue iso bin chd',a:'#9aa6b8',b:'#2a3550',l:'SS'},
{id:'nds',n:'NDS',f:'NDS',core:'desmume2015',x:'nds',a:'#c8d2e4',b:'#3a4a6a',l:'NDS'},
{id:'n64',n:'N64',f:'N64',core:'n64',x:'z64 n64 v64',a:'#3ddc6a',b:'#0a5a24',l:'N64'},
{id:'psx',n:'PSX',f:'PSX',core:'psx',x:'bin cue iso img chd pbp m3u',a:'#8a9ab8',b:'#1a2440',l:'PS1'},
{id:'psp',n:'PSP',f:'PSP',core:'psp',x:'iso cso pbp',a:'#5a5a64',b:'#0a0a12',l:'PSP'},
{id:'wii',n:'WII',f:'WII',core:null,x:'iso wbfs rvz',a:'#6ad0ff',b:'#0a4a7a',l:'Wii'}];
