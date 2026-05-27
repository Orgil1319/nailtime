/* ════════════════════════════════════════════════════════
   app.js — Nail Art UB
   FastAPI + MySQL + Google Maps ready
   ════════════════════════════════════════════════════════ */

const CONFIG = {
  API_BASE:        'http://localhost:8000',
  GOOGLE_MAPS_KEY: 'YOUR_API_KEY',
  MOCK_MODE:       true,
  MOCK_DELAY_MS:   500,
};

/* ════════════════════════════════════════════════════════
   MOCK DATA — 9 salons, each with 3 images
   ════════════════════════════════════════════════════════ */
const IMG = {
  a: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=80',
  b: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=700&q=80',
  c: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80',
  d: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80',
  e: 'https://images.unsplash.com/photo-1610992015732-2449b0e2b9b4?w=700&q=80',
};

const MOCK_SALONS = [
  {
    id:1, name:'Altan Nail Studio', district:'Sukhbaatar',
    lat:47.9184, lng:106.9177, rating:4.9, review_count:312,
    badge:'Top Rated', tags:['Gel','Nail Art','Extensions'],
    category: ['recommended','trending'],
    address:'Seoul Street 15, Sukhbaatar', phone:'+976 9911 2233',
    hours:'Mon–Sat 10:00–20:00', price_from:25000, price_currency:'₮',
    images:[IMG.a, IMG.b, IMG.c],
    services:[
      {name:'Classic Manicure',price:18000},{name:'Gel Manicure',price:28000},
      {name:'Nail Art (per nail)',price:3000},{name:'Full Extensions',price:65000},
      {name:'Pedicure',price:22000},{name:'Paraffin Treatment',price:15000},
    ],
    reviews:[
      {id:1,user:'Bolormaa',stars:5,date:'May 2025',text:'Absolutely stunning work! The gel set lasted over 3 weeks without chipping.'},
      {id:2,user:'Narantsetseg',stars:5,date:'Apr 2025',text:'Best nail art in UB. Staff is professional and the studio is gorgeous.'},
    ],
  },
  {
    id:2, name:'Oyun Beauty Lounge', district:'Khan-Uul',
    lat:47.8951, lng:106.9012, rating:4.8, review_count:198,
    tags:['Manicure','Pedicure','Nail Art'],
    category: ['recommended','new'],
    address:'Chinggis Avenue 44B, Khan-Uul', phone:'+976 9922 4455',
    hours:'Mon–Sun 09:00–21:00', price_from:20000, price_currency:'₮',
    images:[IMG.b, IMG.c, IMG.d],
    services:[
      {name:'Classic Manicure',price:20000},{name:'French Manicure',price:25000},
      {name:'Gel Polish',price:30000},{name:'Pedicure',price:25000},
      {name:'Nail Design',price:35000},{name:'Hand Spa',price:18000},
    ],
    reviews:[
      {id:3,user:'Enkhjargal',stars:5,date:'May 2025',text:'Lovely atmosphere, very clean and relaxing. My pedicure was perfect.'},
      {id:4,user:'Dulam',stars:4,date:'Mar 2025',text:'Good service, slightly long wait but worth it for the quality.'},
    ],
  },
  {
    id:3, name:'Luxe Nails UB', district:'Bayangol',
    lat:47.9050, lng:106.8850, rating:4.7, review_count:245,
    badge:'Premium', tags:['Extensions','Gel','Nail Art'],
    category: ['recommended','trending'],
    address:'Zaisan Road 7, Bayangol', phone:'+976 9933 6677',
    hours:'Tue–Sun 10:00–19:00', price_from:30000, price_currency:'₮',
    images:[IMG.c, IMG.a, IMG.e],
    services:[
      {name:'Luxury Manicure',price:35000},{name:'Acrylic Extensions',price:75000},
      {name:'Gel-X Set',price:70000},{name:'3D Nail Art',price:8000},
      {name:'Spa Pedicure',price:40000},{name:'Nail Removal',price:15000},
    ],
    reviews:[{id:5,user:'Tsetseg',stars:5,date:'May 2025',text:'The 3D nail art here is unreal. Worth every tögrög.'}],
  },
  {
    id:4, name:'Narantsetseg Nails', district:'Chingeltei',
    lat:47.9280, lng:106.9370, rating:4.6, review_count:167,
    tags:['Manicure','Gel','Pedicure'],
    category: ['new','trending'],
    address:'Enkhtaivan Ave 22, Chingeltei', phone:'+976 9944 8899',
    hours:'Mon–Sat 09:30–19:30', price_from:15000, price_currency:'₮',
    images:[IMG.c, IMG.d, IMG.b],
    services:[
      {name:'Basic Manicure',price:15000},{name:'Gel Manicure',price:25000},
      {name:'Express Pedicure',price:18000},{name:'Full Pedicure',price:28000},
      {name:'Nail Art',price:25000},{name:'Cuticle Care',price:8000},
    ],
    reviews:[{id:6,user:'Solongo',stars:4,date:'Apr 2025',text:'Great neighbourhood salon, friendly staff and fair prices.'}],
  },
  {
    id:5, name:'Diamond Nail Bar', district:'Sukhbaatar',
    lat:47.9200, lng:106.9250, rating:4.8, review_count:289,
    badge:'New', tags:['Gel','Extensions','Nail Art'],
    category: ['new','trending'],
    address:'Peace Avenue 55, Sukhbaatar', phone:'+976 9955 1122',
    hours:'Mon–Sun 10:00–21:00', price_from:22000, price_currency:'₮',
    images:[IMG.d, IMG.a, IMG.c],
    services:[
      {name:'Gel Manicure',price:22000},{name:'Nail Extensions',price:60000},
      {name:'Ombre Nails',price:45000},{name:'Chrome Powder',price:5000},
      {name:'Nail Art Design',price:35000},{name:'Pedicure',price:20000},
    ],
    reviews:[{id:7,user:'Ariunaa',stars:5,date:'May 2025',text:'The ombre set is breathtaking. Everyone keeps asking who did my nails!'}],
  },
  {
    id:6, name:'Suvd Nail Studio', district:'Songinokhairkhan',
    lat:47.9380, lng:106.8580, rating:4.5, review_count:134,
    tags:['Manicure','Pedicure','Gel'],
    category: ['recommended'],
    address:'Tserendorj Street 8, Songinokhairkhan', phone:'+976 9966 3344',
    hours:'Mon–Fri 10:00–19:00', price_from:12000, price_currency:'₮',
    images:[IMG.e, IMG.b, IMG.d],
    services:[
      {name:'Classic Manicure',price:12000},{name:'Gel Polish',price:22000},
      {name:'Pedicure',price:18000},{name:'Nail Art',price:20000},
      {name:'Hand Mask',price:10000},{name:'Eyebrow Shaping',price:8000},
    ],
    reviews:[{id:8,user:'Gantulga',stars:4,date:'Mar 2025',text:'Affordable and consistent. My go-to for a quick gel refresh.'}],
  },
  {
    id:7, name:'Rose Petal Nails', district:'Bayanzurkh',
    lat:47.9100, lng:107.0050, rating:4.7, review_count:211,
    badge:'Popular', tags:['Manicure','Nail Art','Gel'],
    category: ['recommended','trending'],
    address:'Narnii Road 12, Bayanzurkh', phone:'+976 9977 5566',
    hours:'Mon–Sun 10:00–20:00', price_from:18000, price_currency:'₮',
    images:[IMG.b, IMG.e, IMG.a],
    services:[
      {name:'Classic Manicure',price:18000},{name:'Gel Manicure',price:26000},
      {name:'Floral Nail Art',price:40000},{name:'Pedicure',price:22000},
      {name:'Hand Paraffin',price:14000},{name:'Kids Manicure',price:10000},
    ],
    reviews:[{id:9,user:'Oyunbaatar',stars:5,date:'Apr 2025',text:'Their floral nail art is stunning, like a painting on your nails!'}],
  },
  {
    id:8, name:'Golden Touch Salon', district:'Khan-Uul',
    lat:47.8870, lng:106.8800, rating:4.6, review_count:178,
    tags:['Extensions','Gel','Pedicure'],
    category: ['new'],
    address:'Zaisan Hill Road 3, Khan-Uul', phone:'+976 9988 7744',
    hours:'Tue–Sun 11:00–20:00', price_from:24000, price_currency:'₮',
    images:[IMG.a, IMG.c, IMG.e],
    services:[
      {name:'Gel Manicure',price:24000},{name:'Hard Gel Extensions',price:68000},
      {name:'Infill',price:30000},{name:'Spa Pedicure',price:35000},
      {name:'Nail Art',price:30000},{name:'Removal',price:12000},
    ],
    reviews:[{id:10,user:'Uyanga',stars:4,date:'May 2025',text:'Very skilled technicians. The hard gel extensions are incredibly strong.'}],
  },
  {
    id:9, name:'Blossom Nail Art', district:'Bayangol',
    lat:47.9000, lng:106.8700, rating:4.9, review_count:322,
    badge:'Top Rated', tags:['Nail Art','Extensions','Gel'],
    category: ['recommended','new','trending'],
    address:'Ard Ayush Avenue 18, Bayangol', phone:'+976 9900 1133',
    hours:'Mon–Sat 09:00–20:30', price_from:20000, price_currency:'₮',
    images:[IMG.c, IMG.d, IMG.b],
    services:[
      {name:'Gel Manicure',price:20000},{name:'Nail Art Set',price:55000},
      {name:'Poly Gel Extensions',price:70000},{name:'Cat Eye Gel',price:32000},
      {name:'Pedicure',price:25000},{name:'Nail Repair',price:5000},
    ],
    reviews:[
      {id:11,user:'Mandakh',stars:5,date:'May 2025',text:'Best nail art studio in all of UB. The cat eye gel is mesmerising.'},
      {id:12,user:'Tsetsgee',stars:5,date:'Apr 2025',text:'Booked online, zero hassle. The poly gel set is flawless.'},
    ],
  },
];

