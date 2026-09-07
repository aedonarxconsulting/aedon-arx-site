// Aedon Arx Consulting — main app logic (single-file, multi-page via data-page toggling)

const TESTIMONIALS = [
  { name: 'Ritika Malhotra', loc: 'Client, Gurugram', quote: 'The team at Aedon Arx understood exactly what we wanted in a 3 BHK and didn\'t waste our time showing us mismatches.' },
  { name: 'Arjun Nair', loc: 'Client, Noida', quote: 'We were looking for commercial office space and they had verified options ready within two days.' },
  { name: 'Sneha & Rahul Verma', loc: 'Clients, Faridabad', quote: 'Honest guidance from start to finish. No pressure to close a deal, just straight answers to every question we had.' },
  { name: 'Karthik Subramaniam', loc: 'Client, Tiruppur', quote: 'Their consultant walked us through the paperwork step by step — made a confusing process feel simple.' },
  { name: 'Priya Menon', loc: 'Client, Gurugram', quote: 'We used the "Ask AI" tool on their site and got a shortlist that actually matched our budget. Saved us weeks of searching.' },
  { name: 'Vikram Rao', loc: 'Client, Noida', quote: 'Good follow-up even after the deal closed. They checked in to make sure the handover went smoothly.' },
  { name: 'Ananya Iyer', loc: 'Client, Faridabad', quote: 'As a first-time buyer I had a lot of questions. Their team answered every one patiently, even over WhatsApp late at night.' },
  { name: 'Mohammed Faiz', loc: 'Client, Tiruppur', quote: 'Found a warehouse space for our business through Aedon Arx — the location suggestions were spot on for our supply chain.' },
  { name: 'Neha Chawla', loc: 'Client, Gurugram', quote: 'They were transparent about pricing and never pushed us toward something outside our budget.' },
  { name: 'Dev Sharma', loc: 'Client, Noida', quote: 'Professional, responsive and genuinely helpful. Would recommend Aedon Arx to anyone looking in the NCR region.' }
];

function testimonialCard(t, delayClass){
  return `<div class="test-card tilt fup ${delayClass||''}">
    <div class="test-stars">★★★★★</div>
    <p class="quote">${t.quote}</p>
    <div class="test-person"><b>${t.name}</b><span>${t.loc}</span></div>
  </div>`;
}

function propertyUrl(id){
  return `${location.origin}${location.pathname}?property=${id}`;
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2200);
}

function propertyCardHtml(p){
  return `
    <div class="property-card tilt">
      <div class="pimg"><img src="${p.img}" alt="${p.name}"><div class="ptag">${p.type}</div></div>
      <div class="pbody">
        <h3>${p.name}</h3>
        <div class="ploc"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>${p.location}</div>
        <div class="pspecs">${p.bedrooms ? `<span>🛏 ${p.bedrooms} BHK</span>` : ''}<span>▢ ${p.area}</span>${p.has3D ? '<span>🎥 3D Walkthrough Available</span>' : ''}</div>
        <p class="muted" style="font-size:.82rem;line-height:1.5;margin-bottom:14px;">${p.desc}</p>
        <div class="pprice">${p.priceLabel}</div>
        <div class="pactions">
          <a href="${p.brochure}" target="_blank" rel="noopener" class="btn btn-sm">Brochure</a>
          <button class="btn btn-outline btn-sm view-property-btn" data-id="${p.id}">View Details</button>
          <button class="btn btn-outline btn-sm share-property-btn" data-id="${p.id}">Share</button>
        </div>
      </div>
    </div>`;
}

