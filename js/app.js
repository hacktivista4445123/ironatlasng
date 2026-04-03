(function(){
'use strict';

window.addEventListener('load',function(){setTimeout(function(){var l=document.getElementById('loader');if(l)l.classList.add('done')},2200)});

var canvas=document.getElementById('matrixCanvas');
if(canvas){
var ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();
window.addEventListener('resize',resize);
var chars='アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF☠⚡◇⬡'.split('');
var fontSize=14;
var columns=Math.floor(canvas.width/fontSize);
var drops=[];
for(var i=0;i<columns;i++)drops[i]=Math.random()*canvas.height/fontSize;
(function draw(){
ctx.fillStyle='rgba(5,5,5,0.05)';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.font=fontSize+'px monospace';
for(var i=0;i<drops.length;i++){
ctx.fillStyle=Math.random()>.75?'rgba(220,20,60,.75)':'rgba(139,0,0,.45)';
ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*fontSize,drops[i]*fontSize);
if(drops[i]*fontSize>canvas.height&&Math.random()>.976)drops[i]=0;
drops[i]++;
}
requestAnimationFrame(draw);
})();
}

var nav=document.getElementById('mainNav');
var toggle=document.getElementById('navToggle');
var menu=document.getElementById('navMenu');

window.addEventListener('scroll',function(){
if(nav)nav.classList.toggle('scrolled',scrollY>40);
document.querySelectorAll('.page-section[id]').forEach(function(s){
var top=s.offsetTop-130;
var bottom=top+s.offsetHeight;
var link=document.querySelector('.nav-item[data-sec="'+s.id+'"]');
if(link)link.classList.toggle('active',scrollY>=top&&scrollY<bottom);
});
});

if(toggle)toggle.addEventListener('click',function(){menu.classList.toggle('open')});
document.querySelectorAll('.nav-item').forEach(function(l){l.addEventListener('click',function(){if(menu)menu.classList.remove('open')})});

var typedEl=document.getElementById('typedOutput');
if(typedEl){
var phrases=['We are the voice of the voiceless...','Exposing MinSalud Colombia corruption...','42.7 GB of evidence extracted...','No system is safe from the truth...','The corrupt will fall. One by one.','We do not forgive. We do not forget.','Hacktivism is justice.'];
var pi=0,ci=0,del=false;
(function loop(){
var cur=phrases[pi];
if(del){typedEl.textContent=cur.substring(0,ci-1);ci--}
else{typedEl.textContent=cur.substring(0,ci+1);ci++}
var sp=del?25:65;
if(!del&&ci===cur.length){sp=2500;del=true}
else if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;sp=400}
setTimeout(loop,sp);
})();
}

var counters=document.querySelectorAll('.counter-value');
var counted=false;
function animateCounters(){
if(counted)return;counted=true;
counters.forEach(function(c){
var target=parseInt(c.getAttribute('data-target'));
var cur=0;var inc=Math.max(1,Math.ceil(target/70));
var t=setInterval(function(){cur+=inc;if(cur>=target){cur=target;clearInterval(t)}c.textContent=cur.toLocaleString()},35);
});
}
var statsEl=document.querySelector('.hero-counters');
if(statsEl){
var ob=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting)animateCounters()})},{threshold:.5});
ob.observe(statsEl);
}

var animEls=document.querySelectorAll('.mcard,.ally-card,.manifesto-main,.exposed-card,.section-head,.exposed-intro,.exposed-total,.cta-container,.mirror-card');
var aOb=new IntersectionObserver(function(entries){
entries.forEach(function(e){if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}});
},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
animEls.forEach(function(el){el.style.opacity='0';el.style.transform='translateY(35px)';el.style.transition='opacity .7s ease,transform .7s ease';aOb.observe(el)});

var heroTerm=document.getElementById('heroTerm');
if(heroTerm){
var lines=[
{t:'> Encryption: AES-256-GCM <span class="t-green">ACTIVE</span>',d:4500},
{t:'> Evidence uploaded to 4 mirrors... <span class="t-cyan">DONE</span>',d:6500},
{t:'> <span class="t-red">☠ MINISTERIO DE SALUD: YOUR SECRETS ARE OURS ☠</span>',d:9000}
];
lines.forEach(function(line){setTimeout(function(){
var p=document.createElement('p');p.innerHTML=line.t;p.style.opacity='0';
var cur=heroTerm.querySelector('.term-cursor');
heroTerm.insertBefore(p,cur);
setTimeout(function(){p.style.transition='opacity .4s';p.style.opacity='1'},50);
},line.d)});
}

var sysInfo=document.getElementById('sysInfo');
if(sysInfo){setInterval(function(){sysInfo.textContent='SYS:ACTIVE | PID:'+Math.floor(Math.random()*9999)+' | NODE:'+Math.floor(Math.random()*999)},3500)}

document.querySelectorAll('a[href^="#"]').forEach(function(a){
a.addEventListener('click',function(e){
var href=this.getAttribute('href');
if(href.length>1){e.preventDefault();var t=document.querySelector(href);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}
});
});

var logo=document.getElementById('mainLogo');
if(logo){
logo.addEventListener('mouseenter',function(){this.style.filter='hue-rotate(80deg) saturate(2.5) contrast(1.4)';var s=this;setTimeout(function(){s.style.filter='saturate(1.15) contrast(1.08)'},250)});
}
})();
