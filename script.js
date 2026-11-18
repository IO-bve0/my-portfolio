const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const toast = msg => {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('on'), 2000);
};

/* ---------- Landing: mood switcher (Masculine Deep Blue Tones) ---------- */
const moods = {
  calm: {
    h: 'Calm Horizons',
    d: 'Engineered stillness. Captured in natural and architectural light.',
    s: ['#081220', '#132845', '#1e3a63'],
    x: ['35mm', 'ƒ/8', '1/250s', 'ISO 100'],
    p: ['Obsidian Coast', 'Silent Water', 'Cold Ridge']
  },
  fleet: {
    h: 'Fleeting Moments',
    d: 'Razor-thin depth of field. Frozen in an instant of dynamic motion.',
    s: ['#091830', '#173660', '#2563eb'],
    x: ['85mm', 'ƒ/1.4', '1/4000s', 'ISO 400'],
    p: ['Shutter Drift', 'Velocity Burst', 'Atmosphere']
  },
  eternal: {
    h: 'Eternal Motion',
    d: 'Long-exposure sensor saturation. Physical time rendered into silk.',
    s: ['#040912', '#0d1d36', '#1d4ed8'],
    x: ['24mm', 'ƒ/16', '60s', 'ISO 50'],
    p: ['Star Geometry', 'Titanium Sea', 'Endless Horizon']
  }
};