function stripItemHtml(p){
  return `<div class="strip-item view-property-btn" data-id="${p.id}">
    <img src="${p.img}" alt="${p.name}">
    <div class="lbl"><small>${p.location}</small><b>${p.name}</b></div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', init);

function init(){
  document.getElementById('footBrochure').href = COMPANY_BROCHURE;

  // ---- render property strip (home) ----
  document.getElementById('propertyStrip').innerHTML = PROPERTIES.slice(0,5).map(stripItemHtml).join('');

  // ---- render best properties (home) ----
  document.getElementById('bestPropertiesGrid').innerHTML = PROPERTIES.slice(0,6).map(propertyCardHtml).join('');

  // ---- render full property grid (amenities) with filters ----
  const grid = document.getElementById('propertyGrid');
  const noResults = document.getElementById('noResults');
  const fLocation = document.getElementById('fLocation');
  const fType = document.getElementById('fType');
  const fBudget = document.getElementById('fBudget');
  function renderGrid(){
    const loc = fLocation.value, type = fType.value, budget = fBudget.value;
    let [min,max] = budget==='Any' ? [0, Infinity] : budget.split('-').map(Number);
    const filtered = PROPERTIES.filter(p=>{
      const okLoc = loc==='Any' || p.location===loc;
      const okType = type==='Any' || p.type===type;
      const okBudget = p.price >= min && p.price <= max;
      return okLoc && okType && okBudget;
    });
    grid.innerHTML = filtered.map(propertyCardHtml).join('');
    noResults.style.display = filtered.length ? 'none' : 'block';
    bindPropertyButtons();
  }
  [fLocation, fType, fBudget].forEach(el=> el.addEventListener('change', renderGrid));
  document.getElementById('fReset').addEventListener('click', ()=>{ fLocation.value='Any'; fType.value='Any'; fBudget.value='Any'; renderGrid(); });
  renderGrid();

  // ---- testimonials ----
  document.getElementById('testimonialsPreviewGrid').innerHTML = TESTIMONIALS.slice(0,3).map((t,i)=> testimonialCard(t, 'd'+i)).join('');
  document.getElementById('testimonialsFullGrid').innerHTML = TESTIMONIALS.map((t,i)=> testimonialCard(t, 'd'+(i%4))).join('');

  bindPropertyButtons();

  // ---- page switching ----
  document.querySelectorAll('.nav-go, [data-page]').forEach(el=>{
    if(el.tagName === 'BUTTON' && el.dataset.page && !el.classList.contains('view-property-btn')){
      el.addEventListener('click', ()=> goToPage(el.dataset.page));
    }
  });

  // handle initial hash / property deep-link
  const params = new URLSearchParams(location.search);
  const propId = params.get('property');
  if(propId){
    showStandaloneProperty(propId);
  } else {
    const hash = location.hash.replace('#','');
    if(hash && document.querySelector(`.page[data-page="${hash}"]`)) goToPage(hash, true);
  }

  window.addEventListener('hashchange', ()=>{
    const h = location.hash.replace('#','');
    if(h && document.querySelector(`.page[data-page="${h}"]`)) goToPage(h, true);
  });

  initAskAI();
  initCalculator();
  initContactForm();
  initChatWidget();
}

function bindPropertyButtons(){
  document.querySelectorAll('.view-property-btn').forEach(btn=>{
    btn.onclick = () => {
      const id = btn.dataset.id;
      history.pushState({}, '', `?property=${id}`);
      showStandaloneProperty(id);
    };
  });
  document.querySelectorAll('.share-property-btn').forEach(btn=>{
    btn.onclick = () => {
      const id = btn.dataset.id;
      const url = propertyUrl(id);
      if(navigator.clipboard){
        navigator.clipboard.writeText(url).then(()=> showToast('Property link copied!'));
      } else {
        prompt('Copy this link:', url);
      }
    };
  });
}

// ---------------- PAGE SWITCHING ----------------
function goToPage(page, skipHash){
  document.querySelectorAll('.page').forEach(p=> p.classList.toggle('active', p.dataset.page === page));
  document.querySelectorAll('nav.links button').forEach(b=> b.classList.toggle('active', b.dataset.page === page));
  document.getElementById('navLinks').classList.remove('mobile-open');
  window.scrollTo({top:0, behavior:'instant' in document.documentElement.style ? 'instant' : 'auto'});
  if(!skipHash) history.pushState({}, '', `#${page}`);
  const activePage = document.querySelector(`.page[data-page="${page}"]`);
  if(activePage){
    activePage.querySelectorAll('.fup, .mask-h').forEach(el=> el.classList.add('in'));
    const statsRow = activePage.querySelector('.stats-row');
    if(statsRow && window.__startCounters) window.__startCounters();
  }
}

