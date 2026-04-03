(function(){
'use strict';

var firebaseConfig={
apiKey:"YOUR_API_KEY",
authDomain:"YOUR_PROJECT.firebaseapp.com",
databaseURL:"https://YOUR_PROJECT-default-rtdb.firebaseio.com",
projectId:"YOUR_PROJECT",
storageBucket:"YOUR_PROJECT.appspot.com",
messagingSenderId:"000000000000",
appId:"YOUR_APP_ID"
};

var ADMIN_HASH='5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
var isAdmin=false;
var db=null;
var msgRef=null;
var useFB=false;

try{
if(firebaseConfig.apiKey!=="YOUR_API_KEY"){
firebase.initializeApp(firebaseConfig);
db=firebase.database();
msgRef=db.ref('forum/messages');
useFB=true;
}else{throw new Error('no config')}
}catch(e){useFB=false}

var fList=document.getElementById('fList');
var fAlias=document.getElementById('fAlias');
var fMsg=document.getElementById('fMsg');
var fSub=document.getElementById('fSub');
var fTotal=document.getElementById('fTotal');
var adtg=document.getElementById('adtg');
var adm=document.getElementById('adm');
var adp=document.getElementById('adp');
var adl=document.getElementById('adl');
var adc=document.getElementById('adc');

async function sha256(t){
var enc=new TextEncoder();
var d=enc.encode(t);
var h=await crypto.subtle.digest('SHA-256',d);
return Array.from(new Uint8Array(h)).map(function(b){return b.toString(16).padStart(2,'0')}).join('');
}

function esc(s){
if(!s)return'';
return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
.replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/\//g,'&#x2F;');
}

function validate(a,m){
if(!a||!m||!a.trim()||!m.trim())return{ok:false,msg:'Campos vacios'};
a=a.trim();m=m.trim();
if(a.length<2||a.length>30)return{ok:false,msg:'Alias: 2-30 chars'};
if(m.length<2||m.length>1000)return{ok:false,msg:'Mensaje: 2-1000 chars'};
if(/https?:\/\//i.test(m)||/www\./i.test(m))return{ok:false,msg:'Links no permitidos'};
if(/\.(com|net|org|io|xyz|tk|ml|ga|cf|gq|top|info|biz)\b/i.test(m))return{ok:false,msg:'Dominios no permitidos'};
if(/<[^>]*>/i.test(m))return{ok:false,msg:'HTML no permitido'};
if(/<script/i.test(m)||/javascript:/i.test(m))return{ok:false,msg:'Scripts no permitidos'};
if(/on\w+\s*=/i.test(m))return{ok:false,msg:'Event handlers no permitidos'};
if(/eval\s*\(|alert\s*\(|prompt\s*\(|confirm\s*\(/i.test(m))return{ok:false,msg:'Funciones JS no permitidas'};
if(/\{[\s\S]*\}/g.test(m)&&m.match(/\{/g).length>3)return{ok:false,msg:'Contenido sospechoso'};
if(/union\s+select|drop\s+table|insert\s+into|delete\s+from|update\s+\w+\s+set/i.test(m))return{ok:false,msg:'SQL injection detectado'};
if(/\.\.\//g.test(m)||/\/etc\/passwd/i.test(m))return{ok:false,msg:'Path traversal detectado'};
if(/%[0-9a-f]{2}/gi.test(m)){
var decoded=decodeURIComponent(m);
if(/<script/i.test(decoded))return{ok:false,msg:'Encoded XSS detectado'};
}
if(a===m)return{ok:false,msg:'Alias y mensaje no pueden ser iguales'};
return{ok:true};
}

function fmtTime(ts){
var d=new Date(ts);
var pad=function(n){return n<10?'0'+n:n};
return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes());
}

function renderMsg(id,data){
var li=document.createElement('li');
li.className='fmsg';
li.setAttribute('data-id',id);
li.innerHTML=
'<div class="fmh">'+
'<span class="fma">☠ '+esc(data.alias)+'</span>'+
'<span class="fmt">'+fmtTime(data.timestamp)+'</span>'+
'</div>'+
'<div class="fmb">'+esc(data.message)+'</div>'+
'<button class="fmd" data-id="'+esc(id)+'">✕ DEL</button>';
li.querySelector('.fmd').addEventListener('click',function(){
if(!isAdmin)return;
if(confirm('Eliminar mensaje?'))deleteMsg(id);
});
return li;
}

function load(){
if(useFB){
msgRef.orderByChild('timestamp').on('value',function(snap){
fList.innerHTML='';
var msgs=[];
snap.forEach(function(c){msgs.push({id:c.key,data:c.val()})});
msgs.reverse();
if(fTotal)fTotal.textContent=msgs.length;
if(msgs.length===0){
fList.innerHTML='<li class="fno">> Sin mensajes. Se el primero. ☠</li>';
return;
}
msgs.forEach(function(m){fList.appendChild(renderMsg(m.id,m.data))});
});
}else{
var msgs=JSON.parse(localStorage.getItem('ia_forum')||'[]');
fList.innerHTML='';
if(fTotal)fTotal.textContent=msgs.length;
if(msgs.length===0){
fList.innerHTML='<li class="fno">> Sin mensajes. Se el primero. ☠</li>';
return;
}
msgs.slice().reverse().forEach(function(m){fList.appendChild(renderMsg(m.id,m))});
}
}

var lastPost=0;

function post(){
var now=Date.now();
if(now-lastPost<10000){
alert('Espera 10 segundos entre mensajes');
return;
}
var a=fAlias.value;
var m=fMsg.value;
var v=validate(a,m);
if(!v.ok){
alert(v.msg);
if(window.IRON_SHIELD)window.IRON_SHIELD.report('FORUM_INJECTION',v.msg+': '+m.substring(0,100));
return;
}
var data={alias:a.trim(),message:m.trim(),timestamp:Date.now()};
if(useFB){
msgRef.push(data);
}else{
var msgs=JSON.parse(localStorage.getItem('ia_forum')||'[]');
data.id='m_'+Date.now()+'_'+Math.random().toString(36).substr(2,5);
msgs.push(data);
localStorage.setItem('ia_forum',JSON.stringify(msgs));
load();
}
fMsg.value='';
lastPost=now;
}

function deleteMsg(id){
if(!isAdmin)return;
if(useFB){
msgRef.child(id).remove();
}else{
var msgs=JSON.parse(localStorage.getItem('ia_forum')||'[]');
msgs=msgs.filter(function(m){return m.id!==id});
localStorage.setItem('ia_forum',JSON.stringify(msgs));
load();
}
}

function clearAll(){
if(!isAdmin)return;
if(!confirm('Eliminar TODOS los mensajes?'))return;
if(useFB){
msgRef.remove();
}else{
localStorage.removeItem('ia_forum');
load();
}
}

if(adtg){
adtg.addEventListener('click',function(){
if(isAdmin){
isAdmin=false;
document.body.classList.remove('admin');
adtg.classList.remove('on');
}else{
adm.classList.add('show');
adp.value='';
adp.focus();
}
});
}

if(adl){
adl.addEventListener('click',async function(){
var hash=await sha256(adp.value);
if(hash===ADMIN_HASH){
isAdmin=true;
document.body.classList.add('admin');
adtg.classList.add('on');
adm.classList.remove('show');
}else{
alert('☠ ACCESS DENIED');
adp.value='';
if(window.IRON_SHIELD)window.IRON_SHIELD.report('ADMIN_BRUTEFORCE','Failed admin login attempt');
}
});
}

if(adp){
adp.addEventListener('keydown',function(e){
if(e.key==='Enter')adl.click();
});
}

if(adc){
adc.addEventListener('click',function(){adm.classList.remove('show')});
}

if(fSub)fSub.addEventListener('click',post);
if(fMsg){
fMsg.addEventListener('keydown',function(e){
if(e.key==='Enter'&&e.ctrlKey)post();
});

fMsg.addEventListener('paste',function(e){
var paste=(e.clipboardData||window.clipboardData).getData('text');
if(/<script/i.test(paste)||/javascript:/i.test(paste)){
e.preventDefault();
if(window.IRON_SHIELD)window.IRON_SHIELD.report('PASTE_INJECTION','Malicious paste attempt');
alert('Contenido bloqueado');
}
});

fMsg.addEventListener('input',function(){
var val=this.value;
if(/<script/i.test(val)||/on\w+=/i.test(val)||/javascript:/i.test(val)){
this.value=val.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'')
.replace(/on\w+\s*=\s*["'][^"']*["']/gi,'')
.replace(/javascript:/gi,'');
if(window.IRON_SHIELD)window.IRON_SHIELD.report('REALTIME_INJECTION','Live injection attempt in forum');
}
});
}

if(fAlias){
fAlias.addEventListener('input',function(){
this.value=this.value.replace(/[<>"'&;{}()\[\]\\\/]/g,'');
});
}

load();

})();