function setMood(k) {
  const m = moods[k], vf = $('#home');
  m.s.forEach((c, i) => vf.style.setProperty('--s' + (i + 1), c));
  $('#h1').textContent = m.h;
  $('#sub').textContent = m.d;
  $$('.exif span').forEach((e, i) => (e.textContent = m.x[i]));
  $$('.pol .pol-label').forEach((e, i) => (e.textContent = m.p[i]));
  $$('.moods .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === k));
}

$$('.moods .chip').forEach(b => {
  b.onclick = () => setMood(b.dataset.m);
});
setMood('calm');

/* ---------- Viewfinder Rule of Thirds ---------- */
const gridBtn = $('#gridBtn');
if (gridBtn) {
  gridBtn.onclick = e => {
    const on = $('#home').classList.toggle('show-thirds');
    e.currentTarget.setAttribute('aria-pressed', on);
    if (on) $('#home').scrollIntoView({ block: 'start' });
  };
}

/* ---------- Gallery Dataset & High-End SVG Art Generator ---------- */
const L = {
  calm: 'Calm Horizons',
  fleet: 'Fleeting Moments',
  eternal: 'Eternal Motion',
  prop: 'Architectural'
};

const P = [
  ['Obsidian Ridge', 'calm', 400, ['#091322', '#152945', '#38bdf8'], '35mm · ƒ/8 · 1/250s · ISO 100'],
  ['Kinetic Drift', 'fleet', 500, ['#0b1a32', '#1e40af', '#60a5fa'], '85mm · ƒ/1.4 · 1/4000s · ISO 400'],
  ['Monolith Atrium', 'prop', 340, ['#060c16', '#10223b', '#2563eb'], '17mm · ƒ/11 · 1/125s · ISO 100'],
  ['Borealis Velocity', 'eternal', 500, ['#030710', '#0f274a', '#38bdf8'], '24mm · ƒ/2.8 · 45s · ISO 800'],
  ['Cold Shoreline', 'calm', 320, ['#07111f', '#183359', '#60a5fa'], '50mm · ƒ/9 · 1/200s · ISO 100'],
  ['Prism Fracture', 'fleet', 420, ['#0a182d', '#1d4ed8', '#93c5fd'], '85mm · ƒ/1.8 · 1/2500s · ISO 320'],
  ['Brutalist Void', 'prop', 480, ['#050b14', '#132845', '#3b82f6'], '20mm · ƒ/8 · 1/60s · ISO 200'],
  ['Silk Surge', 'eternal', 340, ['#081426', '#1e3a8a', '#38bdf8'], '35mm · ƒ/16 · 30s · ISO 50'],
  ['Abyssal Dawn', 'calm', 480, ['#09172c', '#1e40af', '#60a5fa'], '70mm · ƒ/8 · 1/320s · ISO 100'],
  ['Night Velocity', 'fleet', 320, ['#050c18', '#1d4ed8', '#38bdf8'], '105mm · ƒ/2 · 1/1200s · ISO 250'],
  ['Cantilever Pavilion', 'prop', 420, ['#081220', '#19355b', '#60a5fa'], '24mm · ƒ/9 · 1/250s · ISO 100'],
  ['Event Horizon', 'eternal', 440, ['#040812', '#0f2444', '#3b82f6'], '28mm · ƒ/14 · 90s · ISO 64']
];

function art(k, h, c) {
  const [a, b, d] = c;
  const y = h * 0.62;
  let s = `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="lensGlow" cx="65%" cy="35%" r="45%">
      <stop offset="0%" stop-color="${d}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${a}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="${h}" fill="url(#bgG)"/>
  <rect width="400" height="${h}" fill="url(#lensGlow)"/>`;

  if (k === 'calm') {
    // Oceanic stillness, luminous horizon line, minimalist cold moon
    s += `
      <circle cx="280" cy="${y - 45}" r="32" fill="#040912" stroke="${d}" stroke-width="2" opacity="0.9"/>
      <circle cx="280" cy="${y - 45}" r="12" fill="${d}" opacity="0.8"/>
      <rect y="${y}" width="400" height="${h - y}" fill="#040812" opacity="0.92"/>
      <line x1="0" y1="${y}" x2="400" y2="${y}" stroke="${d}" stroke-width="1.5" opacity="0.8"/>
      <line x1="40" y1="${y + 18}" x2="360" y2="${y + 18}" stroke="${d}" stroke-width="1" opacity="0.4"/>
      <line x1="120" y1="${y + 36}" x2="300" y2="${y + 36}" stroke="${d}" stroke-width="1" opacity="0.25"/>
      <line x1="180" y1="${y + 54}" x2="260" y2="${y + 54}" stroke="${d}" stroke-width="0.75" opacity="0.15"/>
    `;
  } else if (k === 'fleet') {
    // High-speed angular light shards & dynamic focal particles
    for (let i = 0; i < 7; i++) {
      const px = (i * 67 + 35) % 380;
      const py = (i * 83 + 45) % (h - 60);
      s += `<polygon points="${px},${py} ${px + 45},${py + 25} ${px + 20},${py + 70}" fill="${i % 2 === 0 ? d : '#2563eb'}" opacity="0.35"/>`;
      s += `<circle cx="${(px + 75) % 390}" cy="${(py + 40) % h}" r="${8 + i * 3}" fill="${d}" opacity="0.25"/>`;
    }
    s += `<line x1="0" y1="${h * 0.3}" x2="400" y2="${h * 0.7}" stroke="${d}" stroke-width="2" opacity="0.4" stroke-dasharray="10 15"/>`;
  } else if (k === 'eternal') {
    // Star trails / long exposure silk curves in deep midnight space
    for (let i = 0; i < 9; i++) {
      s += `<path d="M-30 ${h * 0.2 + i * 32} Q190 ${h * 0.05 + i * 44} 430 ${h * 0.45 + i * 24}" fill="none" stroke="${i % 2 === 0 ? d : '#1d4ed8'}" stroke-width="${1.5 + (i % 3)}" opacity="${0.4 + i * 0.06}"/>`;
    }
    s += `<rect y="${h * 0.82}" width="400" height="${h * 0.18}" fill="#03060c" opacity="0.95"/>`;
  } else if (k === 'prop') {
    // Precision brutalist / modern architecture lines & backlit facade
    s += `
      <rect x="70" y="${h * 0.2}" width="260" height="${h * 0.8}" fill="#040913" stroke="${d}" stroke-width="1" opacity="0.85"/>
      <line x1="70" y1="${h * 0.2}" x2="20" y2="${h}" stroke="#1d4ed8" stroke-width="1.5" opacity="0.4"/>
      <line x1="330" y1="${h * 0.2}" x2="380" y2="${h}" stroke="#1d4ed8" stroke-width="1.5" opacity="0.4"/>
    `;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        s += `<rect x="${95 + c * 75}" y="${h * 0.26 + r * (h * 0.14)}" width="45" height="${h * 0.08}" fill="${d}" opacity="0.3" rx="2"/>`;
      }
    }
  }

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${h}">${s}</svg>`);
}

