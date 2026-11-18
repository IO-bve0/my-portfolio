const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1900)};

/* ---------- Landing: mood switcher ---------- */
const moods={
 calm:{h:'Calm Horizons',d:'Stillness, held in light.',s:['#14325A','#1F4E79','#8FC1E8'],x:['35mm','f/8','1/250s','ISO 100'],p:['Still water','Soft dawn','Quiet shore']},
 fleet:{h:'Fleeting Moments',d:'Gone in a blink, kept for good.',s:['#1F4E79','#5C9BDB','#A9C1DB'],x:['85mm','f/1.8','1/2000s','ISO 400'],p:['Golden laugh','Petal drift','Last light']},
 eternal:{h:'Eternal Motion',d:'Time, stretched into silk.',s:['#0B1F3A','#14325A','#1F4E79'],x:['24mm','f/16','30s','ISO 50'],p:['Star trails','Silk water','Endless tide']}
};
function setMood(k){
 const m=moods[k],vf=$('#home');
 m.s.forEach((c,i)=>vf.style.setProperty('--s'+(i+1),c));
 $('#h1').textContent=m.h;$('#sub').textContent=m.d;
 $$('.exif span').forEach((e,i)=>e.textContent=m.x[i]);
 $$('.pol span').forEach((e,i)=>e.textContent=m.p[i]);
 $$('.moods .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===k));
}
$$('.moods .chip').forEach(b=>b.onclick=()=>setMood(b.dataset.m));
setMood('calm');

$('#gridBtn').onclick=e=>{
 const on=$('#home').classList.toggle('show-thirds');
 e.currentTarget.setAttribute('aria-pressed',on);
 if(on)$('#home').scrollIntoView({block:'start'});
};

/* ---------- Gallery ---------- */
const L={calm:'Calm Horizons',fleet:'Fleeting Moments',eternal:'Eternal Motion',prop:'@ Properties'};
/* [title, category, height, colors, EXIF, optional photo path]
   Swap in real photos by adding a path as the 6th item, e.g. 'photos/mirror-tide.jpg'.
   If a path is missing or fails to load, generated artwork is shown instead, so nothing breaks. */
const P=[
 ['Mirror Tide','calm',400,['#8FC1E8','#DCE8F5','#1F4E79'],'35mm · f/8 · 1/250s · ISO 100'],
 ['Gold Hour Laugh','fleet',500,['#5C9BDB','#DCE8F5','#A9C1DB'],'85mm · f/1.8 · 1/2000s · ISO 400'],
 ['Corner Suite','prop',300,['#8FC1E8','#F4F7FB','#A9C1DB'],'16mm · f/9 · 1/125s · ISO 100'],
 ['Star Trails','eternal',500,['#0B1F3A','#1F4E79','#5C9BDB'],'24mm · f/2.8 · 30s · ISO 1600'],
 ['Quiet Shore','calm',300,['#DCE8F5','#8FC1E8','#A9C1DB'],'50mm · f/11 · 1/200s · ISO 100'],
 ['Petal Drift','fleet',400,['#DCE8F5','#5C9BDB','#1F4E79'],'85mm · f/2 · 1/1600s · ISO 320'],
 ['Atrium Light','prop',500,['#DCE8F5','#8FC1E8','#1F4E79'],'17mm · f/8 · 1/60s · ISO 200'],
 ['Silk Water','eternal',300,['#8FC1E8','#A9C1DB','#5C9BDB'],'35mm · f/16 · 20s · ISO 50'],
 ['Soft Dawn','calm',500,['#5C9BDB','#DCE8F5','#8FC1E8'],'70mm · f/9 · 1/320s · ISO 100'],
 ['Last Light','fleet',300,['#1F4E79','#5C9BDB','#DCE8F5'],'135mm · f/2.8 · 1/800s · ISO 200'],
 ['Front Elevation','prop',400,['#5C9BDB','#DCE8F5','#1F4E79'],'24mm · f/10 · 1/200s · ISO 100'],
 ['Endless Tide','eternal',400,['#1F4E79','#8FC1E8','#DCE8F5'],'24mm · f/13 · 45s · ISO 100']
];
function art(k,h,c){
 const[a,b,d]=c,y=h*.62;
 let s=`<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="${h}" fill="url(#g)"/>`;
 if(k=='calm')s+=`<circle cx="270" cy="${y-40}" r="38" fill="#F4F7FB" opacity=".85"/><rect y="${y}" width="400" height="${h-y}" fill="${d}" opacity=".8"/><path d="M0 ${y+14}h400M40 ${y+34}h320M90 ${y+54}h220" stroke="#F4F7FB" stroke-width="2" opacity=".6"/>`;
 if(k=='fleet')for(let i=0;i<9;i++)s+=`<circle cx="${(i*83+40)%400}" cy="${(i*97+60)%h}" r="${14+i*4}" fill="${i%2?'#5C9BDB':'#DCE8F5'}" opacity=".55"/>`;
 if(k=='eternal')for(let i=0;i<7;i++)s+=`<path d="M-20 ${h*.3+i*26}Q200 ${h*.1+i*40} 420 ${h*.5+i*18}" fill="none" stroke="${i%2?'#DCE8F5':'#5C9BDB'}" stroke-width="2.5" opacity=".75"/>`;
 if(k=='prop'){
  s+=`<rect x="80" y="${h*.26}" width="240" height="${h*.74}" fill="${d}"/><rect y="${h*.9}" width="400" height="${h*.1}" fill="#A9C1DB"/>`;
  for(let r=0;r<3;r++)for(let q=0;q<3;q++)s+=`<rect x="${106+q*70}" y="${h*.3+r*h*.17}" width="42" height="${h*.11}" fill="#F4F7FB" opacity=".85"/>`;
  s+=`<rect x="178" y="${h*.76}" width="44" height="${h*.14}" fill="#0B1F3A" opacity=".7"/>`;
 }
 return 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${h}">${s}</svg>`);
}
const grid=$('#grid');
P.forEach(([t,k,h,c,e,src])=>{
 const f=document.createElement('figure');f.dataset.k=k;
 f.innerHTML=`<button class="ph" aria-label="View ${t} larger"><img alt="${t}, ${L[k]} photograph" width="400" height="${h}" loading="lazy"></button><figcaption><b>${t}</b><br>${e}</figcaption>`;
 const im=$('img',f),fb=art(k,h,c);
 im.onerror=()=>{im.onerror=null;im.src=fb};
 im.src=src||fb;
 f.dataset.cap=`${t} (${L[k]}) · ${e}`;
 grid.append(f);
});
$$('.filters .chip').forEach(b=>b.onclick=()=>{
 $$('.filters .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));
 $$('#grid figure').forEach(f=>f.hidden=b.dataset.f!=='all'&&f.dataset.k!==b.dataset.f);
});

/* ---------- Motion blur showcase ---------- */
const mbTrack=$('#mbTrack'),mbf=$('#mbf'),sh=$('#shutter'),fz=$('#freeze');
const stops=['1/1000s','1/250s','1/60s','1/15s','1/4s','1s','4s'],bl=[0,2,6,14,24,38,56];
for(let n=0;n<2;n++)P.slice(0,8).forEach(([t,k,,c,,src])=>{
 const f=document.createElement('figure'),fb=art(k,300,c);
 if(n)f.setAttribute('aria-hidden','true'); /* second copy only makes the loop seamless */
 f.innerHTML=`<img alt="${n?'':t+', '+L[k]+' photograph'}" width="400" height="300" loading="lazy"><figcaption>${t}</figcaption>`;
 const im=$('img',f);
 im.onerror=()=>{im.onerror=null;im.src=fb};
 im.src=src||fb;
 mbTrack.append(f);
});
const frozen=()=>fz.getAttribute('aria-pressed')==='true';
function mbUpdate(){
 const i=+sh.value,b=frozen()?0:bl[i];
 mbf.setAttribute('stdDeviation',b+' 0'); /* horizontal-only blur reads as motion */
 $('.mb-view').style.filter=b?'url(#mb)':'none';
 $('#shutOut').textContent=stops[i];
 sh.setAttribute('aria-valuetext','Shutter speed '+stops[i]);
 mbTrack.style.setProperty('--dur',(44-i*5)+'s');
 mbTrack.classList.toggle('paused',frozen());
}
sh.oninput=mbUpdate;
fz.onclick=()=>{fz.setAttribute('aria-pressed',!frozen());fz.textContent=frozen()?'Release frame':'Freeze frame';mbUpdate()};
mbUpdate();

/* ---------- Lightbox ---------- */
const lb=$('#lb');
grid.onclick=e=>{
 const f=e.target.closest('figure');if(!f)return;
 const im=$('img',f);
 $('#lbimg').src=im.src;$('#lbimg').alt=im.alt;$('#lbcap').textContent=f.dataset.cap;
 lb.showModal();
};
lb.onclick=e=>{if(e.target===lb)lb.close()};
$('#lbClose').onclick=()=>lb.close();
$('#wmBtn').onclick=e=>{
 const off=$('.lbimg').classList.toggle('nowm');
 e.currentTarget.setAttribute('aria-pressed',!off);
 e.currentTarget.textContent='Watermark: '+(off?'Off':'On');
};

/* ---------- Services -> booking form ---------- */
$$('[data-svc]').forEach(b=>b.onclick=()=>{
 $('#service').value=b.dataset.svc;
 $('#contact').scrollIntoView();
 $('#name').focus({preventScroll:true});
 toast('Service selected: '+b.dataset.svc);
});

/* ---------- Color swatches ---------- */
$$('.sw').forEach(b=>b.onclick=async()=>{
 const v=b.dataset.hex;
 try{await navigator.clipboard.writeText(v)}catch{
  const t=document.createElement('textarea');t.value=v;document.body.append(t);t.select();
  try{document.execCommand('copy')}catch{}t.remove();
 }
 toast('Copied '+v);
});

/* ---------- Profile photo fallback ---------- */
const pr=$('#profile');
pr.onerror=()=>{pr.onerror=null;pr.src='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 600"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FC1E8"/><stop offset="1" stop-color="#5C9BDB"/></linearGradient></defs><rect width="480" height="600" fill="url(#g)"/><text x="240" y="360" text-anchor="middle" font-size="260" fill="#1F4E79" font-family="Pinyon Script,cursive">c</text></svg>')};

/* ---------- Booking form ---------- */
$('#date').min=new Date().toISOString().slice(0,10);
$('#form').onsubmit=e=>{
 e.preventDefault();
 const f=e.target;
 $$('input,select',f).forEach(x=>x.classList.toggle('err',!x.checkValidity()));
 if(!f.checkValidity()){f.reportValidity();return}
 /* Front-end only: to receive inquiries, send the form data to your email or form service here (e.g. fetch to Formspree). */
 const d=new Date($('#date').value+'T00:00').toLocaleDateString(undefined,{dateStyle:'long'});
 const ok=$('#ok');
 ok.textContent=`Thank you, ${$('#name').value}. Your inquiry for ${$('#service').value} on ${d} has been sent. A reply will go to ${$('#email').value}.`;
 ok.hidden=false;ok.scrollIntoView({block:'nearest'});
 f.reset();
};
$('#yr').textContent=new Date().getFullYear();
