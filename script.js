const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const toast = msg => {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('on'), 2200);
};

/* ==========================================================================
   PROJECT SAMPLES DATASET (Featuring Photos from Pexels.com)
   Disciplines: Photography, Coding, Graphic Design
   ========================================================================== */

const projects = [
  {
    id: 1,
    title: 'Atmospheric Horizon & Street Portrait',
    category: 'photography',
    categoryLabel: 'Photography',
    badgeClass: 'badge-photo',
    tags: 'Sony A7IV · 85mm f/1.4 · Natural Light',
    desc: 'An exploration of natural light and raw human presence in urban environments. Balanced chiaroscuro shadows with rich environmental context.',
    img: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#082f49', '#0284c7']
  },
  {
    id: 2,
    title: 'Developer Workspace & Cloud Dashboard',
    category: 'coding',
    categoryLabel: 'Coding',
    badgeClass: 'badge-code',
    tags: 'React · TypeScript · Tailwind · REST API',
    desc: 'Interactive developer analytics platform featuring real-time telemetry, customizable widget grid, responsive micro-interactions, and dark mode architecture.',
    img: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#1e1b4b', '#4338ca']
  },
  {
    id: 3,
    title: 'Studio Monolith Brand Identity System',
    category: 'design',
    categoryLabel: 'Graphic Design',
    badgeClass: 'badge-design',
    tags: 'Figma · Brand Identity · Typography · Print',
    desc: 'Comprehensive visual identity system for a creative architecture collective, including modular logo marks, typographic scale, stationery, and digital guideline kits.',
    img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#2e1065', '#7c3aed']
  },
  {
    id: 4,
    title: 'Optics & Chiaroscuro Still Life',
    category: 'photography',
    categoryLabel: 'Photography',
    badgeClass: 'badge-photo',
    tags: 'Leica Q2 · 28mm Summilux · Studio Light',
    desc: 'Minimalist product study capturing lens reflections, tactile textures, and physical geometry under sculpted diffused studio light.',
    img: 'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#0f172a', '#334155']
  },
  {
    id: 5,
    title: 'Interactive Code Engine & Web IDE',
    category: 'coding',
    categoryLabel: 'Coding',
    badgeClass: 'badge-code',
    tags: 'JavaScript ES6+ · Web Workers · CSS Grid',
    desc: 'Browser-based code editor and live preview sandbox with syntax highlighting, keyboard shortcuts, and instant DOM rendering.',
    img: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#0c4a6e', '#0284c7']
  },
  {
    id: 6,
    title: 'Digital UI/UX Wireframing & Design Kit',
    category: 'design',
    categoryLabel: 'Graphic Design',
    badgeClass: 'badge-design',
    tags: 'Figma · Prototyping · Component Library',
    desc: 'End-to-end user experience redesign for a fintech platform. Developed atomic design components, accessible color contrast systems, and micro-flow prototypes.',
    img: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#4c1d95', '#8b5cf6']
  },
  {
    id: 7,
    title: 'Alpine Dawn & Mountain Ridges',
    category: 'photography',
    categoryLabel: 'Photography',
    badgeClass: 'badge-photo',
    tags: 'Fujifilm X-T4 · 35mm f/2 · Landscape Optics',
    desc: 'Wide-angle horizon photography capturing daybreak fog rolling over sub-alpine peaks. Preserved atmospheric highlights and deep forest shadows.',
    img: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#064e3b', '#059669']
  },
  {
    id: 8,
    title: 'Modern Creative Agency Web Experience',
    category: 'coding',
    categoryLabel: 'Coding',
    badgeClass: 'badge-code',
    tags: 'HTML5 · Modern CSS · Smooth Scroll · Vanilla JS',
    desc: 'Bespoke web experience built with high-performance CSS animations, custom cursor parallax, responsive grid layouts, and zero heavy dependencies.',
    img: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#172554', '#2563eb']
  },
  {
    id: 9,
    title: 'Editorial Poster Series & Typographic Layout',
    category: 'design',
    categoryLabel: 'Graphic Design',
    badgeClass: 'badge-design',
    tags: 'Adobe Illustrator · Photoshop · Swiss Grid',
    desc: 'A collection of experimental typographic posters exploring contrast, kinetic text paths, asymmetrical grids, and vibrant duotone palettes.',
    img: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#701a75', '#d946ef']
  },
  {
    id: 10,
    title: 'Vintage Optics Flatlay & Gear Documentation',
    category: 'photography',
    categoryLabel: 'Photography',
    badgeClass: 'badge-photo',
    tags: 'Medium Format Film · Hasselblad 500C/M',
    desc: 'Tactile editorial flatlay highlighting classic mechanical camera engineering, prime focal optics, and film textures.',
    img: 'https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#1c1917', '#44403c']
  },
  {
    id: 11,
    title: 'Collaborative Design System & Component Hub',
    category: 'coding',
    categoryLabel: 'Coding',
    badgeClass: 'badge-code',
    tags: 'Web Components · Storybook · CI/CD',
    desc: 'Cross-functional component library syncing design tokens from Figma directly into reusable, tested web interface components.',
    img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#1e293b', '#0ea5e9']
  },
  {
    id: 12,
    title: 'Creative Studio Visual Brand Assets',
    category: 'design',
    categoryLabel: 'Graphic Design',
    badgeClass: 'badge-design',
    tags: 'Branding · Marketing Assets · Social Kit',
    desc: 'Holistic brand collateral and social campaign assets for a modern creative studio, combining photography overlays with clean geometric vectors.',
    img: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#3b0764', '#9333ea']
  }
];

