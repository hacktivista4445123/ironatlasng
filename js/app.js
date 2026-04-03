(function(){
'use strict';

window.addEventListener('load',function(){
setTimeout(function(){
var l=document.getElementById('loader');
if(l)l.classList.add('done');
},2500);
});

var mc=document.getElementById('mx');
if(mc){
var mx=mc.getContext('2d');
function rsz(){mc.width=innerWidth;mc.height=innerHeight}
rsz();
window.addEventListener('resize',rsz);
var chars='アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ☠⚡◆◇⬡';
var ca=chars.split('');
var fs=14;
var cols=Math.floor(mc.width/fs);
var drops=[];
for(var i=0;i<cols;i++)drops[i]=Math.random()*mc.height/fs;
function drawMx(){
mx.fillStyle='rgba(10,10,10,0.05)';
mx.fillRect(0,0,mc.width,mc.height);
mx.font=fs+'px monospace';
for(var i=0;i<drops.length;i++){
var ch=ca[Math.floor(Math.random()*ca.length)];
mx.fillStyle=Math.random()>.7?'rgba(220,20,60,0.8)':'rgba(139,0,0,0.5)';
mx.fillText(ch,i*fs,drops[i]*fs);
if(drops[i]*fs>mc.height&&Math.random()>.975)drops[i]=0;
drops[i]++;
}
requestAnimationFrame(drawMx);
}
drawMx();
}

var nav=document.getElementById('nav');
var hm=document.getElementById('hm');
var nl=document.getElementById('nl');

window.addEventListener('scroll',function(){
if(nav)nav.classList.toggle('scrolled',scrollY>50);
document.querySelectorAll('.sc[id]').forEach(function(s){
var t=s.offsetTop-120;
var b=t+s.offsetHeight;
var id=s.id;
var lk=document.querySelector('.nk[href="#'+id+'"]');
if(lk)lk.classList.toggle('active',scrollY>=t&&scrollY<b);
});
});

if(hm)hm.addEventListener('click',function(){nl.classList.toggle('open')});
document.querySelectorAll('.nk').forEach(function(l){
l.addEventListener('click',function(){if(nl)nl.classList.remove('open')});
});

var typed=document.getElementById('typed');
if(typed){
var phrases=[
'We are the voice of the voiceless...',
'Exposing government corruption worldwide...',
'No system is safe from the truth...',
'The corrupt will be exposed...',
'Justice through digital resistance...',
'Hacktivism is not a crime, it is a duty...',
'We do not forgive. We do not forget...'
];
var pi=0,ci=0,del=false;
function typeLoop(){
var cur=phrases[pi];
if(del){typed.textContent=cur.substring(0,ci-1);ci--}
else{typed.textContent=cur.substring(0,ci+1);ci++}
var sp=del?30:70;
if(!del&&ci===cur.length){sp=2500;del=true}
else if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;sp=500}
setTimeout(typeLoop,sp);
}
setTimeout(typeLoop,3000);
}

var counters=document.querySelectorAll('.hsn');
var counted=false;
function animC(){
if(counted)return;
counters.forEach(function(c){
var target=parseInt(c.getAttribute('data-count'));
var cur=0;
var inc=Math.max(1,Math.ceil(target/80));
var tmr=setInterval(function(){
cur+=inc;
if(cur>=target){cur=target;clearInterval(tmr)}
c.textContent=cur.toLocaleString();
},30);
});
counted=true;
}
var statsEl=document.querySelector('.hstats');
if(statsEl){
var sObs=new IntersectionObserver(function(e){
e.forEach(function(en){if(en.isIntersecting)animC()});
},{threshold:.5});
sObs.observe(statsEl);
}

var animEls=document.querySelectorAll('.mcd,.ac,.mc-main,.etr,.sh,.eterminal,.ctaw,.mirc');
var aObs=new IntersectionObserver(function(entries){
entries.forEach(function(e){
if(e.isIntersecting){
e.target.style.opacity='1';
e.target.style.transform='translateY(0)';
}
});
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
animEls.forEach(function(el){
el.style.opacity='0';
el.style.transform='translateY(40px)';
el.style.transition='opacity 0.7s ease,transform 0.7s ease';
aObs.observe(el);
});

var term=document.getElementById('term');
if(term){
var lines=[
{t:'> Decrypting classified files... <span class="tg">DONE</span>',d:4000},
{t:'> Uploading evidence to mirrors... <span class="tcy">78%</span>',d:6000},
{t:'> Target list updated: <span class="tr">5 NEW ENTRIES</span>',d:8000},
{t:'> <span class="tr">☠ THE CORRUPT CANNOT HIDE ☠</span>',d:10000}
];
lines.forEach(function(line){
setTimeout(function(){
var p=document.createElement('p');
p.className='tl';p.innerHTML=line.t;p.style.opacity='0';
var inp=term.querySelector('.ti');
term.insertBefore(p,inp);
setTimeout(function(){p.style.transition='opacity .4s';p.style.opacity='1'},50);
},line.d);
});
}

var fSys=document.getElementById('fsys');
if(fSys){
setInterval(function(){
var pid=Math.floor(Math.random()*9999);
var node=Math.floor(Math.random()*999);
fSys.textContent='SYS:ACTIVE | PID:'+pid+' | NODE:'+node;
},3000);
}

document.querySelectorAll('a[href^="#"]').forEach(function(a){
a.addEventListener('click',function(e){
var href=this.getAttribute('href');
if(href.length>1){
e.preventDefault();
var target=document.querySelector(href);
if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
}
});
});

var hlogo=document.getElementById('hlogo');
if(hlogo){
hlogo.addEventListener('mouseenter',function(){
this.style.filter='hue-rotate(90deg) saturate(2) contrast(1.5)';
var self=this;
setTimeout(function(){self.style.filter='saturate(1.2) contrast(1.1)'},200);
});
}

})();