const grid = $('#grid');
P.forEach(([t, k, h, c, e, src]) => {
  const f = document.createElement('figure');
  f.dataset.k = k;
  f.innerHTML = `
    <button class="ph" aria-label="View ${t} in inspect mode">
      <img alt="${t}, ${L[k]} series photograph" width="400" height="${h}" loading="lazy">
    </button>
    <figcaption>
      <b>${t}</b>
      <span>${e}</span>
    </figcaption>
  `;
  const im = $('img', f);
  const fb = art(k, h, c);
  im.onerror = () => {
    im.onerror = null;
    im.src = fb;
  };
  im.src = src || fb;
  f.dataset.cap = `${t} — ${L[k]} Series &bull; ${e}`;
  grid.append(f);
});

$$('.filters .chip').forEach(b => {
  b.onclick = () => {
    $$('.filters .chip').forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('#grid figure').forEach(f => {
      f.hidden = b.dataset.f !== 'all' && f.dataset.k !== b.dataset.f;
    });
  };
});

/* ---------- High-Speed Motion Blur Showcase ---------- */
const mbTrack = $('#mbTrack');
const mbf = $('#mbf');
const sh = $('#shutter');
const fz = $('#freeze');

const stops = ['1/1000s', '1/250s', '1/60s', '1/15s', '1/4s', '1s', '4s'];
const bl = [0, 2, 7, 16, 26, 40, 58];

for (let n = 0; n < 2; n++) {
  P.slice(0, 8).forEach(([t, k, , c, , src]) => {
    const f = document.createElement('figure');
    const fb = art(k, 300, c);
    if (n) f.setAttribute('aria-hidden', 'true');
    f.innerHTML = `
      <img alt="${n ? '' : t + ', ' + L[k] + ' photograph'}" width="400" height="300" loading="lazy">
      <figcaption>${t}</figcaption>
    `;
    const im = $('img', f);
    im.onerror = () => {
      im.onerror = null;
      im.src = fb;
    };
    im.src = src || fb;
    mbTrack.append(f);
  });
}

const frozen = () => fz.getAttribute('aria-pressed') === 'true';

function mbUpdate() {
  const i = +sh.value;
  const b = frozen() ? 0 : bl[i];
  mbf.setAttribute('stdDeviation', b + ' 0');
  $('.mb-view').style.filter = b ? 'url(#mb)' : 'none';
  $('#shutOut').textContent = stops[i];
  sh.setAttribute('aria-valuetext', 'Shutter speed ' + stops[i]);
  mbTrack.style.setProperty('--dur', (42 - i * 5) + 's');
  mbTrack.classList.toggle('paused', frozen());
}

sh.oninput = mbUpdate;
fz.onclick = () => {
  const willFreeze = !frozen();
  fz.setAttribute('aria-pressed', willFreeze);
  fz.textContent = willFreeze ? 'Release Shutter' : 'Freeze Exposure';
  mbUpdate();
};
mbUpdate();

/* ---------- Lightbox Modal / Inspector ---------- */
const lb = $('#lb');
grid.onclick = e => {
  const f = e.target.closest('figure');
  if (!f) return;
  const im = $('img', f);
  $('#lbimg').src = im.src;
  $('#lbimg').alt = im.alt;
  $('#lbcap').innerHTML = f.dataset.cap;
  lb.showModal();
};

lb.onclick = e => {
  if (e.target === lb) lb.close();
};

$('#lbClose').onclick = () => lb.close();

$('#wmBtn').onclick = e => {
  const off = $('.lbimg').classList.toggle('nowm');
  e.currentTarget.setAttribute('aria-pressed', !off);
  e.currentTarget.textContent = 'Seal: ' + (off ? 'Hidden' : 'Visible');
};

