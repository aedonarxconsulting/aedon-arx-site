// Aedon Arx Consulting — shared entrance/scroll animations (ported from the original template)
(function(){
  // ---------- PRELOADER (stays visible minimum ~1.4s) ----------
  const preloader = document.getElementById('preloader');
  const preFill = document.getElementById('preFill');
  const prePct = document.getElementById('prePct');
  if(preloader && preFill && prePct){
    const MIN_MS = 1400;
    const preStart = performance.now();
    const preTimer = setInterval(()=>{
      const elapsed = performance.now() - preStart;
      const pct = Math.min(100, Math.round((elapsed/MIN_MS)*100));
      preFill.style.width = pct + '%';
      prePct.textContent = 'Loading ' + pct + '%';
      if(elapsed >= MIN_MS){
        clearInterval(preTimer);
        preFill.style.width = '100%';
        prePct.textContent = 'Loading 100%';
        setTimeout(()=> preloader.classList.add('done'), 300);
      }
    }, 80);
  }

  // ---------- CUSTOM CURSOR ----------
  const cDot = document.getElementById('cursorDot');
  const cRing = document.getElementById('cursorRing');
  if(cDot && cRing && window.matchMedia('(hover:hover)').matches){
    let mx=0,my=0,rx=0,ry=0;
    window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; cDot.style.left=mx+'px'; cDot.style.top=my+'px'; });
    (function loop(){ rx += (mx-rx)*.16; ry += (my-ry)*.16; cRing.style.left=rx+'px'; cRing.style.top=ry+'px'; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', e=>{
      if(e.target.closest('a, button, .tilt, input, textarea, select')) cRing.classList.add('hover');
    });
    document.addEventListener('mouseout', e=>{
      if(e.target.closest('a, button, .tilt, input, textarea, select')) cRing.classList.remove('hover');
    });
  }

  // ---------- MAGNETIC BUTTONS (delegated so dynamically-rendered buttons work too) ----------
  document.addEventListener('mousemove', e=>{
    const btn = e.target.closest('.btn');
    if(!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2, y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*.28}px, ${y*.35}px)`;
  });
  document.addEventListener('mouseout', e=>{
    const btn = e.target.closest('.btn');
    if(btn && !btn.contains(e.relatedTarget)) btn.style.transform = 'translate(0,0)';
  });

  // ---------- TILT CARDS (delegated so dynamically-rendered cards work too) ----------
  document.addEventListener('mousemove', e=>{
    const card = e.target.closest('.tilt');
    if(!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width - .5, py = (e.clientY - r.top)/r.height - .5;
    card.style.transform = `perspective(700px) rotateX(${py*-7}deg) rotateY(${px*7}deg) translateZ(4px)`;
  });
  document.addEventListener('mouseout', e=>{
    const card = e.target.closest('.tilt');
    if(card && !card.contains(e.relatedTarget)) card.style.transform = 'perspective(700px) rotateX(0) rotateY(0)';
  });

  // ---------- HERO WORD-BY-WORD STAGGER ----------
  // (word-by-word stagger removed — headline now animates as one unit with the tagline)

  // ---------- STAT COUNTERS ----------
  const counters = document.querySelectorAll('.stat-big[data-count]');
  let started = false;
  function startCounters(){
    if(started) return; started = true;
    counters.forEach(el=>{
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '+';
      const start = performance.now(), duration = 1300;
      function tick(now){
        const t = Math.min(1, (now-start)/duration);
        el.textContent = Math.floor(t*target).toLocaleString('en-IN');
        if(t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('en-IN') + suffix;
      }
      requestAnimationFrame(tick);
    });
  }

  window.__startCounters = startCounters;

  // ---------- SCROLL REVEAL (fade-up + mask-reveal share one observer) ----------
  // NOTE: this used to run ONCE, right when animations.js loaded — which is
  // BEFORE app.js injects the property strip, best-properties grid,
  // testimonial cards, etc via innerHTML. Elements added after that point
  // (anything with class "fup") were never handed to the IntersectionObserver,
  // so they stayed at their default CSS state (opacity:0) forever — that is
  // the "empty spaces" bug. Fix: keep one shared observer alive and expose
  // window.__refreshScrollReveal() so app.js can re-scan for new .fup/.mask-h
  // elements right after it renders dynamic content.
  const hasIO = 'IntersectionObserver' in window;
  let revealIO = null;
  const alreadyObserved = new WeakSet();
  function refreshScrollReveal(){
    const els = document.querySelectorAll('.fup, .mask-h');
    if(hasIO){
      if(!revealIO){
        revealIO = new IntersectionObserver((entries)=>{
          entries.forEach(e=>{
            if(e.isIntersecting){ e.target.classList.add('in'); revealIO.unobserve(e.target); }
          });
        }, {threshold:.15});
      }
      els.forEach(el=>{
        if(!alreadyObserved.has(el)){ alreadyObserved.add(el); revealIO.observe(el); }
      });
    } else {
      els.forEach(el=> el.classList.add('in'));
    }
  }
  refreshScrollReveal();
  window.__refreshScrollReveal = refreshScrollReveal;

  const statsRow = document.querySelector('.stats-row');
  if(hasIO && statsRow){
    const cio = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) startCounters(); });
    }, {threshold:.4});
    cio.observe(statsRow);
  } else if(!hasIO){
    startCounters();
  }

  // ---------- HERO HEADLINE/TAGLINE — REPEAT DROP-IN EVERY 10s ----------
  const homeHero = document.getElementById('homeHero');
  if(homeHero){
    const playHeroAnim = ()=>{
      homeHero.classList.remove('play-anim');
      void homeHero.offsetWidth; // force reflow so the removal registers
      requestAnimationFrame(()=>{ homeHero.classList.add('play-anim'); });
    };
    playHeroAnim();
    setInterval(playHeroAnim, 10000);
  }
})();