/* ════════════════════════════════════════════════════════
   API LAYER
   ════════════════════════════════════════════════════════ */
const api = {
  async getSalons(params={}) {
    if (CONFIG.MOCK_MODE) {
      await delay(CONFIG.MOCK_DELAY_MS);
      let list = MOCK_SALONS;
      if (params.search)   list = list.filter(s =>
        s.name.toLowerCase().includes(params.search.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(params.search.toLowerCase())));
      if (params.district) list = list.filter(s => s.district === params.district);
      if (params.tag)      list = list.filter(s => s.tags.includes(params.tag));
      return list;
    }
    return apiFetch('/salons', params);
  },
  async getSalon(id) {
    if (CONFIG.MOCK_MODE) { await delay(200); return MOCK_SALONS.find(s => s.id === id); }
    return apiFetch(`/salons/${id}`);
  },
  async getReviews(salonId) {
    if (CONFIG.MOCK_MODE) {
      await delay(200);
      const base  = MOCK_SALONS.find(s => s.id === salonId)?.reviews || [];
      const local = storage.getReviews().filter(r => r.salon_id === salonId);
      return [...base, ...local];
    }
    return apiFetch(`/salons/${salonId}/reviews`, {}, {headers:authHeader()});
  },
  async postReview(payload) {
    if (CONFIG.MOCK_MODE) {
      await delay(400);
      const r = {...payload, id:Date.now(), user:currentUser.name, date:'May 2025'};
      storage.saveReview(r); return r;
    }
    return apiFetch('/reviews',{},{method:'POST',body:payload,headers:authHeader()});
  },
  async signup(payload) {
    if (CONFIG.MOCK_MODE) {
      await delay(600);
      if (!payload.email.includes('@')) throw new Error('И-мэйл хаяг буруу байна');
      return {token:'mock_jwt_'+Date.now(), user:{id:Date.now(),name:payload.name,email:payload.email}};
    }
    return apiFetch('/auth/signup',{},{method:'POST',body:payload});
  },
  async login(payload) {
    if (CONFIG.MOCK_MODE) {
      await delay(600);
      if (!payload.email.includes('@')) throw new Error('И-мэйл эсвэл нууц үг буруу');
      const name = payload.email.split('@')[0];
      return {token:'mock_jwt_'+Date.now(), user:{id:Date.now(),name,email:payload.email}};
    }
    return apiFetch('/auth/login',{},{method:'POST',body:payload});
  },
  async getBookings() {
    if (CONFIG.MOCK_MODE) { await delay(300); return storage.getBookings(); }
    return apiFetch('/users/me/bookings',{},{headers:authHeader()});
  },
  async postBooking(payload) {
    if (CONFIG.MOCK_MODE) {
      await delay(500);
      const b = {...payload,id:Date.now(),status:'Confirmed'};
      storage.saveBooking(b); return b;
    }
    return apiFetch('/bookings',{},{method:'POST',body:payload,headers:authHeader()});
  },
  async cancelBooking(id) {
    if (CONFIG.MOCK_MODE) { await delay(300); storage.cancelBooking(id); return {success:true}; }
    return apiFetch(`/bookings/${id}`,{},{method:'DELETE',headers:authHeader()});
  },
};

