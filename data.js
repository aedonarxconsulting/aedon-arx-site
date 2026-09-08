// Aedon Arx Consulting — shared property dataset
// NOTE: project names, locations & price brackets researched from public listings on
// 99acres / MagicBricks / Housing.com / Square Yards (Gurugram, Noida, Faridabad, Tiruppur — 2026).
// These are REAL developer/builder project names (DLF, Emaar, Supertech, etc.) shown here as
// realistic examples of what a consultant/agent can broker — confirm actual empanelment/mandate
// with each builder before publishing live, and swap stock photos + brochure PDFs for real ones.
const PROPERTIES = [
  {
    id: 'dlf-the-skycourt',
    name: 'DLF The Skycourt',
    type: 'Residential',
    location: 'Gurugram',
    bedrooms: 3,
    price: 22000000, // ~2.2 Cr
    priceLabel: '₹2.2 Cr',
    area: '1929 sq ft',
    img: 'https://images.unsplash.com/photo-1760235674447-fe0cc115b697?auto=format&fit=crop&w=900&q=80',
    desc: 'A premium high-rise 3 BHK residence in Sector 86, Gurugram, close to the Dwarka Expressway.',
    brochure: 'brochures/dlf-the-skycourt.pdf',
  has3D: true
  },
  {
    id: 'emaar-serenity-hills',
    name: 'Emaar Serenity Hills',
    type: 'Residential',
    location: 'Gurugram',
    bedrooms: 3,
    price: 21000000, // ~2.1 Cr
    priceLabel: '₹2.1 Cr',
    area: '1850 sq ft',
    img: 'https://images.unsplash.com/photo-1759162788764-f40075c8857f?auto=format&fit=crop&w=900&q=80',
    desc: 'A new-launch residential development in Sector 86, Gurugram, with RERA registration in place.',
    brochure: 'brochures/emaar-serenity-hills.pdf',
  has3D: true
  },
  {
    id: 'vatika-business-park-sector-89',
    name: 'Vatika Business Park',
    type: 'Commercial',
    location: 'Gurugram',
    bedrooms: null,
    price: 16000000, // 1.6 Cr
    priceLabel: '₹1.6 Cr',
    area: '1500 sq ft office',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    desc: 'Fitted office space in Sector 89, Gurugram\'s emerging commercial and business-park corridor.',
    brochure: 'brochures/vatika-business-park-sector-89.pdf',
  has3D: true
  },
  {
    id: 'supertech-romano',
    name: 'Supertech Romano',
    type: 'Residential',
    location: 'Noida',
    bedrooms: 2,
    price: 5500000, // 55 Lakh
    priceLabel: '₹55 Lakh',
    area: '1170 sq ft',
    img: 'https://images.unsplash.com/photo-1758193431351-68538bf55ec3?auto=format&fit=crop&w=900&q=80',
    desc: 'A 2 BHK apartment in Sector 118, Noida, close to the Noida Authority Sports Complex.',
    brochure: 'brochures/supertech-romano.pdf',
  has3D: true
  },
  {
    id: 'jm-aroma',
    name: 'JM Aroma',
    type: 'Residential',
    location: 'Noida',
    bedrooms: 3,
    price: 5800000, // 58 Lakh
    priceLabel: '₹58 Lakh',
    area: '1350 sq ft',
    img: 'https://images.unsplash.com/photo-1757125505346-2d71c70e6003?auto=format&fit=crop&w=900&q=80',
    desc: 'A spacious 3 BHK residence in Sector 75, Noida, surrounded by established neighbourhoods.',
    brochure: 'brochures/jm-aroma.pdf',
  has3D: true
  },
  {
    id: 'panchsheel-greens',
    name: 'Panchsheel Greens',
    type: 'Residential',
    location: 'Noida',
    bedrooms: 2,
    price: 4500000, // 45 Lakh
    priceLabel: '₹45 Lakh',
    area: '950 sq ft',
    img: 'https://images.unsplash.com/photo-1760235674447-fe0cc115b697?auto=format&fit=crop&w=900&q=80',
    desc: 'An affordable 2 BHK apartment in Noida Extension, from an established developer.',
    brochure: 'brochures/panchsheel-greens.pdf',
  has3D: true
  },
  {
    id: 'amolik-heights',
    name: 'Amolik Heights',
    type: 'Residential',
    location: 'Faridabad',
    bedrooms: 3,
    price: 6500000, // 65 Lakh
    priceLabel: '₹65 Lakh',
    area: '1400 sq ft',
    img: 'https://images.unsplash.com/photo-1759162788764-f40075c8857f?auto=format&fit=crop&w=900&q=80',
    desc: 'A 3 BHK residential flat in Sector 88, Faridabad, part of the fast-growing Neharpar belt.',
    brochure: 'brochures/amolik-heights.pdf',
  has3D: true
  },
  {
    id: 'omaxe-world-street',
    name: 'Omaxe World Street',
    type: 'Commercial',
    location: 'Faridabad',
    bedrooms: null,
    price: 11000000, // 1.1 Cr
    priceLabel: '₹1.1 Cr',
    area: '600 sq ft retail',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    desc: 'A retail shop in Sector 79, Faridabad, part of a mixed residential-and-commercial development.',
    brochure: 'brochures/omaxe-world-street.pdf',
  has3D: true
  },
  {
    id: 'tiruppur-pn-road-warehouse',
    name: 'PN Road Warehouse',
    type: 'Commercial',
    location: 'Tiruppur',
    bedrooms: null,
    price: 12500000, // 1.25 Cr
    priceLabel: '₹1.25 Cr',
    area: '9000 sq ft warehouse',
    img: 'https://images.unsplash.com/photo-1553413077-190983b508fa?auto=format&fit=crop&w=900&q=80',
    desc: 'A large warehouse on PN Road, Tiruppur, in the heart of the city\'s textile export hub.',
    brochure: 'brochures/tiruppur-pn-road-warehouse.pdf',
  has3D: true
  },
  {
    id: 'chettipalayam-godown',
    name: 'Chettipalayam Godown',
    type: 'Commercial',
    location: 'Tiruppur',
    bedrooms: null,
    price: 3500000, // 35 Lakh
    priceLabel: '₹35 Lakh',
    area: '2400 sq ft godown',
    img: 'https://images.unsplash.com/photo-1553413077-190983b508fa?auto=format&fit=crop&w=900&q=80',
    desc: 'A compact, ready-to-move godown in Chettipalayam, Tiruppur — suited for storage or small units.',
    brochure: 'brochures/chettipalayam-godown.pdf',
  has3D: true
  }
];

