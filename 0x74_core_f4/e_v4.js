(() => {
  const loader = document.getElementById('iaLoader');
  const typeTarget = document.getElementById('typeTarget');
  const consoleFeed = document.getElementById('consoleFeed');
  const metrics = document.querySelectorAll('.metric-num');
  const canvas = document.getElementById('bg-grid');
  const phrases = [
    'High-trust public-facing secure node.',
    'Enterprise-grade visual identity with hardened client surface.',
    'Controlled access, segmented structure, disciplined presentation.'
  ];
  let p = 0;
  let c = 0;
  let del = false;

  const boot = () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hide');
    }, 1500);
  };

  const type = () => {
    if (!typeTarget) return;
    const current = phrases[p];
    if (del) {
      typeTarget.textContent = current.slice(0, --c);
    } else {
      typeTarget.textContent = current.slice(0, ++c);
    }
    if (!del && c === current.length) {
      del = true;
      setTimeout(type, 1400);
      return;
    }
    if (del && c === 0) {
      del = false;
      p = (p + 1) % phrases.length;
    }
    setTimeout(type, del ? 30 : 55);
  };

  const animateMetrics = () => {
    metrics.forEach(el => {
      const target = Number(el.dataset.count || 0);
      let n = 0;
      const inc = Math.max(1, Math.ceil(target / 50));
      const timer = setInterval(() => {
        n += inc;
        if (n >= target) {
          n = target;
          clearInterval(timer);
        }
        el.textContent = n;
      }, 28);
    });
  };

  const feed = () => {
    if (!consoleFeed) return;
    const lines = [
      '> Surface controls synchronized.',
      '> Rendering ally references.',
      '> Policy layer verified.',
      '> Secure entry ready.'
    ];
    let i = 0;
    const tick = setInterval(() => {
      if (i >= lines.length) return clearInterval(tick);
      const row = document.createElement('div');
      row.textContent = lines[i++];
      consoleFeed.appendChild(row);
    }, 800);
  };

  const grid = () => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    resize();
    addEventListener('resize', resize);
    const points = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,234,255,.5)';
      points.forEach((a, i) => {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(0,234,255,${0.08 * (1 - d / 110)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };
    draw();
  };

  const harden = () => {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if (e.key === 'F12') e.preventDefault();
      if (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) e.preventDefault();
      if (e.ctrlKey && ['u','U','s','S'].includes(e.key)) e.preventDefault();
    });
    if (window.self !== window.top) {
      try { window.top.location = window.location.href } catch {}
    }
    if (navigator.webdriver) {
      try { window.top.location = window.location.href } catch {}
    }
    const pathHistory = [];
    const pathCheck = setInterval(() => {
      pathHistory.push({path:location.pathname+location.search, ts:Date.now()});
      if (pathHistory.length > 10) {
        const recent = pathHistory.slice(-10);
        const unique = recent.map(p => p.path);
        if (unique.length > 8 && recent[recent.length-1].ts - recent[0].ts < 5000) {
          alert('Suspicious activity detected.');
        }
      }
      if (pathHistory.length > 50) pathHistory.shift();
    }, 500);
    // allow copy‑paste protection for the input form later    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(n => {
          if (n.nodeType === 1) {
            const t = n.tagName;
            if (t === 'IFRAME' || t === 'OBJECT' || t === 'EMBED') {
              n.remove();
            }
          }
        });
      });
    });
    observer.observe(document.body, {childList:true, subtree:true});
    window.addEventListener('error', e => {
      if (e.filename && !e.filename.includes(location.hostname)) {
        alert('External script error detected.');
      }
    });
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      if (typeof url === 'string' && !url.includes(location.hostname) && 
          !url.includes('ipinfo.io') && !url.includes('firebase') && 
          !url.includes('gstatic') && !url.includes('googleapis')) {
        const allowed = [location.hostname, 'localhost', '127.0.0.1'];
        const ok = allowed.some(h => url.includes(h) || url.startsWith('/'));
        if (!ok) alert('Blocked unauthorized XHR.');
      }
      return origOpen.apply(this, arguments);
    };
  })();