async function apiFetch(path, params={}, opts={}) {
  const url = new URL(CONFIG.API_BASE + path);
  Object.entries(params).forEach(([k,v]) => v && url.searchParams.set(k,v));
  const res = await fetch(url.toString(), {
    ...opts,
    headers: {'Content-Type':'application/json',...(opts.headers||{})},
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||`Error ${res.status}`); }
  return res.json();
}
function authHeader() {
  const t = localStorage.getItem('nh_token');
  return t ? {Authorization:`Bearer ${t}`} : {};
}

/* ════════════════════════════════════════════════════════
   LOCAL STORAGE HELPERS
   ════════════════════════════════════════════════════════ */
const storage = {
  getBookings:  ()  => JSON.parse(localStorage.getItem('nh_bookings')||'[]'),
  getReviews:   ()  => JSON.parse(localStorage.getItem('nh_reviews') ||'[]'),
  saveBooking:  (b) => { const a=storage.getBookings(); a.push(b); localStorage.setItem('nh_bookings',JSON.stringify(a)); },
  saveReview:   (r) => { const a=storage.getReviews();  a.push(r); localStorage.setItem('nh_reviews', JSON.stringify(a)); },
  cancelBooking:(id)=> {
    const a=storage.getBookings().map(b=>b.id===id?{...b,status:'Cancelled'}:b);
    localStorage.setItem('nh_bookings',JSON.stringify(a));
  },
};

/* ════════════════════════════════════════════════════════
   APP STATE
   ════════════════════════════════════════════════════════ */
let currentUser    = JSON.parse(localStorage.getItem('nh_user')||'null');
let currentSalonId = null;
let activeTag      = '';
let authMode       = 'login';
let starRating     = 0;
let filterDebounce = null;
let googleMapInstance = null;

/* ════════════════════════════════════════════════════════
   CARD IMAGE SLIDER
   ════════════════════════════════════════════════════════ */