const COMPANY_BROCHURE = 'brochures/aedon-arx-consulting-company-profile.pdf';

// Basic scoring-based matcher used by both the Ask AI form and the chat
function matchProperties({ location, type, minBudget, maxBudget, bedrooms } = {}) {
  return PROPERTIES
    .map(p => {
      let score = 0;
      if (location && location !== 'Any') score += (p.location === location) ? 3 : 0;
      if (type && type !== 'Any') score += (p.type === type) ? 3 : 0;
      if (minBudget != null && maxBudget != null) {
        if (p.price >= minBudget && p.price <= maxBudget) score += 3;
        else score -= Math.min(2, Math.abs(p.price - ((minBudget+maxBudget)/2)) / 5000000);
      }
      if (bedrooms && p.bedrooms) score += (p.bedrooms === bedrooms) ? 2 : (Math.abs(p.bedrooms-bedrooms)===1 ? 1 : 0);
      return { p, score };
    })
    .sort((a,b) => b.score - a.score)
    .slice(0, 3)
    .map(r => r.p);
}

// Very simple free-text parser for the chat widget / Ask AI chat
function parseTextToFilters(text) {
  const t = text.toLowerCase();
  const filters = {};
  ['gurugram','gurgaon','noida','faridabad','tiruppur'].forEach(loc=>{
    if (t.includes(loc)) filters.location = (loc==='gurgaon' ? 'Gurugram' : loc.charAt(0).toUpperCase()+loc.slice(1));
  });
  if (t.includes('commercial') || t.includes('office') || t.includes('shop') || t.includes('warehouse') || t.includes('godown')) filters.type = 'Commercial';
  if (t.includes('residential') || t.includes('flat') || t.includes('villa') || t.includes('apartment') || t.includes('bhk') || t.includes('home')) filters.type = 'Residential';
  const bhkMatch = t.match(/(\d)\s*bhk/);
  if (bhkMatch) filters.bedrooms = parseInt(bhkMatch[1], 10);
  const crMatch = t.match(/(\d+(\.\d+)?)\s*cr/);
  const lakhMatch = t.match(/(\d+(\.\d+)?)\s*lakh/);
  if (crMatch) {
    const val = parseFloat(crMatch[1]) * 10000000;
    filters.minBudget = val * 0.75; filters.maxBudget = val * 1.25;
  } else if (lakhMatch) {
    const val = parseFloat(lakhMatch[1]) * 100000;
    filters.minBudget = val * 0.75; filters.maxBudget = val * 1.25;
  } else {
    filters.minBudget = 0; filters.maxBudget = 100000000;
  }
  return filters;
}

