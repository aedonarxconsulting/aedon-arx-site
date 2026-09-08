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
  // Points to the static per-property page (property/<id>.html) instead of
  // the ?property= SPA link, because WhatsApp/Telegram/Facebook link
  // previews only read plain HTML + Open Graph tags — they don't run the
  // site's JS, so a ?property= link would just show the generic homepage
  // preview. property/<id>.html has per-listing og:title/og:image baked in,
  // so sharing it shows a rich card (image + name + price), same as what
  // you saw from Propsite.
  return `${location.origin}${location.pathname.replace(/index\.html$/,'')}property/${id}.html`;
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
          ${p.has3D ? `<button class="btn btn-outline btn-sm btn-3d walkthrough-btn" data-id="${p.id}">🎥 3D Walkthrough</button>` : ''}
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
  // The nav was position:sticky, which silently breaks the moment any
  // ancestor (here, <body>) has overflow set to anything but visible —
  // and we do set overflow-x:hidden on body to stop horizontal scroll.
  // Fixed it by switching the nav to position:fixed instead — but a fixed
  // element is taken out of flow, so we push page content down by exactly
  // its real rendered height (varies slightly by screen size / font
  // loading), and re-measure on resize.
  function syncNavHeight(){
    const nav = document.getElementById('siteNav');
    if(nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);

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

  // Newly-injected .fup/.mask-h cards above (testimonials etc.) need to be
  // handed to the scroll-reveal observer, or they stay invisible — see the
  // fix + explanation in animations.js.
  if(window.__refreshScrollReveal) window.__refreshScrollReveal();

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
  initFaq();
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
  // NOTE: there's no actual 360°/Matterport/Pannellum link wired to any
  // property yet (data.js just has a has3D:true flag, no real URL) — so
  // rather than open a broken viewer, this opens WhatsApp with the property
  // pre-filled so a consultant can send the real walkthrough link. Once you
  // add a real `threeDUrl` field per property in data.js, tell me and I'll
  // make this button open that link directly in a lightbox instead.
  document.querySelectorAll('.walkthrough-btn').forEach(btn=>{
    btn.onclick = () => {
      const id = btn.dataset.id;
      const p = PROPERTIES.find(x=> x.id===id);
      if(!p) return;
      if(p.threeDUrl){
        window.open(p.threeDUrl, '_blank', 'noopener');
      } else {
        const msg = encodeURIComponent(`Hi, can you share the 3D walkthrough link for ${p.name} (${p.location})?`);
        window.open(`https://wa.me/919953913605?text=${msg}`, '_blank', 'noopener');
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
  overlay.classList.add('show');
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
    overlay.classList.remove('show');
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

// ---------------- CALCULATOR (12 tools, modal-based — ported from Nilaya template) ----------------
function initCalculator(){
  const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const num = v => parseFloat(v) || 0;

  const tools = {
    emi:{
      title:'EMI Calculator', sub:'Monthly instalment and total interest breakdown.',
      fields:[
        {id:'amount', label:'Loan amount (₹)', type:'number', ph:'5000000'},
        {id:'rate', label:'Interest rate (% p.a.)', type:'number', ph:'8.5', step:'0.1'},
        {id:'years', label:'Tenure (years)', type:'number', ph:'20'},
      ],
      calc:(v)=>{
        const P = num(v.amount), r = num(v.rate)/12/100, n = num(v.years)*12;
        const emi = r===0 ? P/n : P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
        const total = emi*n, interest = total-P;
        return [
          ['Monthly EMI', inr(emi)],
          ['Total interest payable', inr(interest)],
          ['Total amount payable', inr(total)],
        ];
      }
    },
    eligibility:{
      title:'Loan Eligibility', sub:'Rough estimate of how much you can borrow.',
      fields:[
        {id:'income', label:'Monthly income (₹)', type:'number', ph:'80000'},
        {id:'existingEmi', label:'Existing EMIs (₹/month)', type:'number', ph:'0'},
        {id:'rate', label:'Interest rate (% p.a.)', type:'number', ph:'8.5', step:'0.1'},
        {id:'years', label:'Tenure (years)', type:'number', ph:'20'},
      ],
      calc:(v)=>{
        const foir = num(v.income)*0.5 - num(v.existingEmi);
        const r = num(v.rate)/12/100, n = num(v.years)*12;
        const maxLoan = foir>0 ? (r===0 ? foir*n : foir*(Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n))) : 0;
        return [
          ['Max affordable EMI', inr(Math.max(foir,0))],
          ['Estimated eligible loan', inr(maxLoan)],
          ['Assumption', '50% of income toward EMIs'],
        ];
      }
    },
    propertyComparison:{
      title:'Property Comparison', sub:'Compare two properties on price-per-sqft and total cost.',
      fields:[
        {id:'nameA', label:'Property A name', type:'text', ph:'e.g. DLF The Skycourt'},
        {id:'priceA', label:'Property A price (₹)', type:'number', ph:'22000000'},
        {id:'areaA', label:'Property A area (sqft)', type:'number', ph:'1929'},
        {id:'nameB', label:'Property B name', type:'text', ph:'e.g. Other listing'},
        {id:'priceB', label:'Property B price (₹)', type:'number', ph:'21000000'},
        {id:'areaB', label:'Property B area (sqft)', type:'number', ph:'1850'},
      ],
      calc:(v)=>{
        const psA = num(v.priceA)/num(v.areaA), psB = num(v.priceB)/num(v.areaB);
        const better = psA <= psB ? (v.nameA||'Property A') : (v.nameB||'Property B');
        return [
          [`${v.nameA||'Property A'} — price/sqft`, inr(psA)],
          [`${v.nameB||'Property B'} — price/sqft`, inr(psB)],
          ['Better value on price/sqft', better],
        ];
      }
    },
    roi:{
      title:'ROI Calculator', sub:'Return on a property investment.',
      fields:[
        {id:'buy', label:'Purchase price (₹)', type:'number', ph:'5000000'},
        {id:'current', label:'Current / sale value (₹)', type:'number', ph:'6500000'},
        {id:'years', label:'Holding period (years)', type:'number', ph:'4'},
      ],
      calc:(v)=>{
        const b=num(v.buy), c=num(v.current), y=num(v.years)||1;
        const roi=((c-b)/b)*100, cagr=(Math.pow(c/b,1/y)-1)*100;
        return [
          ['Absolute gain', inr(c-b)],
          ['Total ROI', roi.toFixed(1)+'%'],
          ['CAGR (annualised)', cagr.toFixed(1)+'%'],
        ];
      }
    },
    rentalYield:{
      title:'Rental Yield', sub:'Gross and net yield from rent.',
      fields:[
        {id:'value', label:'Property value (₹)', type:'number', ph:'5000000'},
        {id:'rent', label:'Monthly rent (₹)', type:'number', ph:'22000'},
        {id:'expenses', label:'Annual maintenance/expenses (₹)', type:'number', ph:'30000'},
      ],
      calc:(v)=>{
        const val=num(v.value), annualRent=num(v.rent)*12, exp=num(v.expenses);
        const gross=(annualRent/val)*100, net=((annualRent-exp)/val)*100;
        return [
          ['Annual rent', inr(annualRent)],
          ['Gross rental yield', gross.toFixed(2)+'%'],
          ['Net rental yield', net.toFixed(2)+'%'],
        ];
      }
    },
    rentVsBuy:{
      title:'Rent vs Buy', sub:'Which is smarter over your time horizon?',
      fields:[
        {id:'rent', label:'Current monthly rent (₹)', type:'number', ph:'20000'},
        {id:'price', label:'Property price (₹)', type:'number', ph:'5000000'},
        {id:'down', label:'Down payment (%)', type:'number', ph:'20'},
        {id:'rate', label:'Loan interest rate (% p.a.)', type:'number', ph:'8.5', step:'0.1'},
        {id:'years', label:'Years you plan to stay', type:'number', ph:'10'},
      ],
      calc:(v)=>{
        const price=num(v.price), downPct=num(v.down)/100, years=num(v.years)||1;
        const down=price*downPct, loan=price-down;
        const r=num(v.rate)/12/100, n=years*12;
        const emi = r===0 ? loan/n : loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
        const totalBuyCost = down + emi*n;
        const totalRentCost = num(v.rent)*12*years*1.3;
        const verdict = totalBuyCost < totalRentCost*1.15 ? 'Buying likely comes out ahead' : 'Renting may cost less over this period';
        return [
          [`Total outlay if you rent (${years}y, escalating)`, inr(totalRentCost)],
          [`Total outlay if you buy (down + EMIs)`, inr(totalBuyCost)],
          ['Indicative verdict', verdict],
        ];
      }
    },
    sipVsProperty:{
      title:'SIP vs Property', sub:'Mutual fund SIP growth vs real estate appreciation.',
      fields:[
        {id:'sip', label:'Monthly SIP amount (₹)', type:'number', ph:'20000'},
        {id:'sipReturn', label:'Expected SIP return (% p.a.)', type:'number', ph:'12', step:'0.1'},
        {id:'propValue', label:'Alternative: property value (₹)', type:'number', ph:'5000000'},
        {id:'propReturn', label:'Expected property appreciation (% p.a.)', type:'number', ph:'7', step:'0.1'},
        {id:'years', label:'Years', type:'number', ph:'10'},
      ],
      calc:(v)=>{
        const r=num(v.sipReturn)/12/100, n=num(v.years)*12, sip=num(v.sip);
        const sipCorpus = r===0 ? sip*n : sip*((Math.pow(1+r,n)-1)/r)*(1+r);
        const propCorpus = num(v.propValue)*Math.pow(1+num(v.propReturn)/100, num(v.years));
        return [
          [`SIP corpus after ${v.years||0} years`, inr(sipCorpus)],
          [`Property value after ${v.years||0} years`, inr(propCorpus)],
          ['Note', 'Property returns exclude rental income & taxes'],
        ];
      }
    },
    tds:{
      title:'TDS On Property', sub:'1% deduction applies over ₹50 lakh.',
      fields:[{id:'value', label:'Property sale value (₹)', type:'number', ph:'5500000'}],
      calc:(v)=>{
        const val=num(v.value);
        const applicable = val>=5000000;
        const tds = applicable ? val*0.01 : 0;
        return [
          ['TDS applicable?', applicable ? 'Yes (value ≥ ₹50L)' : 'No (value below ₹50L)'],
          ['TDS to deduct (1%)', inr(tds)],
          ['Net payable to seller', inr(val-tds)],
        ];
      }
    },
    gst:{
      title:'GST Calculator', sub:'Under-construction vs ready-to-move.',
      fields:[
        {id:'value', label:'Property value (₹)', type:'number', ph:'5000000'},
        {id:'type', label:'Property type', type:'select', options:[['ready','Ready to move / completed (no GST)'],['affordable','Under-construction — affordable housing (1%)'],['nonaffordable','Under-construction — other (5%)']]},
      ],
      calc:(v)=>{
        const val=num(v.value);
        const rateMap = {ready:0, affordable:0.01, nonaffordable:0.05};
        const rate = rateMap[v.type] ?? 0;
        return [
          ['GST rate applied', (rate*100).toFixed(0)+'%'],
          ['GST amount', inr(val*rate)],
          ['Total with GST', inr(val*(1+rate))],
        ];
      }
    },
    costSheet:{
      title:'Cost Sheet Builder', sub:'The true all-in cost, beyond the sticker price.',
      fields:[
        {id:'base', label:'Base property price (₹)', type:'number', ph:'5000000'},
        {id:'stampPct', label:'Stamp duty (%)', type:'number', ph:'5', step:'0.1'},
        {id:'regPct', label:'Registration (%)', type:'number', ph:'1', step:'0.1'},
        {id:'other', label:'Other charges — parking, deposit, etc. (₹)', type:'number', ph:'150000'},
      ],
      calc:(v)=>{
        const base=num(v.base), stamp=base*num(v.stampPct)/100, reg=base*num(v.regPct)/100, other=num(v.other);
        const total = base+stamp+reg+other;
        return [
          ['Stamp duty', inr(stamp)],
          ['Registration', inr(reg)],
          ['Other charges', inr(other)],
          ['Total all-in cost', inr(total)],
        ];
      }
    },
    stampDuty:{
      title:'Stamp Duty', sub:'Approximate state-wise duty + registration.',
      fields:[
        {id:'value', label:'Property value (₹)', type:'number', ph:'5000000'},
        {id:'state', label:'State', type:'select', options:[['hr','Haryana (6% + 1% reg.)'],['up','Uttar Pradesh (7% + 1% reg.)'],['ka','Karnataka (5% + 1% reg.)'],['mh','Maharashtra (6% + 1% reg.)'],['dl','Delhi (6% + 1% reg.)'],['tn','Tamil Nadu (7% + 1% reg.)']]},
      ],
      calc:(v)=>{
        const rates = {hr:0.06, up:0.07, ka:0.05, mh:0.06, dl:0.06, tn:0.07};
        const val=num(v.value), duty=val*(rates[v.state]||0.06), reg=val*0.01;
        return [
          ['Stamp duty', inr(duty)],
          ['Registration fee (~1%)', inr(reg)],
          ['Total payable', inr(duty+reg)],
        ];
      }
    },
    capitalGains:{
      title:'Capital Gains', sub:'LTCG estimate, with and without indexation.',
      fields:[
        {id:'buy', label:'Purchase price (₹)', type:'number', ph:'4000000'},
        {id:'sale', label:'Sale price (₹)', type:'number', ph:'5500000'},
        {id:'ciiBuy', label:'Cost Inflation Index — purchase year', type:'number', ph:'317'},
        {id:'ciiSale', label:'Cost Inflation Index — sale year', type:'number', ph:'363'},
      ],
      calc:(v)=>{
        const buy=num(v.buy), sale=num(v.sale), ciiB=num(v.ciiBuy)||1, ciiS=num(v.ciiSale)||1;
        const indexedCost = buy*(ciiS/ciiB);
        const gainNoIndex = sale-buy;
        const gainIndexed = sale-indexedCost;
        return [
          ['Indexed purchase cost', inr(indexedCost)],
          ['LTCG without indexation (12.5%)', inr(Math.max(gainNoIndex,0))],
          ['LTCG with indexation (20%)', inr(Math.max(gainIndexed,0))],
        ];
      }
    },
  };

  const modal = document.getElementById('toolModal');
  const card = document.getElementById('toolModalCard');
  const veil = document.getElementById('toolModalVeil');
  if(!modal) return;

  function openTool(key){
    const t = tools[key];
    if(!t) return;
    const fieldsHtml = t.fields.map(f=>{
      if(f.type==='select'){
        return `<div class="tf-field"><label>${f.label}</label><select id="tf_${f.id}">${f.options.map(o=>`<option value="${o[0]}">${o[1]}</option>`).join('')}</select></div>`;
      }
      return `<div class="tf-field"><label>${f.label}</label><input id="tf_${f.id}" type="${f.type}" placeholder="${f.ph||''}" ${f.step?`step="${f.step}"`:''}></div>`;
    }).join('');
    card.innerHTML = `
      <button class="tool-modal-close" id="tmClose">✕</button>
      <h3>${t.title}</h3>
      <div class="sub">${t.sub}</div>
      <div id="tmFields">${fieldsHtml}</div>
      <button class="btn tf-calc-btn" id="tmCalc">Calculate</button>
      <div class="tf-result" id="tmResult"></div>
      <p class="tf-note">Estimates only — for exact figures, consult your bank or a tax professional. Formulas use standard simplified assumptions.</p>
    `;
    modal.classList.add('open');
    document.getElementById('tmClose').addEventListener('click', closeTool);
    document.getElementById('tmCalc').addEventListener('click', ()=>{
      const values = {};
      t.fields.forEach(f=> values[f.id] = document.getElementById('tf_'+f.id).value);
      const rows = t.calc(values);
      const resultEl = document.getElementById('tmResult');
      resultEl.innerHTML = rows.map(r=>`<div class="r-row"><span>${r[0]}</span><span class="v">${r[1]}</span></div>`).join('');
      resultEl.classList.add('show');
    });
  }
  function closeTool(){ modal.classList.remove('open'); }
  veil.addEventListener('click', closeTool);

  document.querySelectorAll('.tool-card').forEach(btn=>{
    btn.addEventListener('click', ()=> openTool(btn.dataset.tool));
  });
}

// ---------------- CONTACT FORM ----------------
function initFaq(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', ()=>{
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el=> el.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });
}

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