// ---------------- STANDALONE PROPERTY DEEP LINK ----------------
function showStandaloneProperty(id){
  const p = PROPERTIES.find(x=> x.id === id);
  document.getElementById('siteNav').style.display = 'none';
  document.getElementById('siteFooter').style.display = 'none';
  document.getElementById('fabChat').style.display = 'none';
  document.querySelectorAll('.page').forEach(pg=> pg.classList.remove('active'));
  const overlay = document.getElementById('propertyStandalone');
  overlay.style.display = 'flex';
  if(!p){
    document.getElementById('standaloneCard').innerHTML = `<div class="sbody"><h1>Property not found</h1><span class="standalone-back" id="backToSite">← Back to Aedon Arx Consulting</span></div>`;
  } else {
    document.getElementById('standaloneCard').innerHTML = `
      <div class="simg"><img src="${p.img}" alt="${p.name}"></div>
      <div class="sbody">
        <div class="standalone-brand">
          <div class="brand-icon" style="width:32px;height:32px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 17H3L12 3z" stroke="#D9B45C" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 9l5 8H7l5-8z" fill="#D9B45C"/></svg></div>
          <div class="brand-name">Aedon Arx Consulting</div>
        </div>
        <h1>${p.name}</h1>
        <div class="ploc"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>${p.location}</div>
        <div class="pspecs" style="margin-top:10px;">${p.bedrooms ? `<span>🛏 ${p.bedrooms} BHK</span>` : ''}<span>▢ ${p.area}</span>${p.has3D ? '<span>🎥 3D Walkthrough Available</span>' : ''}</div>
        <div class="sprice">${p.priceLabel}</div>
        <p class="muted" style="font-size:.9rem;line-height:1.6;">${p.desc}</p>
        <div class="sactions">
          <a href="${p.brochure}" target="_blank" rel="noopener" class="btn">Download Brochure</a>
          <a href="tel:+919953913605" class="btn btn-outline">Call Us</a>
          <a href="https://wa.me/919953913605?text=${encodeURIComponent('Hi, I\'m interested in '+p.name+' ('+p.location+').')}" target="_blank" rel="noopener" class="btn btn-outline">WhatsApp</a>
        </div>
        <span class="standalone-back" id="backToSite">← Back to full Aedon Arx Consulting site</span>
      </div>`;
  }
  document.getElementById('backToSite').addEventListener('click', ()=>{
    history.pushState({}, '', location.pathname);
    overlay.style.display = 'none';
    document.getElementById('siteNav').style.display = 'flex';
    document.getElementById('siteFooter').style.display = 'block';
    document.getElementById('fabChat').style.display = 'flex';
    goToPage('home', true);
  });
}

// ---------------- ASK AI (form + chat) ----------------
function matchCardHtml(p){
  return `<div class="match-card">
    <h4>${p.name}</h4>
    <p>${p.location} • ${p.type} • ${p.priceLabel}${p.bedrooms ? ' • '+p.bedrooms+' BHK' : ''}${p.has3D ? ' • 🎥 3D Walkthrough Available' : ''}</p>
    <a href="${p.brochure}" target="_blank" rel="noopener" class="btn btn-sm">Download Brochure</a>
  </div>`;
}
function chatMiniCard(p){
  return `<div class="mini-card"><b>${p.name}</b>${p.location} • ${p.priceLabel}${p.has3D ? ' • 3D Walkthrough' : ''}<br><a href="${p.brochure}" target="_blank" rel="noopener">Download Brochure →</a></div>`;
}
function linkify(text){
  return text.replace(/(https?:\/\/[^\s)]+)/g, url => `<a href="${url}" target="_blank" rel="noopener" style="color:#2F6FED;">${url}</a>`);
}