// ---------------------------------------------------------------------------
// AI ASSISTANT
// ---------------------------------------------------------------------------
// ⚠️ IMPORTANT — read this before deploying:
// The earlier version of this file called OpenAI directly from the browser with
// an API key pasted into the JS. That is why "Ask AI" was not answering:
//   1) OpenAI's API does not allow direct browser calls (no CORS headers), so
//      that fetch() fails in every browser regardless of the key.
//   2) Any key placed in client-side JS is visible to every visitor via
//      "view source" / dev tools — it WILL get scraped and abused. If that was
//      a real key, go rotate/revoke it in your OpenAI dashboard right now.
// A real GPT-powered chat needs a small backend (a serverless function, e.g.
// Firebase/Cloudflare Worker/Vercel function) that holds the key server-side
// and that the browser calls instead of OpenAI directly. Ask me for that
// backend function whenever you're ready to add it.
//
// Until then, this file gives you a fully working, no-backend-needed local
// assistant. It uses the same property matching + text parsing already in
// this file, so it always answers instantly and never breaks.
// ---------------------------------------------------------------------------

// Optional: once you have a backend proxy, set this to its URL and set
// USE_BACKEND_AI = true. The browser will then POST { message, history } to it
// and expect back { reply: "..." }. Leave USE_BACKEND_AI = false to keep using
// the local assistant below.
const USE_BACKEND_AI = false;
const BACKEND_AI_URL = 'https://your-backend.example.com/api/ask-ai';

function formatMatchesForReply(matches) {
  if (!matches.length) return '';
  return matches.map(p =>
    `• ${p.name} — ${p.location}, ${p.priceLabel}${p.bedrooms ? ' • ' + p.bedrooms + ' BHK' : ''}${p.has3D ? ' • 3D walkthrough available' : ''}`
  ).join('\n');
}

