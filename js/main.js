// Portfolio interactions: compass ticks, scroll-driven needle, star-chart background
/* Compass ticks */
const ticks=document.getElementById('ticks'),NS='http://www.w3.org/2000/svg';
for(let i=0;i<72;i++){
  const a=i*5*Math.PI/180,long=i%9===0,r1=long?168:176,r2=188;
  const l=document.createElementNS(NS,'line');
  l.setAttribute('x1',200+r1*Math.sin(a));l.setAttribute('y1',200-r1*Math.cos(a));
  l.setAttribute('x2',200+r2*Math.sin(a));l.setAttribute('y2',200-r2*Math.cos(a));
  l.setAttribute('stroke',long?'#d4a853':'rgba(212,168,83,.45)');l.setAttribute('stroke-width',long?1.5:.8);
  ticks.appendChild(l);
}
/* Needle turns as you scroll the page */
const needle=document.getElementById('needle');
const turn=()=>{const p=scrollY/Math.max(1,document.body.scrollHeight-innerHeight);needle.style.transform=`rotate(${-20+p*380}deg)`};
addEventListener('scroll',turn,{passive:true});turn();

/* Star chart background: grid arcs + a few constellations */
const cv=document.getElementById('chart'),c=cv.getContext('2d');
function draw(){
  const d=devicePixelRatio,W=cv.width=innerWidth*d,H=cv.height=innerHeight*d;
  cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';
  c.strokeStyle='rgba(212,168,83,.07)';c.lineWidth=1*d;
  const cx=W*.85,cy=H*1.1;
  for(let r=200*d;r<Math.max(W,H)*1.8;r+=140*d){c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.stroke()}
  for(let k=0;k<12;k++){const a=k*Math.PI/12+Math.PI;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(a)*W*2,cy+Math.sin(a)*W*2);c.stroke()}
  let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  for(let i=0;i<Math.round(innerWidth*innerHeight/5000);i++){
    const x=rnd()*W,y=rnd()*H,r=(rnd()*1.1+.2)*d;
    c.fillStyle=`rgba(243,234,214,${.25+rnd()*.6})`;c.beginPath();c.arc(x,y,r,0,6.28);c.fill();
  }
  const groups=[[[.08,.22],[.14,.18],[.2,.25],[.18,.33],[.26,.36]],[[.62,.62],[.7,.58],[.76,.66],[.72,.74]],[[.4,.85],[.47,.8],[.55,.84]]];
  groups.forEach(g=>{
    c.strokeStyle='rgba(212,168,83,.22)';c.beginPath();
    g.forEach(([x,y],i)=>i?c.lineTo(x*W,y*H):c.moveTo(x*W,y*H));c.stroke();
    g.forEach(([x,y])=>{c.fillStyle='#f0d28e';c.beginPath();c.arc(x*W,y*H,1.8*d,0,6.28);c.fill()});
  });
}
addEventListener('resize',draw);draw();
