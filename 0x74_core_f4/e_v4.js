:root{
  --bg:#05070b;
  --bg2:#0b1018;
  --panel:#0d131d;
  --line:#182334;
  --text:#d6e2ff;
  --muted:#6c86a8;
  --cyan:#00eaff;
  --cyan2:#73f3ff;
  --red:#ff2e63;
  --red2:#b10d3b;
  --violet:#8a5cff;
  --green:#4dffb8;
  --shadow:0 0 30px rgba(0,234,255,.12);
}

*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  font-family:'Rajdhani',sans-serif;
  background:radial-gradient(circle at top,#0b1220 0%,var(--bg) 45%,#020305 100%);
  color:var(--text);
  overflow-x:hidden;
  min-height:100vh;
}
a{text-decoration:none;color:inherit}
img{display:block;max-width:100%}

.ia-body{position:relative}
#bg-grid{
  position:fixed;
  inset:0;
  width:100%;
  height:100%;
  z-index:-3;
}
.ia-noise{
  position:fixed;
  inset:0;
  background:
    repeating-linear-gradient(0deg,rgba(255,255,255,.015) 0 1px,transparent 1px 3px),
    repeating-linear-gradient(90deg,rgba(255,255,255,.01) 0 1px,transparent 1px 4px);
  mix-blend-mode:soft-light;
  opacity:.18;
  pointer-events:none;
  z-index:-2;
}
.ia-vignette{
  position:fixed;
  inset:0;
  background:radial-gradient(circle,transparent 45%,rgba(0,0,0,.65) 100%);
  pointer-events:none;
  z-index:-1;
}

.ia-loader{
  position:fixed;
  inset:0;
  display:grid;
  place-items:center;
  background:#03060a;
  z-index:9999;
  transition:opacity .6s ease,visibility .6s ease;
}
.ia-loader.hide{opacity:0;visibility:hidden}
.ia-loader-core{
  width:18px;
  height:18px;
  background:var(--cyan);
  border-radius:50%;
  box-shadow:0 0 20px var(--cyan),0 0 50px rgba(0,234,255,.5);
  position:absolute;
}
.ia-loader-ring{
  position:absolute;
  border-radius:50%;
  border:2px solid transparent;
}
.ia-loader-ring.r1{width:90px;height:90px;border-top-color:var(--cyan);animation:spin 1.2s linear infinite}
.ia-loader-ring.r2{width:125px;height:125px;border-right-color:var(--violet);animation:spin 1.6s linear infinite reverse}
.ia-loader-ring.r3{width:160px;height:160px;border-bottom-color:var(--red);animation:spin 2s linear infinite}
.ia-loader-text{
  position:absolute;
  margin-top:220px;
  font-family:'Share Tech Mono',monospace;
  letter-spacing:4px;
  color:var(--cyan2);
  font-size:.8rem;
}
@keyframes spin{to{transform:rotate(360deg)}}

.ia-topbar{
  position:sticky;
  top:0;
  z-index:50;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:18px 34px;
  background:rgba(6,10,16,.72);
  backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(115,243,255,.12);
}
.ia-brand{display:flex;align-items:center;gap:14px}
.ia-logo{
  width:48px;
  height:48px;
  object-fit:contain;
  filter:drop-shadow(0 0 10px rgba(0,234,255,.3));
}
.ia-brand-name{
  font-family:'Orbitron',sans-serif;
  font-size:1rem;
  letter-spacing:3px;
  font-weight:800;
}
.ia-brand-sub{
  color:var(--muted);
  font-family:'Share Tech Mono',monospace;
  font-size:.68rem;
  letter-spacing:2px;
}
.ia-nav{display:flex;gap:20px}
.ia-nav a{
  font-family:'Orbitron',sans-serif;
  font-size:.72rem;
  letter-spacing:2px;
  color:#b8cae6;
  padding:8px 12px;
  border:1px solid transparent;
  transition:.25s ease;
}
.ia-nav a:hover{
  color:var(--cyan2);
  border-color:rgba(0,234,255,.24);
  background:rgba(0,234,255,.06);
  box-shadow:var(--shadow);
}
.ia-status{
  display:flex;
  align-items:center;
  gap:8px;
  font-family:'Share Tech Mono',monospace;
  font-size:.72rem;
  color:var(--green);
}
.ia-status .dot{
  width:10px;
  height:10px;
  border-radius:50%;
  background:var(--green);
  box-shadow:0 0 15px var(--green);
}