/* ---------- Services -> Dispatch Form Integration ---------- */
$$('[data-svc]').forEach(b => {
  b.onclick = () => {
    const svcMap = {
      'Portraits': 'Studio & Portraiture',
      '@ Properties & Architectural': 'Architectural & Properties',
      'Brand Editorials': 'Brand Editorials',
      'Fine Art Sky Prints': 'Fine Art Deep Prints'
    };
    const mapped = svcMap[b.dataset.svc] || b.dataset.svc;
    $('#service').value = mapped;
    $('#contact').scrollIntoView({ behavior: 'smooth' });
    $('#name').focus({ preventScroll: true });
    toast('Configuring: ' + mapped);
  };
});

/* ---------- Master Blue Color Swatches (Click-to-Copy) ---------- */
$$('.sw').forEach(b => {
  b.onclick = async () => {
    const v = b.dataset.hex;
    try {
      await navigator.clipboard.writeText(v);
    } catch {
      const t = document.createElement('textarea');
      t.value = v;
      document.body.append(t);
      t.select();
      try {
        document.execCommand('copy');
      } catch {}
      t.remove();
    }
    toast('Copied ' + v + ' to clipboard');
  };
});

/* ---------- High-End Dark Aperture Profile Fallback ---------- */
const pr = $('#profile');
if (pr) {
  pr.onerror = () => {
    pr.onerror = null;
    pr.src =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 600">
        <defs>
          <radialGradient id="rg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#1e3a8a"/>
            <stop offset="45%" stop-color="#0e1f38"/>
            <stop offset="100%" stop-color="#050a12"/>
          </radialGradient>
          <linearGradient id="gLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#2563eb"/>
          </linearGradient>
        </defs>
        <rect width="480" height="600" fill="url(#rg)"/>
        <circle cx="240" cy="280" r="145" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-opacity="0.4"/>
        <circle cx="240" cy="280" r="115" fill="#091424" stroke="url(#gLine)" stroke-width="2.5"/>
        <circle cx="240" cy="280" r="80" fill="#050b14" stroke="#60a5fa" stroke-width="1" stroke-dasharray="3 5"/>
        <g stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round">
          <path d="M240 210 l38 65 M278 275 l-32 48 M246 323 l-48 -10 M198 313 l-12 -52 M186 261 l42 -38 M228 223 l48 24"/>
          <circle cx="240" cy="280" r="26" fill="#172554" stroke="#60a5fa"/>
          <circle cx="240" cy="280" r="10" fill="#38bdf8"/>
        </g>
        <text x="240" y="475" text-anchor="middle" font-size="14" font-weight="700" letter-spacing="4" fill="#f8fafc" font-family="-apple-system,Inter,sans-serif">CAELUM STUDIO</text>
        <text x="240" y="500" text-anchor="middle" font-size="9.5" font-weight="500" letter-spacing="2.5" fill="#60a5fa" font-family="JetBrains Mono,monospace">PRO PHOTOGRAPHY ARCHIVE</text>
      </svg>
    `);
  };
}

/* ---------- Booking Dispatch Form Handling ---------- */
const dateField = $('#date');
if (dateField) {
  dateField.min = new Date().toISOString().slice(0, 10);
}

$('#form').onsubmit = e => {
  e.preventDefault();
  const f = e.target;
  $$('input,select', f).forEach(x => x.classList.toggle('err', !x.checkValidity()));
  if (!f.checkValidity()) {
    f.reportValidity();
    return;
  }
  const dateVal = $('#date').value ? new Date($('#date').value + 'T00:00').toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Flexible';
  const ok = $('#ok');
  ok.innerHTML = `&check; Transmission confirmed. Your inquiry for <strong>${$('#service').value}</strong> target date <strong>${dateVal}</strong> has been encrypted and dispatched. A direct response will be transmitted to <strong>${$('#email').value}</strong> within 24 hours.`;
  ok.hidden = false;
  ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  f.reset();
  toast('Project inquiry dispatched');
};

$('#yr').textContent = new Date().getFullYear();