const cardSlideIdx    = {};
const cardAutoTimers  = {};

function buildCardSlider(s) {
  const imgs = s.images.map((img,i) => `
    <img src="${img}" alt="${s.name}" loading="lazy"
         class="slide-img${i===0?' active':''}">`).join('');
  const dots = s.images.map((_,i) => `
    <span class="dot${i===0?' active':''}"
          onclick="event.stopPropagation();cardGoTo(${s.id},${i})"></span>`).join('');
  const badge = s.badge ? `<div class="badge">${s.badge}</div>` : '';
  return `
    <div class="salon-card-img" id="cs-${s.id}">
      ${imgs}${badge}
      <button class="slide-btn prev" onclick="event.stopPropagation();cardSlide(${s.id},-1)">&#8249;</button>
      <button class="slide-btn next" onclick="event.stopPropagation();cardSlide(${s.id}, 1)">&#8250;</button>
      <div class="slide-dots">${dots}</div>
    </div>`;
}

function cardSlide(id, dir) {
  const el   = document.getElementById('cs-'+id);
  if (!el) return;
  const imgs = el.querySelectorAll('.slide-img');
  const dots = el.querySelectorAll('.dot');
  const n    = imgs.length;
  let idx    = cardSlideIdx[id] ?? 0;
  imgs[idx].classList.remove('active');
  dots[idx]?.classList.remove('active');
  idx = (idx + dir + n) % n;
  imgs[idx].classList.add('active');
  dots[idx]?.classList.add('active');
  cardSlideIdx[id] = idx;
}

function cardGoTo(id, idx) {
  const el   = document.getElementById('cs-'+id);
  if (!el) return;
  const imgs = el.querySelectorAll('.slide-img');
  const dots = el.querySelectorAll('.dot');
  const cur  = cardSlideIdx[id] ?? 0;
  imgs[cur].classList.remove('active');
  dots[cur]?.classList.remove('active');
  imgs[idx].classList.add('active');
  dots[idx]?.classList.add('active');
  cardSlideIdx[id] = idx;
}

function startCardAuto(id) {
  stopCardAuto(id);
  cardAutoTimers[id] = setInterval(() => cardSlide(id, 1), 3000);
}
function stopCardAuto(id) { clearInterval(cardAutoTimers[id]); }

const isMobile = () => window.matchMedia('(hover:none)').matches;

/* ════════════════════════════════════════════════════════
   MODAL IMAGE SLIDER
   ════════════════════════════════════════════════════════ */
let modalSlideIdx = 0;

function buildModalSlider(s) {
  const imgs = s.images.map((img,i) => `
    <img src="${img}" alt="${s.name}"
         class="slide-img${i===0?' active':''}">`).join('');
  const dots = s.images.map((_,i) => `
    <span class="dot${i===0?' active':''}"
          onclick="modalGoTo(${i})"></span>`).join('');
  document.getElementById('modalSlider').innerHTML = `
    ${imgs}
    <button class="slide-btn prev" onclick="modalSlide(-1)">&#8249;</button>
    <button class="slide-btn next" onclick="modalSlide( 1)">&#8250;</button>
    <div class="slide-dots">${dots}</div>`;
  modalSlideIdx = 0;
}

function modalSlide(dir) {
  const el   = document.getElementById('modalSlider');
  const imgs = el.querySelectorAll('.slide-img');
  const dots = el.querySelectorAll('.dot');
  const n    = imgs.length;
  imgs[modalSlideIdx].classList.remove('active');
  dots[modalSlideIdx]?.classList.remove('active');
  modalSlideIdx = (modalSlideIdx + dir + n) % n;
  imgs[modalSlideIdx].classList.add('active');
  dots[modalSlideIdx]?.classList.add('active');
}

function modalGoTo(idx) {
  const el   = document.getElementById('modalSlider');
  const imgs = el.querySelectorAll('.slide-img');
  const dots = el.querySelectorAll('.dot');
  imgs[modalSlideIdx].classList.remove('active');
  dots[modalSlideIdx]?.classList.remove('active');
  modalSlideIdx = idx;
  imgs[idx].classList.add('active');
  dots[idx]?.classList.add('active');
}

/* ════════════════════════════════════════════════════════
   HORIZONTAL ROW SLIDER
   ════════════════════════════════════════════════════════ */
const rowIdx = { recommended:0, new:0, trending:0 };
const rowAutoTimers = {};

function getCardWidth() {
  const track = document.querySelector('.cards-track');
  if (!track) return 310;
  const card = track.querySelector('.salon-card');
  if (!card) return 310;
  return card.offsetWidth + 2; // +2 for gap
}

function slideRow(rowId, dir) {
  const track = document.getElementById('track-' + rowId);
  if (!track) return;
  const cards = track.querySelectorAll('.salon-card');
  const total = cards.length;
  if (!total) return;
  const visibleCount = Math.max(1, Math.floor(track.parentElement.offsetWidth / getCardWidth()));
  const maxIdx = Math.max(0, total - visibleCount);
  rowIdx[rowId] = Math.min(Math.max(rowIdx[rowId] + dir, 0), maxIdx);
  track.style.transform = `translateX(-${rowIdx[rowId] * getCardWidth()}px)`;
}

