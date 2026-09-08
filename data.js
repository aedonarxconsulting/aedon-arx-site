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
    img: 'https://images.unsplash.com/photo-1757970326337-95d7cca56fa1?auto=format&fit=crop&w=900&q=80',
    desc: 'A premium high-rise 3 BHK residence in Sector 86, Gurugram, close to the Dwarka Expressway.',
    brochure: 'https://aedonarxconsulting.com/brochures/dlf-the-skycourt.pdf',
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
    img: 'https://images.unsplash.com/photo-1768638687896-35bde623d532?auto=format&fit=crop&w=900&q=80',
    desc: 'A new-launch residential development in Sector 86, Gurugram, with RERA registration in place.',
    brochure: 'https://aedonarxconsulting.com/brochures/emaar-serenity-hills.pdf',
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
    brochure: 'https://aedonarxconsulting.com/brochures/vatika-business-park-sector-89.pdf',
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
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
    desc: 'A 2 BHK apartment in Sector 118, Noida, close to the Noida Authority Sports Complex.',
    brochure: 'https://aedonarxconsulting.com/brochures/supertech-romano.pdf',
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
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    desc: 'A spacious 3 BHK residence in Sector 75, Noida, surrounded by established neighbourhoods.',
    brochure: 'https://aedonarxconsulting.com/brochures/jm-aroma.pdf',
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
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    desc: 'An affordable 2 BHK apartment in Noida Extension, from an established developer.',
    brochure: 'https://aedonarxconsulting.com/brochures/panchsheel-greens.pdf',
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
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
    desc: 'A 3 BHK residential flat in Sector 88, Faridabad, part of the fast-growing Neharpar belt.',
    brochure: 'https://aedonarxconsulting.com/brochures/amolik-heights.pdf',
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
    brochure: 'https://aedonarxconsulting.com/brochures/omaxe-world-street.pdf',
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
    brochure: 'https://aedonarxconsulting.com/brochures/tiruppur-pn-road-warehouse.pdf',
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
    brochure: 'https://aedonarxconsulting.com/brochures/chettipalayam-godown.pdf',
  has3D: true
  }
];

const COMPANY_BROCHURE = 'https://aedonarxconsulting.com/brochures/aedon-arx-consulting-company-profile.pdf';

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
// GPT-powered assistant (direct-from-browser call — see security note below)
// ---------------------------------------------------------------------------
// ⚠️ SECURITY NOTE: this key is embedded client-side, which means anyone who
// views page source / network tab can read and reuse it. This was a deliberate
// short-term choice for a quick demo. Before this site gets real traffic, move
// this call behind a backend (Firebase Cloud Function or similar) so the key
// never reaches the browser, and rotate this key once that's done.
const GPT_KEY = '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';

function propertyContextForAI() {
  return PROPERTIES.map(p =>
    `- ${p.name} | ${p.type} | ${p.location} | ${p.bedrooms ? p.bedrooms+' BHK' : p.area} | ${p.priceLabel} | ${p.has3D ? '3D walkthrough available' : ''} | Brochure: ${p.brochure}`
  ).join('\n');
}

const AI_SYSTEM_PROMPT = `You are the AI assistant for Aedon Arx Consulting, a registered real estate consultant/agent based in Sector 86, Gurugram, India ("We Value Relationship"). You help clients find residential and commercial properties across Gurugram, Noida, Faridabad and Tiruppur.

Here is the current property inventory — recommend ONLY from this list, never invent properties:
${propertyContextForAI()}

Rules:
- When a client describes what they want (location, budget, type, bedrooms), recommend the 1-3 best matches with price, location and the brochure link.
- If a property has a 3D walkthrough available, mention that.
- If nothing matches well, say so honestly and suggest they call +91 99539 13605 or use the Contact page.
- Keep replies short (under 80 words), warm and conversational. Reply in the same language/style the user writes in (English or Hinglish).
- Don't discuss anything unrelated to Aedon Arx's real estate services.`;

async function askAedonAI(userMessage, history = []) {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GPT_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: AI_SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: userMessage }
        ],
        max_tokens: 220,
        temperature: 0.6
      })
    });
    const data = await res.json();
    if(!res.ok){
      console.error('OpenAI API error:', res.status, data);
      const reason = data?.error?.message || `HTTP ${res.status}`;
      return `AI couldn't respond right now (${reason}). Please call +91 99539 13605 or use the Contact page.`;
    }
    return data.choices?.[0]?.message?.content || "Sorry, I couldn't process that — please try again or call +91 99539 13605.";
  } catch (e) {
    console.error('AI fetch failed:', e);
    return "AI is temporarily unavailable (network/connection issue) — please call +91 99539 13605 or use the Contact page.";
  }
}
