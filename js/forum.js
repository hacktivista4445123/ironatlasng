(function(){
'use strict';

var FIREBASE_CONFIG={
apiKey:"YOUR_API_KEY",
authDomain:"YOUR_PROJECT.firebaseapp.com",
databaseURL:"https://YOUR_PROJECT-default-rtdb.firebaseio.com",
projectId:"YOUR_PROJECT",
storageBucket:"YOUR_PROJECT.appspot.com",
messagingSenderId:"000000000000",
appId:"YOUR_APP_ID"
};

var ADMIN_HASH='a]1s*9{dW+3|kYv>Qe/J';
var isAdmin=false;
var useFB=false;
var db=null;
var msgRef=null;

(function computeAdminHash(){
var raw="O\\NA41:K'rEh7;~'n`Q$jC<JKk-:Ip4_$=`z0?1Oo-c|>IuAQL";
crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw)).then(function(buf){
ADMIN_HASH=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0')}).join('');
});
})();

try{
if(FIREBASE_CONFIG.apiKey!=='YOUR_API_KEY'){
firebase.initializeApp(FIREBASE_CONFIG);
db=firebase.database();
msgRef=db.ref('forum/messages');
useFB=true;
}else{throw new Error('no config')}
}catch(e){useFB=false}

var canvas=document.getElementById('matrixCanvas');
if(canvas){
var ctx=canvas.getContext('2d');
canvas.width=innerWidth;canvas.height=innerHeight;
window.addEventListener('resize',function(){canvas.width=innerWidth;canvas.height=innerHeight});
canvas.style.opacity='.04';
var ch='01☠⚡'.split(''),fs=14,co=Math.floor(canvas.width/fs),dr=[];
for(var i=0;i<co;i++)dr[i]=Math.random()*canvas.height/fs;
(function d(){ctx.fillStyle='rgba(5,5,5,.05)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.font=fs+'px monospace';ctx.fillStyle='rgba(139,0,0,.45)';for(var i=0;i<dr.length;i++){ctx.fillText(ch[Math.floor(Math.random()*ch.length)],i*fs,dr[i]*fs);if(dr[i]*fs>canvas.height&&Math.random()>.975)dr[i]=0;dr[i]++}requestAnimationFrame(d)})();
}

var toggle=document.getElementById('navToggle'),menu=document.getElementById('navMenu');
if(toggle)toggle.onclick=function(){menu.classList.toggle('open')};

var list=document.getElementById('forumList');
var aliasIn=document.getElementById('forumAlias');
var msgIn=document.getElementById('forumMessage');
var subBtn=document.getElementById('forumSubmit');
var countEl=document.getElementById('msgCount');
var onlineEl=document.getElementById('onlineCount');
var adminBtn=document.getElementById('adminBtn');
var adminOvl=document.getElementById('adminOverlay');
var adminPwd=document.getElementById('adminPassword');
var adminLog=document.getElementById('adminLoginBtn');
var adminCan=document.getElementById('adminCancelBtn');
var adminTools=document.getElementById('adminTools');
var banInput=document.getElementById('banIpInput');
var banBtn=document.getElementById('banIpBtn');
var clearBtn=document.getElementById('clearAllBtn');
var exportBtn=document.getElementById('exportBtn');
var blockedListEl=document.getElementById('blockedList');

function esc(s){
if(!s)return'';
return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/\//g,'&#x2F;').replace(/\\/g,'&#92;');
}

function validate(alias,msg){
if(!alias||!msg)return{ok:false,reason:'Campos vacios'};
alias=alias.trim();msg=msg.trim();
if(alias.length<2||alias.length>30)return{ok:false,reason:'Alias: 2-30 caracteres'};
if(msg.length<2||msg.length>1000)return{ok:false,reason:'Mensaje: 2-1000 caracteres'};
var patterns=[
/https?:\/\//i,/www\./i,/ftp:\/\//i,
/\.(com|net|org|io|xyz|tk|ml|ga|cf|gq|top|info|biz|co|me)\b/i,
/<[^>]*>/,/<script/i,/javascript:/i,/vbscript:/i,/on\w+\s*=/i,
/eval\s*\(/i,/alert\s*\(/i,/prompt\s*\(/i,/confirm\s*\(/i,/document\./i,/window\./i,
/union\s+(all\s+)?select/i,/drop\s+table/i,/insert\s+into/i,/delete\s+from/i,/update\s+\w+\s+set/i,/;\s*--/,
/\.\.\//,/\/etc\/passwd/i,/\/proc\//i,/\/var\/log/i,
/%3c/i,/%3e/i,/%22/i,/%27/i,/%00/i,
/\x00/,/\r\n/,/\n.*\n.*\n.*\n.*\n/,
/\{.*\{.*\{/,/base64/i,/data:/i
];
for(var i=0;i<patterns.length;i++){
if(patterns[i].test(msg))return{ok:false,reason:'Contenido prohibido detectado'};
if(patterns[i].test(alias))return{ok:false,reason:'Alias contiene contenido prohibido'};
}
try{
var decoded=decodeURIComponent(msg);
if(/<script/i.test(decoded)||/on\w+=/i.test(decoded))return{ok:false,reason:'Encoded XSS detectado'};
}catch(e){}
if(alias===msg)return{ok:false,reason:'Alias y mensaje identicos'};
var repeated=msg.match(/(.)\1{15,}/);
if(repeated)return{ok:false,reason:'Spam detectado'};
return{ok:true};
}

function fmtTime(ts){
var d=new Date(ts);
var pad=function(n){return n<10?'0'+n:n};
return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes());
}

function renderMsg(id,data){
var li=document.createElement('li');
li.className='forum-msg';
li.setAttribute('data-id',id);
var html='<div class="msg-head"><span class="msg-alias">☠ '+esc(data.alias)+'</span><span class="msg-time">'+fmtTime(data.timestamp)+'</span></div>';
html+='<div class="msg-body">'+esc(data.message)+'</div>';
html+='<div class="msg-ip">IP: '+(data.ip||'hidden')+'</div>';
html+='<button class="msg-del" data-id="'+esc(id)+'">✕ DEL</button>';
li.innerHTML=html;
li.querySelector('.msg-del').addEventListener('click',function(){
if(!isAdmin)return;
if(confirm('Eliminar este mensaje?'))deleteMsg(id);
});
return li;
}

function loadMessages(){
if(useFB){
msgRef.orderByChild('timestamp').on('value',function(snap){
list.innerHTML='';
var msgs=[];
snap.forEach(function(c){msgs.push({id:c.key,data:c.val()})});
msgs.reverse();
if(countEl)countEl.textContent=msgs.length;
if(msgs.length===0){list.innerHTML='<li class="forum-empty">> Sin mensajes. Se el primero en hablar. ☠</li>';return}
msgs.forEach(function(m){list.appendChild(renderMsg(m.id,m.data))});
});
}else{
var msgs=JSON.parse(localStorage.getItem('ia_forum')||'[]');
list.innerHTML='';
if(countEl)countEl.textContent=msgs.length;
if(msgs.length===0){list.innerHTML='<li class="forum-empty">> Sin mensajes. Se el primero en hablar. ☠</li>';return}
msgs.slice().reverse().forEach(function(m){list.appendChild(renderMsg(m.id,m))});
}
}

var lastPostTime=0;

function postMessage(){
var now=Date.now();
if(now-lastPostTime<10000){alert('Espera 10 segundos entre mensajes.');return}

var alias=aliasIn.value;
var msg=msgIn.value;
var v=validate(alias,msg);
if(!v.ok){
alert(v.reason);
if(window.IRON_SHIELD)window.IRON_SHIELD.report('FORUM_ATTACK',v.reason+': '+msg.substring(0,80));
return;
}

var ip='hidden';
if(window.IRON_SHIELD)ip=window.IRON_SHIELD.getIP();

var data={alias:alias.trim(),message:msg.trim(),timestamp:Date.now(),ip:ip};

if(useFB){
msgRef.push(data);
}else{
var msgs=JSON.parse(localStorage.getItem('ia_forum')||'[]');
data.id='m_'+Date.now()+'_'+Math.random().toString(36).substr(2,6);
msgs.push(data);
localStorage.setItem('ia_forum',JSON.stringify(msgs));
loadMessages();
}

msgIn.value='';
lastPostTime=now;
}

function deleteMsg(id){
if(!isAdmin)return;
if(useFB){msgRef.child(id).remove()}
else{
var msgs=JSON.parse(localStorage.getItem('ia_forum')||'[]');
msgs=msgs.filter(function(m){return m.id!==id});
localStorage.setItem('ia_forum',JSON.stringify(msgs));
loadMessages();
}
}

function clearAll(){
if(!isAdmin||!confirm('Eliminar TODOS los mensajes?'))return;
if(useFB){msgRef.remove()}
else{localStorage.removeItem('ia_forum');loadMessages()}
}

function updateBlockedUI(){
if(!blockedListEl)return;
var blocked=window.IRON_SHIELD?window.IRON_SHIELD.getBlocked():[];
blockedListEl.innerHTML='';
if(blocked.length===0){blockedListEl.innerHTML='<li style="color:var(--dark)">Ninguna IP bloqueada</li>';return}
blocked.forEach(function(ip){
var li=document.createElement('li');
li.innerHTML=esc(ip)+' <button class="unban-btn" data-ip="'+esc(ip)+'">UNBAN</button>';
li.querySelector('.unban-btn').addEventListener('click',function(){
if(window.IRON_SHIELD)window.IRON_SHIELD.unblockIP(this.getAttribute('data-ip'));
updateBlockedUI();
});
blockedListEl.appendChild(li);
});
}

function exportLogs(){
if(!window.IRON_SHIELD)return;
var logs=window.IRON_SHIELD.getLogs();
var threats=window.IRON_SHIELD.getThreats();
var data={logs:logs,threats:threats,exported:new Date().toISOString()};
var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
var url=URL.createObjectURL(blob);
var a=document.createElement('a');
a.href=url;a.download='ironatlas_security_logs.json';a.click();
URL.revokeObjectURL(url);
}

if(adminBtn){
adminBtn.addEventListener('click',function(){
if(isAdmin){
isAdmin=false;
document.body.classList.remove('admin-active');
adminBtn.classList.remove('active');
adminTools.style.display='none';
}else{
adminOvl.classList.add('visible');
adminPwd.value='';
adminPwd.focus();
}
});
}

if(adminLog){
adminLog.addEventListener('click',function(){
var input=adminPwd.value;
crypto.subtle.digest('SHA-256',new TextEncoder().encode(input)).then(function(buf){
var hash=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0')}).join('');
if(hash===ADMIN_HASH){
isAdmin=true;
document.body.classList.add('admin-active');
adminBtn.classList.add('active');
adminOvl.classList.remove('visible');
adminTools.style.display='block';
updateBlockedUI();
if(onlineEl)onlineEl.textContent=Math.floor(Math.random()*15)+1;
}else{
alert('☠ ACCESS DENIED ☠');
adminPwd.value='';
if(window.IRON_SHIELD)window.IRON_SHIELD.report('ADMIN_BRUTE','Failed admin login');
}
});
});
}

if(adminPwd)adminPwd.addEventListener('keydown',function(e){if(e.key==='Enter')adminLog.click()});
if(adminCan)adminCan.addEventListener('click',function(){adminOvl.classList.remove('visible')});

if(banBtn){
banBtn.addEventListener('click',function(){
var ip=banInput.value.trim();
if(!ip||!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)){alert('IP invalida');return}
if(window.IRON_SHIELD)window.IRON_SHIELD.blockIP(ip);
banInput.value='';
updateBlockedUI();
alert('IP '+ip+' bloqueada');
});
}

if(clearBtn)clearBtn.addEventListener('click',clearAll);
if(exportBtn)exportBtn.addEventListener('click',exportLogs);

if(subBtn)subBtn.addEventListener('click',postMessage);
if(msgIn){
msgIn.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.ctrlKey)postMessage()});
msgIn.addEventListener('paste',function(e){
var paste=(e.clipboardData||window.clipboardData).getData('text');
if(/<script/i.test(paste)||/javascript:/i.test(paste)||/on\w+=/i.test(paste)){
e.preventDefault();
if(window.IRON_SHIELD)window.IRON_SHIELD.report('PASTE_ATTACK','Malicious paste blocked');
alert('Contenido malicioso bloqueado');
}
});
msgIn.addEventListener('input',function(){
var v=this.value;
var cleaned=v.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'').replace(/on\w+\s*=\s*["'][^"']*["']/gi,'').replace(/javascript:/gi,'').replace(/vbscript:/gi,'');
if(cleaned!==v){
this.value=cleaned;
if(window.IRON_SHIELD)window.IRON_SHIELD.report('LIVE_INJECT','Real-time injection attempt');
}
});
}

if(aliasIn){
aliasIn.addEventListener('input',function(){
this.value=this.value.replace(/[<>"'&;{}()\[\]\\\/`]/g,'');
});
}

if(onlineEl)onlineEl.textContent=Math.floor(Math.random()*30)+5;

loadMessages();
})();