function startRowAuto(rowId) {
  stopRowAuto(rowId);
  rowAutoTimers[rowId] = setInterval(() => {
    const track = document.getElementById('track-' + rowId);
    if (!track) return;
    const cards = track.querySelectorAll('.salon-card');
    const total = cards.length;
    const visibleCount = Math.max(1, Math.floor(track.parentElement.offsetWidth / getCardWidth()));
    const maxIdx = Math.max(0, total - visibleCount);
    if (rowIdx[rowId] >= maxIdx) rowIdx[rowId] = -1; // will become 0
    slideRow(rowId, 1);
  }, 3000);
}
function stopRowAuto(rowId) { clearInterval(rowAutoTimers[rowId]); }

/* ════════════════════════════════════════════════════════
   BUILD A SALON CARD
   ════════════════════════════════════════════════════════ */
function buildCard(s) {
  return `
    <div class="salon-card"
         onclick="openModal(${s.id})"
         onmouseenter="stopRowAuto('all');startCardAuto(${s.id})"
         onmouseleave="startRowAutoAll();stopCardAuto(${s.id})">
      ${buildCardSlider(s)}
      <div class="salon-card-body">
        <div class="salon-card-district">${s.district}</div>
        <h3>${s.name}</h3>
        <div class="salon-card-rating">
          <span class="stars">${'★'.repeat(Math.round(s.rating))}</span>
          <span class="rating-num">${s.rating} (${s.review_count} сэтгэгдэл)</span>
        </div>
        <div class="salon-card-tags">
          ${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="salon-card-meta">
          <div class="salon-card-price">₮${s.price_from.toLocaleString()}-өөс</div>
          <button class="book-btn" onclick="event.stopPropagation();openModal(${s.id})">Захиалах</button>
        </div>
      </div>
    </div>`;
}

function startRowAutoAll() {
  ['recommended','new','trending'].forEach(startRowAuto);
}

/* ════════════════════════════════════════════════════════
   RENDER ALL 3 ROWS
   ════════════════════════════════════════════════════════ */
async function loadAllRows(params={}) {
  try {
    const list = await api.getSalons(params);

    const rows = {
      recommended: list.filter(s => s.category.includes('recommended')),
      new:         list.filter(s => s.category.includes('new')),
      trending:    list.filter(s => s.category.includes('trending')),
    };

    ['recommended','new','trending'].forEach(rowId => {
      const track = document.getElementById('track-' + rowId);
      if (!track) return;
      rowIdx[rowId] = 0;
      track.style.transform = 'translateX(0)';
      if (!rows[rowId].length) {
        track.innerHTML = '<p style="color:var(--soft);padding:2rem;font-size:.85rem">Одоогоор хоосон байна.</p>';
        return;
      }
      track.innerHTML = rows[rowId].map(buildCard).join('');
    });

    document.getElementById('statSalons').textContent   = MOCK_SALONS.length + '+';
    document.getElementById('statServices').textContent = '200+';

    // start autoplay on mobile immediately, desktop on hover (row auto always runs)
    startRowAutoAll();
    if (isMobile()) MOCK_SALONS.forEach(s => startCardAuto(s.id));

  } catch(e) {
    console.error(e);
    showToast('Салонуудыг ачаалж чадсангүй', true);
  }
}

/* ════════════════════════════════════════════════════════
   SEARCH & FILTER
   ════════════════════════════════════════════════════════ */
function debounceFilter() {
  clearTimeout(filterDebounce);
  filterDebounce = setTimeout(applyFilters, 350);
}
function applyFilters() {
  loadAllRows({
    search:   document.getElementById('searchInput').value,
    district: document.getElementById('districtFilter').value,
    tag:      activeTag,
  });
}
function setChip(el, tag) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeTag = tag;
  applyFilters();
}

/* ════════════════════════════════════════════════════════
   SALON MODAL
   ════════════════════════════════════════════════════════ */
async function openModal(id) {
  currentSalonId = id;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  // reset tabs
  document.querySelectorAll('.modal-tab').forEach((t,i)   => t.classList.toggle('active',i===0));
  document.querySelectorAll('.modal-panel').forEach((p,i) => p.classList.toggle('active',i===0));

  const s = await api.getSalon(id);
  buildModalSlider(s);

  // start modal autoplay — always
  if (window._modalAuto) clearInterval(window._modalAuto);
  window._modalAuto = setInterval(() => modalSlide(1), 3000);

  document.getElementById('mDistrict').textContent = s.district;
  document.getElementById('mName').textContent     = s.name;
  document.getElementById('mInfo').innerHTML = `
    <div class="info-row"><strong>Хаяг</strong><span>${s.address}</span></div>
    <div class="info-row"><strong>Утас</strong><span>${s.phone}</span></div>
    <div class="info-row"><strong>Цаг</strong><span>${s.hours}</span></div>
    <div class="info-row"><strong>Үнэлгээ</strong><span>${s.rating} ★ (${s.review_count})</span></div>`;
  document.getElementById('mServices').innerHTML = s.services.map(sv => `
    <div class="service-item">
      <span class="svc-name">${sv.name}</span>
      <span class="svc-price">${s.price_currency}${sv.price.toLocaleString()}</span>
    </div>`).join('');

  renderBookingArea(s);
  await renderReviews(s);
}