function initAskAI(){
  document.getElementById('aiForm').addEventListener('submit', function(e){
    e.preventDefault();
    const location_ = document.getElementById('aiLocation').value;
    const type = document.getElementById('aiType').value;
    const [minBudget, maxBudget] = document.getElementById('aiBudget').value.split('-').map(Number);
    const bedrooms = parseInt(document.getElementById('aiBedrooms').value, 10) || null;
    const matches = matchProperties({ location: location_, type, minBudget, maxBudget, bedrooms });
    const resultsBox = document.getElementById('aiResults');
    const list = document.getElementById('aiResultsList');
    list.innerHTML = matches.length ? matches.map(matchCardHtml).join('') : '<p class="muted">No close matches — try widening your budget or location.</p>';
    resultsBox.classList.add('show');
  });

  const chatBody = document.getElementById('chatBody');
  function addChatMsg(html, who){
    const m = document.createElement('div');
    m.className = 'msg ' + who;
    m.innerHTML = html;
    chatBody.appendChild(m);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  addChatMsg("Hi! Tell me what you're looking for — e.g. \"3 BHK in Noida under 1 Cr\" or \"commercial space in Tiruppur\".", 'bot');

  let askAiHistory = [];
  function chatTyping(show){
    let el = document.getElementById('askAiTyping');
    if(show && !el){
      el = document.createElement('div'); el.id='askAiTyping'; el.className='msg bot'; el.textContent='...';
      chatBody.appendChild(el); chatBody.scrollTop = chatBody.scrollHeight;
    } else if(!show && el){ el.remove(); }
  }
  async function sendChat(){
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if(!text) return;
    addChatMsg(text, 'user');
    input.value = '';
    askAiHistory.push({ role:'user', content:text });
    chatTyping(true);
    const reply = await askAedonAI(text, askAiHistory.slice(-6));
    chatTyping(false);
    addChatMsg(linkify(reply), 'bot');
    askAiHistory.push({ role:'assistant', content:reply });
    const filters = parseTextToFilters(text);
    const matches = matchProperties(filters);
    if(matches.length){
      let html = ''; matches.forEach(p=> html += chatMiniCard(p));
      addChatMsg(html, 'bot');
    }
  }
  document.getElementById('chatSend').addEventListener('click', sendChat);
  document.getElementById('chatInput').addEventListener('keydown', e=>{ if(e.key==='Enter') sendChat(); });
}

// ---------------- CALCULATOR ----------------
function initCalculator(){
  const amountEl = document.getElementById('calcAmount');
  const rateEl = document.getElementById('calcRate');
  const tenureEl = document.getElementById('calcTenure');
  const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
  function compute(){
    const P = Number(amountEl.value);
    const annualRate = Number(rateEl.value);
    const years = Number(tenureEl.value);
    document.getElementById('calcAmountVal').textContent = inr(P);
    document.getElementById('calcRateVal').textContent = annualRate + '%';
    document.getElementById('calcTenureVal').textContent = years + ' Years';
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const emi = r === 0 ? P/n : (P * r * Math.pow(1+r,n)) / (Math.pow(1+r,n) - 1);
    const total = emi * n;
    const interest = total - P;
    document.getElementById('calcEmi').textContent = inr(emi);
    document.getElementById('calcPrincipal').textContent = inr(P);
    document.getElementById('calcInterest').textContent = inr(interest);
    document.getElementById('calcTotal').textContent = inr(total);
  }
  [amountEl, rateEl, tenureEl].forEach(el=> el.addEventListener('input', compute));
  compute();
}

// ---------------- CONTACT FORM ----------------
function initContactForm(){
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cName').value;
    const msg = document.getElementById('cMessage').value;
    const phone = document.getElementById('cPhone').value;
    window.location.href = `mailto:connect@aedonarxconsulting.com?subject=Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nPhone: ' + phone)}`;
  });
}

// ---------------- FLOATING CHAT WIDGET ----------------
function initChatWidget(){
  const fab = document.getElementById('fabChat');
  const panel = document.getElementById('widgetPanel');
  const body = document.getElementById('widgetBody');
  const input = document.getElementById('widgetInput');
  const sendBtn = document.getElementById('widgetSend');

  function addMsg(text, who, html){
    const m = document.createElement('div'); m.className = 'msg ' + who;
    if(html) m.innerHTML = text; else m.textContent = text;
    body.appendChild(m); body.scrollTop = body.scrollHeight;
  }
  function addQuickReplies(options){
    const wrap = document.createElement('div'); wrap.className = 'quick-replies';
    options.forEach(opt=>{
      const b = document.createElement('button'); b.textContent = opt;
      b.addEventListener('click', ()=> handleUserText(opt));
      wrap.appendChild(b);
    });
    body.appendChild(wrap); body.scrollTop = body.scrollHeight;
  }
  let greeted = false, chatHistory = [];
  fab.addEventListener('click', ()=>{
    panel.classList.toggle('open');
    if(!greeted){
      greeted = true;
      addMsg("Hi! I'm the Aedon Arx assistant. How can I help you today?", 'bot');
      addQuickReplies(['Show me properties', 'Talk to a consultant', 'What areas do you serve?']);
    }
  });
  document.getElementById('widgetClose').addEventListener('click', ()=> panel.classList.remove('open'));
  function typingIndicator(show){
    let el = document.getElementById('typingDot');
    if(show && !el){ el = document.createElement('div'); el.id='typingDot'; el.className='msg bot'; el.textContent='...'; body.appendChild(el); body.scrollTop = body.scrollHeight; }
    else if(!show && el) el.remove();
  }
  async function handleUserText(text){
    addMsg(text, 'user');
    chatHistory.push({ role:'user', content:text });
    typingIndicator(true);
    const reply = await askAedonAI(text, chatHistory.slice(-6));
    typingIndicator(false);
    addMsg(linkify(reply), 'bot', true);
    chatHistory.push({ role:'assistant', content:reply });
  }
  sendBtn.addEventListener('click', ()=>{ if(input.value.trim()){ const v=input.value.trim(); input.value=''; handleUserText(v); } });
  input.addEventListener('keydown', e=>{ if(e.key==='Enter' && input.value.trim()){ const v=input.value.trim(); input.value=''; handleUserText(v); } });
}

// menu button (mobile nav)
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('menuBtn').addEventListener('click', ()=>{
    document.getElementById('navLinks').classList.toggle('mobile-open');
  });
});
