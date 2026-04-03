(function(){
'use strict';
var W='';
var IP='unknown';
var threats=[];
var alerted=false;
var blocked=JSON.parse(localStorage.getItem('ia_blocked')||'[]');

function fetchIP(){
try{
fetch('https://ipinfo.io/json').then(function(r){return r.json()}).then(function(d){
IP=d.ip||'unknown';
logVisitor(d);
checkBlocked();
}).catch(function(){})
}catch(e){}
}

function logVisitor(d){
var entry={ts:new Date().toISOString(),ip:d.ip||'',city:d.city||'',region:d.region||'',country:d.country||'',org:d.org||'',page:location.pathname,ua:navigator.userAgent,ref:document.referrer};
var logs=JSON.parse(sessionStorage.getItem('ia_log')||'[]');
logs.push(entry);
if(logs.length>200)logs=logs.slice(-100);
sessionStorage.setItem('ia_log',JSON.stringify(logs));
}

function checkBlocked(){
if(blocked.indexOf(IP)!==-1){
lockout('Your IP has been permanently blocked.');
}
}

function threat(type,detail){
threats.push({type:type,detail:detail,ts:Date.now(),ip:IP});
sessionStorage.setItem('ia_threats',JSON.stringify(threats));
if(W){
try{fetch(W,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:'**☠ THREAT**\nType: '+type+'\nIP: '+IP+'\nDetail: '+detail+'\nPage: '+location.href+'\nUA: '+navigator.userAgent.substring(0,120)+'\nTime: '+new Date().toISOString()})}).catch(function(){})}catch(e){}
}
showAlert();
if(threats.length>=8)lockout('Multiple intrusion attempts detected.');
}

function showAlert(){
if(alerted)return;
alerted=true;
var el=document.getElementById('securityAlert');
if(el)el.classList.remove('sec-hidden');
setTimeout(function(){alerted=false},12000);
}

function lockout(msg){
document.documentElement.innerHTML='<!DOCTYPE html><html><head><title>BLOCKED</title><style>*{margin:0;padding:0}body{background:#050505;color:#DC143C;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center}.w{max-width:500px;padding:2rem}.s{font-size:6rem;margin-bottom:1rem;animation:p 1.5s ease infinite}@keyframes p{0%,100%{opacity:1}50%{opacity:.3}}h1{font-size:2rem;margin-bottom:1rem}p{color:#555;font-size:.8rem;margin-bottom:.5rem;letter-spacing:2px}.ip{color:#333;font-size:.65rem;margin-top:2rem}</style></head><body><div class="w"><div class="s">☠</div><h1>ACCESS DENIED</h1><p>'+msg+'</p><p>All activity has been logged and reported.</p><p class="ip">IP: '+IP+'</p></div></body></html>';
}

document.addEventListener('contextmenu',function(e){e.preventDefault();threat('CONTEXT_MENU','Right click blocked')});

document.addEventListener('keydown',function(e){
if(e.key==='F12'){e.preventDefault();threat('DEVTOOLS','F12');return false}
if(e.ctrlKey&&e.shiftKey&&/[IJC]/.test(e.key)){e.preventDefault();threat('DEVTOOLS','Ctrl+Shift+'+e.key);return false}
if(e.ctrlKey&&(e.key==='u'||e.key==='s'||e.key==='p')){e.preventDefault();threat('SOURCE','Ctrl+'+e.key);return false}
});

document.addEventListener('dragstart',function(e){e.preventDefault()});

var dtOpen=false;
setInterval(function(){
var w=window.outerWidth-window.innerWidth>160;
var h=window.outerHeight-window.innerHeight>160;
if((w||h)&&!dtOpen){dtOpen=true;threat('DEVTOOLS_OPEN','DevTools window detected')}
if(!w&&!h)dtOpen=false;
},2500);

if(window.self!==window.top){threat('IFRAME','Embedded in iframe');try{window.top.location=window.self.location}catch(e){}}
if(navigator.webdriver){threat('BOT','WebDriver detected');lockout('Automated access is prohibited.')}

var clicks=0,clickT=null;
document.addEventListener('click',function(){
clicks++;
if(clicks>25){threat('FLOOD','Rapid clicking');document.body.style.pointerEvents='none';setTimeout(function(){document.body.style.pointerEvents='auto';clicks=0},5000)}
if(clickT)clearTimeout(clickT);
clickT=setTimeout(function(){clicks=0},8000);
});

var obs=new MutationObserver(function(muts){
muts.forEach(function(m){m.addedNodes.forEach(function(n){
if(n.nodeType===1){
var t=n.tagName;
if(t==='IFRAME'||t==='OBJECT'||t==='EMBED'){n.remove();threat('INJECT',t+' injection')}
if(t==='SCRIPT'){
var src=n.src||'';
if(!src.match(/gstatic\.com|firebasejs|googleapis/)){n.remove();threat('SCRIPT_INJECT','Unauthorized script: '+src.substring(0,80))}
}
if(t==='FORM'){
var allowed=n.closest('.forum-compose')||n.closest('.admin-panel');
if(!allowed){n.remove();threat('FORM_INJECT','Unauthorized form')}
}
}
})});
});
if(document.body)obs.observe(document.body,{childList:true,subtree:true});

var origOpen=XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open=function(method,url){
if(typeof url==='string'){
var safe=/(ipinfo|firebase|gstatic|googleapis|firebaseio|localhost|127\.0)/.test(url)||url.indexOf('/')=== 0;
if(!safe)threat('XHR','Suspicious request: '+url.substring(0,100));
}
return origOpen.apply(this,arguments);
};

var closeBtn=document.getElementById('secClose');
if(closeBtn)closeBtn.onclick=function(){var el=document.getElementById('securityAlert');if(el)el.classList.add('sec-hidden');alerted=false};

fetchIP();

window.IRON_SHIELD={
getIP:function(){return IP},
getThreats:function(){return threats},
getLogs:function(){return JSON.parse(sessionStorage.getItem('ia_log')||'[]')},
report:threat,
blockIP:function(ip){if(blocked.indexOf(ip)===-1){blocked.push(ip);localStorage.setItem('ia_blocked',JSON.stringify(blocked))}},
unblockIP:function(ip){blocked=blocked.filter(function(b){return b!==ip});localStorage.setItem('ia_blocked',JSON.stringify(blocked))},
getBlocked:function(){return blocked},
lockout:lockout
};
})();