function renderBookingArea(s) {
  const area = document.getElementById('bookingArea');
  if (!currentUser) {
    area.innerHTML = `
      <div class="login-prompt">
        <p>Захиалга хийхийн тулд нэвтрэх шаардлагатай.</p>
        <button onclick="closeModal();openAuth('login')">Нэвтрэх</button>
      </div>`;
    return;
  }
  const today = new Date().toISOString().split('T')[0];
  area.innerHTML = `
    <div class="svc-title" style="margin-top:1.5rem">Захиалга хийх</div>
    <div class="book-form">
      <input type="text" value="${currentUser.name}" readonly>
      <div class="form-row">
        <input type="date" id="bookDate" min="${today}" value="${today}">
        <select id="bookTime">
          <option value="">Цаг сонгох…</option>
          ${['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
            .map(t=>`<option>${t}</option>`).join('')}
        </select>
      </div>
      <select id="bookService">
        <option value="">Үйлчилгээ сонгох…</option>
        ${s.services.map(sv=>`<option>${sv.name} — ${s.price_currency}${sv.price.toLocaleString()}</option>`).join('')}
      </select>
      <button class="book-submit" id="bookSubmitBtn" onclick="submitBooking(${s.id})">
        <span>Захиалга батлах</span>
        <div class="spinner" id="bookSpinner"></div>
      </button>
    </div>`;
}

async function submitBooking(salonId) {
  const service = document.getElementById('bookService').value;
  const time    = document.getElementById('bookTime').value;
  const date    = document.getElementById('bookDate').value;
  if (!service) { showToast('Үйлчилгээ сонгоно уу', true); return; }
  if (!time)    { showToast('Цаг сонгоно уу', true); return; }
  const btn = document.getElementById('bookSubmitBtn');
  const sp  = document.getElementById('bookSpinner');
  btn.disabled=true; sp.style.display='block';
  try {
    const salon = MOCK_SALONS.find(s=>s.id===salonId);
    await api.postBooking({salon_id:salonId,salon_name:salon.name,service,booking_date:date,booking_time:time});
    closeModal();
    showToast(`✓ ${salon.name} — ${date} ${time} цагт захиалагдлаа`);
  } catch(e) { showToast(e.message,true); }
  finally { btn.disabled=false; sp.style.display='none'; }
}

function switchTab(el, tab) {
  document.querySelectorAll('.modal-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.modal-panel').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
}

function closeModal() {
  clearInterval(window._modalAuto);
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
  currentSalonId=null;
}
function handleModalOutside(e) { if(e.target===document.getElementById('modalOverlay')) closeModal(); }

/* ════════════════════════════════════════════════════════
   REVIEWS
   ════════════════════════════════════════════════════════ */
async function renderReviews(s) {
  const reviews = await api.getReviews(s.id);
  document.getElementById('reviewsList').innerHTML = reviews.length
    ? reviews.map(r=>`
        <div class="review-item">
          <div class="review-top">
            <div class="reviewer-name">${r.user}</div>
            <div class="review-meta">
              <div class="r-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
              <div class="r-date">${r.date}</div>
            </div>
          </div>
          <div class="review-text">${r.text}</div>
        </div>`).join('')
    : '<p style="color:var(--soft);font-size:.85rem;margin-bottom:1rem">Одоогоор сэтгэгдэл байхгүй байна.</p>';

  const wr = document.getElementById('writeReviewArea');
  if (!currentUser) {
    wr.innerHTML=`<div class="no-auth-box">Сэтгэгдэл үлдээхийн тулд <a onclick="closeModal();openAuth('login')">нэвтрэнэ үү</a></div>`;
    return;
  }
  starRating=0;
  wr.innerHTML=`
    <div class="write-review-title">Сэтгэгдэл үлдээх</div>
    <div class="star-select" id="starSelect">
      ${[1,2,3,4,5].map(i=>`<button class="star-btn" onclick="setStar(${i})" data-v="${i}">★</button>`).join('')}
    </div>
    <textarea class="review-textarea" id="reviewText" placeholder="Туршлагаа хуваалцаарай…"></textarea>
    <button class="review-submit" onclick="submitReview(${s.id})">Нийтлэх</button>`;
}

function setStar(n) {
  starRating=n;
  document.querySelectorAll('.star-btn').forEach(b=>b.classList.toggle('lit',parseInt(b.dataset.v)<=n));
}

async function submitReview(salonId) {
  if (!starRating) { showToast('Одны үнэлгээ сонгоно уу',true); return; }
  const text = document.getElementById('reviewText').value.trim();
  if (!text) { showToast('Сэтгэгдэл бичнэ үү',true); return; }
  try {
    await api.postReview({salon_id:salonId,stars:starRating,text});
    await renderReviews(MOCK_SALONS.find(x=>x.id===salonId));
    showToast('Сэтгэгдэл нийтлэгдлээ! Баярлалаа 🌸');
  } catch(e) { showToast(e.message,true); }
}