/* Graceful Fallback SVG Generator */
function fallbackSvg(title, category, [c1, c2]) {
  const icon = category === 'photography' ? '📷' : category === 'coding' ? '💻' : '🎨';
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g)"/>
      <circle cx="400" cy="220" r="70" fill="rgba(255,255,255,0.08)"/>
      <text x="400" y="240" text-anchor="middle" font-size="52">${icon}</text>
      <text x="400" y="340" text-anchor="middle" font-size="24" font-weight="700" fill="#ffffff" font-family="Plus Jakarta Sans, sans-serif">${title}</text>
      <text x="400" y="375" text-anchor="middle" font-size="14" font-weight="600" fill="rgba(255,255,255,0.7)" font-family="JetBrains Mono, monospace">${category.toUpperCase()}</text>
    </svg>
  `);
}

/* Render Project Grid */
const grid = $('#projectGrid');
function renderProjects(filter = 'all') {
  grid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.category = p.category;
    card.dataset.id = p.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${p.title}`);

    const fallback = fallbackSvg(p.title, p.category, p.fallbackGrad);

    card.innerHTML = `
      <div class="project-thumb">
        <span class="project-category-badge ${p.badgeClass}">${p.categoryLabel}</span>
        <img src="${p.img}" alt="${p.title}" loading="lazy">
      </div>
      <div class="project-info">
        <span class="project-tags">${p.tags}</span>
        <h3 class="project-title">
          <span>${p.title}</span>
          <svg class="project-arrow"><use href="#icon-arrow-up-right"/></svg>
        </h3>
        <p class="project-desc">${p.desc}</p>
      </div>
    `;

    const img = $('img', card);
    img.onerror = () => {
      img.onerror = null;
      img.src = fallback;
    };

    // Open detail modal on click or Enter key
    const openModal = () => showProjectModal(p);
    card.onclick = openModal;
    card.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    };

    grid.appendChild(card);
  });
}
renderProjects();

/* Filter Button Handlers */
$$('.filters .chip').forEach(btn => {
  btn.onclick = () => {
    $$('.filters .chip').forEach(b => b.setAttribute('aria-pressed', b === btn));
    renderProjects(btn.dataset.f);
  };
});

/* Quick Discipline Card Links */
$$('.card-filter-link').forEach(link => {
  link.onclick = () => {
    const filter = link.dataset.filter;
    const targetChip = $(`.filters .chip[data-f="${filter}"]`);
    if (targetChip) {
      $$('.filters .chip').forEach(b => b.setAttribute('aria-pressed', b === targetChip));
      renderProjects(filter);
      $('#portfolio').scrollIntoView({ behavior: 'smooth' });
      toast(`Filtered by ${filter.toUpperCase()}`);
    }
  };
});

/* ==========================================================================
   PROJECT MODAL (LIGHTBOX)
   ========================================================================== */

const modal = $('#projectModal');
function showProjectModal(p) {
  $('#modalImg').src = p.img;
  $('#modalImg').alt = p.title;
  $('#modalImg').onerror = () => {
    $('#modalImg').onerror = null;
    $('#modalImg').src = fallbackSvg(p.title, p.category, p.fallbackGrad);
  };
  $('#modalCategory').textContent = p.categoryLabel;
  $('#modalCategory').className = `modal-category ${p.badgeClass}`;
  $('#modalTags').textContent = p.tags;
  $('#modalTitle').textContent = p.title;
  $('#modalDesc').textContent = p.desc;
  modal.showModal();
}

modal.onclick = e => {
  if (e.target === modal) modal.close();
};

$('#modalClose').onclick = () => modal.close();

/* ==========================================================================
   CONTACT FORM HANDLING
   ========================================================================== */

const contactForm = $('#contactForm');
contactForm.onsubmit = e => {
  e.preventDefault();
  const f = e.target;
  const inputs = $$('input, select, textarea', f);
  inputs.forEach(el => el.classList.toggle('err', !el.checkValidity()));

  if (!f.checkValidity()) {
    f.reportValidity();
    return;
  }

  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const service = $('#service').value;

  const successBox = $('#formSuccess');
  successBox.innerHTML = `
    <strong>Thank you, ${name}!</strong>
    <p>Your inquiry for <strong>${service}</strong> has been transmitted. Elmer Bacoro will reach out directly to <strong>${email}</strong> shortly.</p>
  `;
  successBox.hidden = false;
  successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  f.reset();
  toast('Inquiry transmitted to Elmer Bacoro');
};

/* Fallback Profile Avatar */
const pr = $('#profileImg');
if (pr) {
  pr.onerror = () => {
    pr.onerror = null;
    pr.src = fallbackSvg('Elmer Bacoro', 'photography', ['#0f172a', '#2563eb']);
  };
}

/* Footer Year */
$('#currentYear').textContent = new Date().getFullYear();