.ia-main{
  width:min(1320px,92vw);
  margin:0 auto;
  padding:34px 0 80px;
}
.hero{
  display:grid;
  grid-template-columns:1.2fr .8fr;
  gap:42px;
  align-items:center;
  min-height:74vh;
}
.hero-tag{
  display:inline-block;
  padding:8px 14px;
  border:1px solid rgba(0,234,255,.22);
  background:rgba(0,234,255,.05);
  color:var(--cyan2);
  font-family:'Share Tech Mono',monospace;
  letter-spacing:3px;
  font-size:.72rem;
  margin-bottom:18px;
}
.hero-title{
  display:flex;
  flex-direction:column;
  line-height:.95;
  margin:0;
  font-family:'Orbitron',sans-serif;
  font-size:clamp(3rem,9vw,7rem);
  letter-spacing:7px;
}
.hero-title .glow{
  color:var(--cyan);
  text-shadow:0 0 14px rgba(0,234,255,.55),0 0 42px rgba(0,234,255,.15);
}
.hero-sub{
  min-height:34px;
  margin:22px 0 28px;
  color:#b2c5df;
  font-size:1.2rem;
  max-width:680px;
}
.hero-actions{display:flex;gap:16px;flex-wrap:wrap}
.btn-primary,.btn-secondary{
  padding:15px 24px;
  font-family:'Orbitron',sans-serif;
  font-size:.78rem;
  letter-spacing:2px;
  transition:.25s ease;
}
.btn-primary{
  background:linear-gradient(135deg,var(--cyan),#009eff);
  color:#041018;
  box-shadow:0 0 30px rgba(0,234,255,.25);
}
.btn-primary:hover{transform:translateY(-2px) scale(1.01)}
.btn-secondary{
  border:1px solid rgba(255,46,99,.35);
  color:#ffd7e3;
  background:rgba(255,46,99,.06);
}
.btn-secondary:hover{
  box-shadow:0 0 25px rgba(255,46,99,.2);
  transform:translateY(-2px);
}
.hero-metrics{
  display:flex;
  gap:18px;
  margin-top:34px;
  flex-wrap:wrap;
}
.metric{
  min-width:150px;
  background:linear-gradient(180deg,rgba(18,27,40,.84),rgba(10,15,24,.92));
  border:1px solid rgba(115,243,255,.1);
  padding:18px 16px;
}
.metric-num{
  display:block;
  font-family:'Orbitron',sans-serif;
  font-size:1.9rem;
  color:var(--cyan2);
}
.metric-label{
  display:block;
  margin-top:6px;
  font-family:'Share Tech Mono',monospace;
  font-size:.68rem;
  letter-spacing:2px;
  color:var(--muted);
}

.hero-right{display:grid;place-items:center}
.hero-frame{
  position:relative;
  width:min(480px,90%);
  aspect-ratio:1/1;
  display:grid;
  place-items:center;
  border:1px solid rgba(0,234,255,.18);
  background:
    linear-gradient(180deg,rgba(13,19,29,.8),rgba(8,12,20,.95)),
    radial-gradient(circle at center,rgba(0,234,255,.08),transparent 60%);
  box-shadow:0 0 40px rgba(0,0,0,.5),0 0 30px rgba(0,234,255,.08) inset;
}
.hero-logo{
  width:72%;
  filter:drop-shadow(0 0 26px rgba(0,234,255,.22));
}
.frame-glow{
  position:absolute;
  inset:12px;
  border:1px solid rgba(255,46,99,.22);
  pointer-events:none;
}

.ia-panel-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin:28px 0 70px;
}
.panel{
  padding:24px;
  background:linear-gradient(180deg,rgba(16,23,34,.95),rgba(9,13,20,.98));
  border:1px solid rgba(255,255,255,.06);
  box-shadow:0 18px 40px rgba(0,0,0,.25);
}
.panel-head{
  color:var(--red);
  font-family:'Share Tech Mono',monospace;
  letter-spacing:3px;
  font-size:.72rem;
  margin-bottom:12px;
}
.panel h3{
  margin:0 0 10px;
  font-family:'Orbitron',sans-serif;
  font-size:1rem;
  letter-spacing:2px;
}
.panel p{
  margin:0;
  color:#9db0ca;
  line-height:1.65;
}

.section-title-wrap{
  margin-bottom:24px;
}
.section-kicker{
  display:block;
  color:var(--red);
  font-family:'Share Tech Mono',monospace;
  letter-spacing:3px;
  font-size:.7rem;
  margin-bottom:8px;
}
.section-title-wrap h2{
  margin:0;
  font-family:'Orbitron',sans-serif;
  font-size:clamp(1.7rem,4vw,3rem);
  letter-spacing:4px;
}

.allies-section,.network-section,.access-section{
  margin:80px 0;
}
.ally-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
}
.ally-card{
  background:linear-gradient(180deg,rgba(14,21,33,.96),rgba(8,12,19,.98));
  border:1px solid rgba(115,243,255,.1);
  overflow:hidden;
  transition:.28s ease;
}
.ally-card:hover{
  transform:translateY(-5px);
  border-color:rgba(0,234,255,.28);
  box-shadow:0 0 35px rgba(0,234,255,.08);
}
.ally-image-wrap{
  height:240px;
  overflow:hidden;
  background:#071018;
}
.ally-image-wrap img{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .45s ease,filter .3s ease;
  filter:saturate(.95) contrast(1.04);
}
.ally-card:hover img{transform:scale(1.05)}
.ally-body{padding:20px}
.ally-body h3{
  margin:0 0 8px;
  font-family:'Orbitron',sans-serif;
  font-size:.95rem;
  letter-spacing:2px;
}
.ally-body p{
  margin:0 0 16px;
  color:#99afcc;
}
.ally-body span{
  color:var(--cyan2);
  font-family:'Share Tech Mono',monospace;
  font-size:.72rem;
  letter-spacing:2px;
}