/* ════════════════════════════════════════════════════════
   AUTH
   ════════════════════════════════════════════════════════ */
function updateNav() {
  const btns   = document.getElementById('navAuthBtns');
  const avatar = document.getElementById('userAvatar');
  if (currentUser) {
    btns.style.display   = 'none';
    avatar.style.display = 'flex';
    avatar.textContent   = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('menuName').textContent  = currentUser.name;
    document.getElementById('menuEmail').textContent = currentUser.email;
  } else {
    btns.style.display   = 'flex';
    avatar.style.display = 'none';
  }
}

function openAuth(mode) {
  authMode=mode; setAuthMode(mode);
  document.getElementById('authOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function setAuthMode(mode) {
  authMode=mode;
  const isLogin=mode==='login';
  document.getElementById('authTitle').textContent    = isLogin?'Тавтай морил':'Бүртгэл үүсгэх';
  document.getElementById('authSub').innerHTML        = isLogin
    ? 'Нэвтэрч <em>салонуудаа захиалаарай</em>'
    : 'Бүртгүүлж Улаанбаатарын <em>шилдэг салонуудыг</em> олоорой';
  document.getElementById('fName').style.display      = isLogin?'none':'block';
  document.getElementById('authBtnText').textContent  = isLogin?'Нэвтрэх':'Бүртгүүлэх';
  document.getElementById('authSwitch').innerHTML     = isLogin
    ? 'Бүртгэл байхгүй юу? <a onclick="toggleAuthMode()">Бүртгүүлэх</a>'
    : 'Бүртгэл байгаа юу? <a onclick="toggleAuthMode()">Нэвтрэх</a>';
  document.getElementById('authError').textContent='';
}
function toggleAuthMode() { setAuthMode(authMode==='login'?'signup':'login'); }

async function submitAuth() {
  const email=document.getElementById('fEmail').value.trim();
  const pass =document.getElementById('fPass').value;
  const name =document.getElementById('fName').value.trim();
  const errEl=document.getElementById('authError');
  const btn  =document.getElementById('authSubmitBtn');
  const spin =document.getElementById('authSpinner');
  errEl.textContent='';
  if (!email)                         { errEl.textContent='И-мэйл хаяг оруулна уу'; return; }
  if (authMode==='signup' && !name)   { errEl.textContent='Нэрээ оруулна уу'; return; }
  if (pass.length<6)                  { errEl.textContent='Нууц үг 6-аас дээш тэмдэгттэй байх ёстой'; return; }
  btn.disabled=true; spin.style.display='block';
  try {
    const res = authMode==='signup'
      ? await api.signup({name,email,password:pass})
      : await api.login({email,password:pass});
    currentUser=res.user;
    localStorage.setItem('nh_user', JSON.stringify(currentUser));
    localStorage.setItem('nh_token', res.token);
    updateNav(); closeAuth();
    showToast(`Тавтай морил, ${currentUser.name}! 🌸`);
    if (currentSalonId) openModal(currentSalonId);
  } catch(e) { errEl.textContent=e.message; }
  finally { btn.disabled=false; spin.style.display='none'; }
}

function googleSignIn() {
  const names=['Болормаа','Нарантөгс','Мөнхжин','Оюунаа','Аriунаа'];
  const name=names[Math.floor(Math.random()*names.length)];
  currentUser={id:Date.now(),name,email:name.toLowerCase()+'@gmail.com'};
  localStorage.setItem('nh_user',JSON.stringify(currentUser));
  localStorage.setItem('nh_token','mock_google_'+Date.now());
  updateNav(); closeAuth();
  showToast(`Тавтай морил, ${currentUser.name}! 🌸`);
  if (currentSalonId) openModal(currentSalonId);
}

function logout() {
  currentUser=null;
  localStorage.removeItem('nh_user');
  localStorage.removeItem('nh_token');
  document.getElementById('userMenu').classList.remove('open');
  updateNav();
  showToast('Гарлаа. Дараа уулзая!');
}

function toggleUserMenu() { document.getElementById('userMenu').classList.toggle('open'); }
document.addEventListener('click', e => {
  const menu=document.getElementById('userMenu');
  const av  =document.getElementById('userAvatar');
  if (!av.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
});

function closeAuth() { document.getElementById('authOverlay').classList.remove('open'); document.body.style.overflow=''; }
function handleAuthOutside(e) { if(e.target===document.getElementById('authOverlay')) closeAuth(); }
document.addEventListener('keydown', e => {
  if (e.key==='Enter' && document.getElementById('authOverlay').classList.contains('open')) submitAuth();
});

/* ════════════════════════════════════════════════════════
   MY BOOKINGS
   ════════════════════════════════════════════════════════ */
async function openBookings() {
  document.getElementById('userMenu').classList.remove('open');
  document.getElementById('bookingsOverlay').classList.add('open');
  document.body.style.overflow='hidden';
  document.getElementById('bookingsList').innerHTML='<p style="color:var(--soft);font-size:.85rem;padding:.5rem 0">Ачааллаж байна…</p>';
  const bookings=await api.getBookings();
  const list=document.getElementById('bookingsList');
  if (!bookings.length) {
    list.innerHTML='<div class="no-bookings">Одоогоор захиалга байхгүй байна.<br>Салон сонгоод анхны захиалгаа хийгээрэй!</div>';
    return;
  }
  list.innerHTML=bookings.slice().reverse().map(b=>`
    <div class="booking-item" id="booking-${b.id}">
      <div>
        <div class="b-name">${b.salon_name}</div>
        <div class="b-detail">${b.service} · ${b.booking_date} ${b.booking_time}</div>
        ${b.status!=='Cancelled'?`<button class="cancel-btn" onclick="cancelBooking(${b.id})">Цуцлах</button>`:''}
      </div>
      <div class="b-status ${b.status==='Cancelled'?'cancelled':''}">${b.status==='Confirmed'?'Баталгаажсан':'Цуцлагдсан'}</div>
    </div>`).join('');
}

async function cancelBooking(id) {
  if (!confirm('Захиалгаа цуцлах уу?')) return;
  await api.cancelBooking(id);
  const el=document.getElementById('booking-'+id);
  if (el) {
    el.querySelector('.b-status').textContent='Цуцлагдсан';
    el.querySelector('.b-status').classList.add('cancelled');
    const cb=el.querySelector('.cancel-btn');
    if (cb) cb.remove();
  }
  showToast('Захиалга цуцлагдлаа.');
}

function closeBookings() { document.getElementById('bookingsOverlay').classList.remove('open'); document.body.style.overflow=''; }
function handleBookingsOutside(e) { if(e.target===document.getElementById('bookingsOverlay')) closeBookings(); }

/* ════════════════════════════════════════════════════════
   GOOGLE MAPS
   ════════════════════════════════════════════════════════ */
function initGoogleMap() {
  if (googleMapInstance) return;
  googleMapInstance=new google.maps.Map(document.getElementById('gmap'),{
    center:{lat:47.9077,lng:106.9156},zoom:13,
    styles:[
      {featureType:'all',  elementType:'labels.text.fill',stylers:[{color:'#6B6459'}]},
      {featureType:'water',elementType:'geometry',        stylers:[{color:'#EFE4CE'}]},
      {featureType:'road', elementType:'geometry',        stylers:[{color:'#F9F5EF'}]},
      {featureType:'road', elementType:'geometry.stroke', stylers:[{color:'#D4B483',weight:.5}]},
      {featureType:'poi',  stylers:[{visibility:'off'}]},
    ],
  });
  const icon={path:google.maps.SymbolPath.CIRCLE,scale:10,fillColor:'#B8975A',fillOpacity:1,strokeColor:'#FFF',strokeWeight:2};
  MOCK_SALONS.forEach(s=>{
    const marker=new google.maps.Marker({position:{lat:s.lat,lng:s.lng},map:googleMapInstance,icon,title:s.name});
    const info=new google.maps.InfoWindow({content:`
      <div style="font-family:'Jost',sans-serif;padding:.4rem;min-width:180px">
        <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;margin-bottom:.2rem">${s.name}</div>
        <div style="font-size:.75rem;color:#6B6459;margin-bottom:.2rem">${s.district} · ${s.rating}★</div>
        <div style="font-size:.8rem;color:#B8975A;margin-bottom:.6rem">₮${s.price_from.toLocaleString()}-өөс</div>
        <button onclick="openModal(${s.id})" style="font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;padding:.35rem .9rem;border:1px solid #B8975A;color:#B8975A;background:none;cursor:pointer">Захиалах</button>
      </div>`});
    marker.addListener('click',()=>info.open(googleMapInstance,marker));
  });
}

function showMapPlaceholder() {
  document.getElementById('gmap').innerHTML=`
    <div class="map-placeholder">
      <div class="mp-icon">🗺️</div>
      <p>Google Maps API түлхүүрээ оруулсны дараа газрын зураг харагдана.</p>
      <code>YOUR_API_KEY</code>
      <p style="margin-top:.8rem;font-size:.75rem">console.cloud.google.com</p>
    </div>`;
}

/* ════════════════════════════════════════════════════════
   SMOOTH SCROLL
   ════════════════════════════════════════════════════════ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ════════════════════════════════════════════════════════
   UTILS
   ════════════════════════════════════════════════════════ */
function showToast(msg, isError=false) {
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.toggle('error',isError);
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3800);
}
function delay(ms) { return new Promise(r=>setTimeout(r,ms)); }

/* ════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════ */
document.getElementById('footerApi').textContent  = CONFIG.API_BASE;
document.getElementById('footerMaps').textContent = CONFIG.GOOGLE_MAPS_KEY==='YOUR_API_KEY'?'Холбогдоогүй':'Холбогдсон ✓';

if (CONFIG.GOOGLE_MAPS_KEY==='YOUR_API_KEY') showMapPlaceholder();

updateNav();
loadAllRows();
