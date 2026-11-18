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
    id: 13,
    title: 'PCBuildAR — AR PC Building & Learning',
    category: 'coding',
    categoryLabel: 'Coding',
    badgeClass: 'badge-code',
    tags: 'Unity · C# · AR Foundation · On-Device ML',
    desc: 'An interactive Unity learning app that identifies PC hardware and teaches component assembly through augmented reality, lessons, and quizzes.',
    repoUrl: 'https://github.com/tippytaptip66/PCBUILDAR',
    img: 'https://images.pexels.com/photos/6236574/pexels-photo-6236574.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#0900d6', '#6e27e1']
  },
  {
    id: 14,
    title: 'Grocerapp — Grocery Store Application',
    category: 'coding',
    categoryLabel: 'Coding',
    badgeClass: 'badge-code',
    tags: 'Apache NetBeans · AOOP · SQL',
    desc: 'A grocery application developed in Apache NetBeans as a final project for Advanced Object-Oriented Programming.',
    repoUrl: 'https://github.com/tippytaptip66/grocerapp',
    img: 'https://images.pexels.com/photos/16211537/pexels-photo-16211537.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#6e27e1', '#f287c8']
  },
  {
    id: 15,
    title: 'Bodega — HCI Interface Prototype',
    category: 'design',
    categoryLabel: 'UX / UI Design',
    badgeClass: 'badge-design',
    tags: 'HCI · Interactive Front End · Figma Recreation',
    desc: 'A static, interactive front-end recreation of a Bodega Figma prototype, with Home, Demo, and Our Story experiences.',
    repoUrl: 'https://github.com/tippytaptip66/HCI-BOD3G4',
    img: 'https://images.pexels.com/photos/24862481/pexels-photo-24862481.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#0900d6', '#a32180']
  },
  {
    id: 16,
    title: 'Tech Week 2026 — Event Landing Page',
    category: 'coding',
    categoryLabel: 'Coding',
    badgeClass: 'badge-code',
    tags: 'Event Website · Front-End · Neon Visual Design',
    desc: 'A landing page for the College of Computer Studies at St. Timothy University, promoting its Tech Week exhibits, workshops, and competitions.',
    repoUrl: 'https://github.com/tippytaptip66/techweek-2026',
    img: 'https://images.pexels.com/photos/36169770/pexels-photo-36169770.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#0900d6', '#6e27e1']
  },
  {
    id: 1,
    title: 'Quiet Urban Street & Architecture',
    category: 'photography',
    categoryLabel: 'Photography',
    badgeClass: 'badge-photo',
    tags: 'Urban Architecture · Street Photography · Natural Light',
    desc: 'A study of an empty city street, its weathered facades, and the depth created by a quiet overcast day.',
    img: 'https://images.pexels.com/photos/18502595/pexels-photo-18502595/free-photo-of-empty-street-in-city.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallbackGrad: ['#0900d6', '#ff8cd1']
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
    fallbackGrad: ['#6e27e1', '#f287c8']
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
    fallbackGrad: ['#0900d6', '#6e27e1']
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
    fallbackGrad: ['#17151a', '#6e27e1']
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
    fallbackGrad: ['#0900d6', '#ff8cd1']
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
    fallbackGrad: ['#a32180', '#f287c8']
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
    fallbackGrad: ['#6e27e1', '#f287c8']
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
    fallbackGrad: ['#0900d6', '#6e27e1']
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
    fallbackGrad: ['#6e27e1', '#ff8cd1']
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
    fallbackGrad: ['#0900d6', '#17151a']
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
    fallbackGrad: ['#17151a', '#a32180']
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
    fallbackGrad: ['#0900d6', '#f287c8']
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
    const card = document.createElement(p.repoUrl ? 'a' : 'article');
    card.className = `project-card${p.repoUrl ? ' project-card-link' : ''}`;
    card.dataset.category = p.category;
    card.dataset.id = p.id;
    if (p.repoUrl) {
      card.href = p.repoUrl;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', `Open ${p.title} repository on GitHub in a new tab`);
    } else {
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${p.title}`);
    }

    const fallback = fallbackSvg(p.title, p.category, p.fallbackGrad);
    const imageSource = p.img || fallback;

    card.innerHTML = `
      <div class="project-thumb">
        <span class="project-category-badge ${p.badgeClass}">${p.categoryLabel}</span>
        <img src="${imageSource}" alt="${p.title} project preview" loading="lazy">
      </div>
      <div class="project-info">
        <span class="project-tags">${p.tags}</span>
        <h3 class="project-title">
          <span>${p.title}</span>
          <svg class="project-arrow"><use href="#icon-arrow-up-right"/></svg>
        </h3>
        <p class="project-desc">${p.desc}</p>
        ${p.repoUrl ? '<span class="project-repo-link">View repository on GitHub <span aria-hidden="true">↗</span></span>' : ''}
      </div>
    `;

    const img = $('img', card);
    img.onerror = () => {
      img.onerror = null;
      img.src = fallback;
    };

    // Sample cards open a detail modal; the real repository cards are direct links.
    if (!p.repoUrl) {
      const openModal = () => showProjectModal(p);
      card.onclick = openModal;
      card.onkeydown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      };
    }

    grid.appendChild(card);
  });
}
renderProjects();

/* Video fill for the hero name */
function initNameVideoFill() {
  const video = $('.site-background-video');
  const text = $('.name-video-text');
  const canvas = $('.name-video-canvas');
  if (!video || !text || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const name = text.textContent.trim();
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let frame = 0;
  let inView = false;

  function requestVideoPlayback() {
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const playback = video.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        const retryPlayback = () => video.play().catch(() => {});
        document.addEventListener('pointerdown', retryPlayback, { once: true, passive: true });
        document.addEventListener('keydown', retryPlayback, { once: true });
      });
    }
  }

  function resizeCanvas() {
    const bounds = text.getBoundingClientRect();
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function drawNameFrame() {
    if (video.readyState < 2 || !video.videoWidth || !width || !height) return;

    ctx.clearRect(0, 0, width, height);
    const scale = Math.max(width / video.videoWidth, height / video.videoHeight);
    const videoWidth = video.videoWidth * scale;
    const videoHeight = video.videoHeight * scale;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(video, (width - videoWidth) / 2, (height - videoHeight) / 2, videoWidth, videoHeight);

    const style = getComputedStyle(text);
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = style.letterSpacing;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    const metrics = ctx.measureText(name);
    const ascent = metrics.actualBoundingBoxAscent || height * 0.72;
    const descent = metrics.actualBoundingBoxDescent || height * 0.12;
    const baseline = (height + ascent - descent) / 2;
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, width / 2, baseline, width);
    ctx.globalCompositeOperation = 'source-over';
  }

  function animateName() {
    frame = 0;
    if (!inView) return;
    drawNameFrame();
    frame = requestAnimationFrame(animateName);
  }

  function startAnimation() {
    if (inView && !frame) {
      drawNameFrame();
      frame = requestAnimationFrame(animateName);
    }
  }

  function stopAnimation() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    ctx.clearRect(0, 0, width, height);
  }

  resizeCanvas();
  requestVideoPlayback();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startAnimation();
      else stopAnimation();
    });
    observer.observe(text);
  } else {
    inView = true;
    startAnimation();
  }

  video.addEventListener('loadeddata', startAnimation);
  video.addEventListener('play', startAnimation);
  window.addEventListener('resize', () => {
    resizeCanvas();
    drawNameFrame();
  });
  if ('ResizeObserver' in window) new ResizeObserver(() => {
    resizeCanvas();
    drawNameFrame();
  }).observe(text);
  if (document.fonts?.ready) document.fonts.ready.then(() => {
    resizeCanvas();
    drawNameFrame();
  });
}
initNameVideoFill();

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
  const timeline = $('#timeline').value.trim() || 'Not specified';
  const message = $('#message').value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry: ${service} from ${name}`);
  const body = encodeURIComponent([
    `Name: ${name}`,
    `Reply email: ${email}`,
    `Project type: ${service}`,
    `Timeline / budget: ${timeline}`,
    '',
    'Project overview:',
    message
  ].join('\n'));

  const successBox = $('#formSuccess');
  successBox.textContent = 'Your email app should open with the inquiry ready. Send it there to complete your message. If it does not open, email bacoroelmer@gmail.com directly.';
  successBox.hidden = false;
  successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  window.location.href = `mailto:bacoroelmer@gmail.com?subject=${subject}&body=${body}`;
  toast('Opening your email app');
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