.network-console{
  border:1px solid rgba(115,243,255,.14);
  background:linear-gradient(180deg,#0b1018,#080c13);
  box-shadow:0 0 30px rgba(0,0,0,.25);
}
.console-head{
  padding:12px 18px;
  border-bottom:1px solid rgba(115,243,255,.1);
  font-family:'Share Tech Mono',monospace;
  color:var(--muted);
  font-size:.72rem;
  letter-spacing:2px;
}
.console-body{
  padding:22px 18px;
  font-family:'Share Tech Mono',monospace;
  color:#9ed8ff;
  min-height:180px;
}
.console-body div{margin:8px 0}

.access-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:22px;
}
.vault-card{
  display:block;
  padding:26px;
  background:linear-gradient(180deg,rgba(15,19,33,.96),rgba(9,10,18,.98));
  border:1px solid rgba(255,46,99,.15);
  transition:.25s ease;
}
.vault-card:hover{
  transform:translateY(-4px);
  box-shadow:0 0 30px rgba(255,46,99,.12);
  border-color:rgba(255,46,99,.28);
}
.vault-label{
  color:var(--red);
  font-family:'Share Tech Mono',monospace;
  letter-spacing:3px;
  font-size:.72rem;
  margin-bottom:10px;
}
.vault-card h3{
  margin:0 0 10px;
  font-family:'Orbitron',sans-serif;
  letter-spacing:2px;
}
.vault-card p{
  margin:0;
  color:#9db0ca;
}

.ia-footer{
  border-top:1px solid rgba(115,243,255,.1);
  background:rgba(8,11,16,.9);
  overflow:hidden;
}
.ticker{
  display:flex;
  gap:40px;
  white-space:nowrap;
  padding:16px 0;
  font-family:'Share Tech Mono',monospace;
  color:#8cc9de;
  animation:ticker 18s linear infinite;
}
@keyframes ticker{
  from{transform:translateX(0)}
  to{transform:translateX(-30%)}
}

.auth-shell{
  min-height:100vh;
  display:grid;
  place-items:center;
  padding:40px 20px;
}
.auth-panel{
  width:min(520px,100%);
  background:linear-gradient(180deg,rgba(13,19,29,.96),rgba(8,11,16,.98));
  border:1px solid rgba(115,243,255,.14);
  padding:28px;
  box-shadow:0 20px 60px rgba(0,0,0,.35);
}
.auth-top{
  display:flex;
  align-items:center;
  gap:14px;
  margin-bottom:22px;
}
.auth-top img{
  width:54px;
  height:54px;
  object-fit:contain;
}
.auth-top h1{
  margin:0;
  font-family:'Orbitron',sans-serif;
  font-size:1.2rem;
  letter-spacing:3px;
}
.auth-top p{
  margin:4px 0 0;
  color:var(--muted);
  font-family:'Share Tech Mono',monospace;
  font-size:.72rem;
}
.sec-input{
  width:100%;
  padding:14px 14px;
  background:#0a1119;
  border:1px solid rgba(255,255,255,.08);
  color:var(--text);
  outline:none;
  font-family:'Share Tech Mono',monospace;
}
.sec-input:focus{
  border-color:rgba(0,234,255,.35);
  box-shadow:0 0 0 3px rgba(0,234,255,.08);
}
.sec-row{margin-bottom:14px}
.sec-btn{
  width:100%;
  padding:14px;
  border:none;
  cursor:pointer;
  background:linear-gradient(135deg,var(--cyan),#0aa1ff);
  color:#031018;
  font-family:'Orbitron',sans-serif;
  letter-spacing:2px;
  font-weight:700;
}
.sec-msg{
  margin-top:14px;
  color:#ffb3c7;
  min-height:24px;
  font-family:'Share Tech Mono',monospace;
  font-size:.8rem;
}
.empty-index{
  min-height:100vh;
  display:grid;
  place-items:center;
  color:#2b3445;
  font-family:'Share Tech Mono',monospace;
  letter-spacing:3px;
}

@media (max-width:1100px){
  .hero{grid-template-columns:1fr}
  .hero-right{order:-1}
  .ia-panel-grid,.ally-grid,.access-grid{grid-template-columns:1fr}
}
@media (max-width:820px){
  .ia-topbar{
    flex-direction:column;
    gap:16px;
    padding:18px;
  }
  .ia-nav{
    flex-wrap:wrap;
    justify-content:center;
  }
  .hero-title{font-size:clamp(2.4rem,14vw,4.7rem)}
}