// Small pools of natural-sounding openers so replies don't feel like the
// same template firing every time. Mix of English and Hinglish, since a lot
// of enquiries come in Hinglish.
const GREETINGS = ['hi','hii','hiii','hello','hey','namaste','namaskar','good morning','good afternoon','good evening'];
const THANKS = ['thanks','thank you','thx','shukriya','dhanyavad'];

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function localAedonReply(userMessage) {
  const raw = (userMessage||'').trim();
  const t = raw.toLowerCase();

  // Casual openers — a plain "hi" shouldn't get a property dump back.
  if (GREETINGS.some(g => t === g || t.startsWith(g+' ') || t.startsWith(g+'!'))) {
    return pick([
      "Hi! Batao, kaisi property dhoondh rahe ho — location, budget aur BHK bata do, main abhi shortlist nikal deta hoon.",
      "Hello! Kya chahiye — residential ya commercial, kis city mein? Budget bhi bata dena, jaldi match dhoondh deta hoon.",
      "Hey there — tell me the city, budget and BHK you have in mind, and I'll pull up what fits."
    ]);
  }
  if (THANKS.some(g => t.includes(g))) {
    return pick([
      "Bilkul, koi baat nahi! Aur kuch dekhna ho ya consultant se baat karni ho, bata dena — +91 99539 13605 pe bhi call kar sakte ho.",
      "Welcome! Kabhi bhi aur properties dekhni ho toh yahin puchh lena."
    ]);
  }

  // These are exact quick-reply button labels (and close variants of what
  // someone might type themselves) — they were previously falling straight
  // through to the generic "tell me more" reply below, which ignored what
  // was actually asked and felt like a bot that wasn't listening.
  if (/talk to a? ?consultant|talk to (a )?human|real person|baat kar|consultant se baat|call.*consultant/.test(t)) {
    return pick([
      "Bilkul — call kar do +91 99539 13605 pe, ya Contact page se apna number chhod do, ek consultant khud call karega. Kis property/area ke baare mein baat karni thi, bata doge toh call aur productive hogi.",
      "Sure — you can call +91 99539 13605 directly, or leave your number on the Contact page and a consultant will call you back. Tell me which property or area this is about and I'll pass it along."
    ]);
  }
  if (/what areas|which (cit(y|ies)|areas)|areas do you (serve|cover)|kaunse? (shehar|area|city)|kahan kahan/.test(t)) {
    return "Abhi hum Gurugram, Noida, Faridabad aur Tiruppur mein active hain — residential aur commercial, dono. Inme se kisi city ka naam bata do, options dikhata hoon.";
  }
  if (/^show me properties$|^show properties$|^properties$|sabhi properties|all properties|kya kya hai/.test(t)) {
    const top = PROPERTIES.slice(0, 4);
    return `Abhi yeh kuch options hain:\n${formatMatchesForReply(top)}\n\nKisi specific city, budget ya BHK ke hisaab se dekhna ho toh bata do, narrow kar deta hoon.`;
  }

  // "I can't speak/understand English" (or the Hindi equivalent) is a
  // direct, specific ask — it was previously falling through to the generic
  // filter-less reply, which is in Hindi anyway but ignores what was said.
  if (/can'?t speak english|do not speak english|don'?t speak english|no english|english nahi|angrezi nahi/.test(t)) {
    return "Koi baat nahi, Hindi mein hi baat karte hain. Bas itna bata do — kaunsa area, budget kitna, aur agar ghar chahiye toh kitne BHK. Jaise \"Noida mein 3 BHK, 1 crore tak\" — turant options dikha deta hoon.";
  }

  const filters = parseTextToFilters(raw);
  const hasAnyFilter = filters.location || filters.type || filters.bedrooms || (filters.maxBudget && filters.maxBudget < 100000000);
  const matches = matchProperties(filters);

  if (!hasAnyFilter) {
    return pick([
      "Thoda aur bata do — kaunsa area, kitna budget, aur agar residential hai toh kitne BHK? Jaise \"3 BHK Noida under 1 Cr\" ya \"Tiruppur mein warehouse\" — usi hisaab se best options dikhata hoon. Direct baat karni ho toh +91 99539 13605 pe call bhi kar sakte ho.",
      "Tell me a bit more — location, rough budget, and BHK if it's residential. For example \"3 BHK in Noida under 1 Cr\" or \"commercial space in Tiruppur\". Or just call +91 99539 13605 anytime."
    ]);
  }
  if (!matches.length) {
    return pick([
      "Abhi isse exact match kuch nahi mil raha. Budget ya location thoda flexible kar do, ya phir +91 99539 13605 pe call kar do — consultant naye/upcoming listings bhi check kar dega.",
      "Nothing lines up exactly right now — try widening the budget or location a little, or call +91 99539 13605 and we'll check upcoming listings too."
    ]);
  }
  const bits = [];
  if (filters.location) bits.push(filters.location);
  if (filters.type) bits.push(filters.type.toLowerCase());
  if (filters.bedrooms) bits.push(filters.bedrooms + ' BHK');
  const introPool = bits.length ? [
    `${bits.join(', ')} mein yeh best fit lag rahe hain:`,
    `Here's what fits ${bits.join(', ')} best:`,
  ] : [
    "Yeh kuch options hain jo dekhne laayak hain:",
    "Here's what looks like a good fit:",
  ];
  const closingPool = [
    "Kisi ka brochure chahiye ya consultant se call karwau?",
    "Want the brochure for any of these, or should a consultant call you?",
    "Inme se kisi ka 3D walkthrough dekhna ho ya call karwana ho, bata dena."
  ];
  return `${pick(introPool)}\n${formatMatchesForReply(matches)}\n\n${pick(closingPool)}`;
}

async function askAedonAI(userMessage, history = []) {
  if (USE_BACKEND_AI) {
    try {
      const res = await fetch(BACKEND_AI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });
      const data = await res.json();
      if (data && data.reply) return data.reply;
    } catch (e) {
      // fall through to local assistant so the widget still answers
    }
  }
  // Local, no-backend assistant — always answers, no network call needed.
  return localAedonReply(userMessage);
}
