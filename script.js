/* =========================================================
   CAELUM CREATIVES — INTERACTIVE PORTFOLIO & SKY GENERATOR
   Replace `file` paths with your real photographs in assets/photos/.
   If a file is not present yet, `createAtmosphericPlate()` generates
   a matching mood-board scene automatically so nothing ever breaks.
   ========================================================= */

const MOOD_PLATES = [
  {
    id: "sunset-horizon",
    file: "assets/photos/sunset-horizon.jpg",
    title: "Amber Horizon, 05:48 AM",
    category: "horizons",
    categoryLabel: "Calm Horizons",
    exif: "35mm · f/1.8 · 1/1600s · ISO 100",
    story: "First light breaking over low-hanging clouds—warm gold meeting quiet slate twilight.",
    palette: ["#FFE7C2", "#8A6A62", "#C6DBE0"],
    aspect: [4, 5],
    preset: "sunset"
  },
  {
    id: "dusk-lamp-birds",
    file: "assets/photos/dusk-lamp-birds.jpg",
    title: "Two Sparrows at Blue Hour",
    category: "moments",
    categoryLabel: "Fleeting Moments",
    exif: "50mm · f/2.0 · 1/640s · ISO 200",
    story: "A fleeting pause above a glowing streetlamp as evening blues melted into blush pink.",
    palette: ["#C6DBE0", "#FFC2E8", "#8A6A62"],
    aspect: [3, 4],
    preset: "lamp"
  },
  {
    id: "blush-clouds",
    file: "assets/photos/blush-clouds.jpg",
    title: "Cotton Drift, High Altitude",
    category: "horizons",
    categoryLabel: "Calm Horizons",
    exif: "85mm · f/2.8 · 1/2000s · ISO 100",
    story: "Pastel rose clouds floating across crisp cerulean air—the direct inspiration for the Caelum palette.",
    palette: ["#C6DBE0", "#FFC2E8", "#FFE7C2"],
    aspect: [4, 5],
    preset: "blush"
  },
  {
    id: "storm-flock",
    file: "assets/photos/storm-flock.jpg",
    title: "Wings Through Amber Mist",
    category: "motion",
    categoryLabel: "Eternal Motion",
    exif: "70mm · f/2.8 · 1/2500s · ISO 320",
    story: "A scattering flock rising against slate storm clouds warmed by distant golden sunbreak.",
    palette: ["#D9CCC4", "#8A6A62", "#FFE7C2"],
    aspect: [3, 4],
    preset: "flock"
  },
  {
    id: "mountain-canopy",
    file: "assets/photos/mountain-canopy.jpg",
    title: "Verdant Ridge & Clear Sky",
    category: "properties",
    categoryLabel: "@ Properties",
    exif: "24mm · f/4.0 · 1/1000s · ISO 100",
    story: "Hillside retreat framing untouched canopy greens beneath an unhurried morning sky.",
    palette: ["#C6DBE0", "#D9CCC4", "#8A6A62"],
    aspect: [4, 5],
    preset: "mountain"
  },
  {
    id: "courtyard-dawn",
    file: "assets/photos/courtyard-dawn.jpg",
    title: "Stone Terrace, Morning Veil",
    category: "properties",
    categoryLabel: "@ Properties",
    exif: "28mm · f/2.8 · 1/500s · ISO 160",
    story: "Architectural study exploring how soft pastel dawn light wraps warm plaster walls.",
    palette: ["#FFE7C2", "#D9CCC4", "#8A6A62"],
    aspect: [4, 3],
    preset: "sunset"
  }
];

const PILLAR_CONTENT = {
  horizons: {
    title: "Calm Horizons",
    desc:
      "Light lingers softly between dusk and dawn. Through an unhurried lens, <strong>caelum creatives</strong> preserves quiet atmospheres, intimate portraits, and architectural spaces shaped by natural sky light.",
    exif: "35MM · F/1.8 · 1/1600S · ISO 100",
    mainIdx: 0,
    sub1Idx: 2,
    sub2Idx: 1
  },
  moments: {
    title: "Fleeting Moments",
    desc:
      "An unrepeatable glance, two silhouettes perched against twilight, a breath of wind before nightfall—honest portraits and candid studies captured in natural grace.",
    exif: "50MM · F/2.0 · 1/640S · ISO 200",
    mainIdx: 1,
    sub1Idx: 0,
    sub2Idx: 3
  },
  motion: {
    title: "Eternal Motion",
    desc:
      "Drifting cloud fronts, birds cutting across moody amber mist, and living environments that feel tactile and kinetic even in a single still frame.",
    exif: "70MM · F/2.8 · 1/2500S · ISO 320",
    mainIdx: 3,
    sub1Idx: 2,
    sub2Idx: 4
  }
};

/* ---------- Procedural Mood-Board Sky Plate Generator ---------- */
const generatedCache = new Map();

function createAtmosphericPlate(preset, w = 800, h = 1000) {
  const key = `${preset}-${w}-${h}`;
  if (generatedCache.has(key)) return generatedCache.get(key);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Sky base gradients aligned to the 5 PDF Mood Board photos
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  if (preset === "sunset") {
    sky.addColorStop(0, "#4c5f73");
    sky.addColorStop(0.48, "#b79994");
    sky.addColorStop(0.78, "#FFE7C2");
    sky.addColorStop(1, "#e59d52");
  } else if (preset === "lamp") {
    sky.addColorStop(0, "#3d6b8e");
    sky.addColorStop(0.45, "#C6DBE0");
    sky.addColorStop(0.75, "#FFC2E8");
    sky.addColorStop(1, "#8A6A62");
  } else if (preset === "blush") {
    sky.addColorStop(0, "#5fa4be");
    sky.addColorStop(0.5, "#C6DBE0");
    sky.addColorStop(1, "#FFC2E8");
  } else if (preset === "flock") {
    sky.addColorStop(0, "#3b424c");
    sky.addColorStop(0.55, "#8A6A62");
    sky.addColorStop(0.85, "#D9CCC4");
    sky.addColorStop(1, "#FFE7C2");
  } else {
    sky.addColorStop(0, "#7ab1d4");
    sky.addColorStop(0.55, "#C6DBE0");
    sky.addColorStop(1, "#D9CCC4");
  }
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Soft volumetric clouds
  const cloudCount = preset === "mountain" ? 8 : 22;
  for (let i = 0; i < cloudCount; i++) {
    const cx = ((i * 197) % (w + 160)) - 80;
    const cy = ((i * 131) % (h * 0.72)) + 40;
    const r = 110 + ((i * 53) % 160);
    const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
    const tint =
      preset === "blush"
        ? "rgba(255, 194, 232, 0.45)"
        : preset === "sunset"
        ? "rgba(255, 231, 194, 0.34)"
        : preset === "flock"
        ? "rgba(58, 43, 39, 0.22)"
        : "rgba(255, 255, 255, 0.35)";
    g.addColorStop(0, tint);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Preset-specific silhouettes
  if (preset === "sunset") {
    const sun = ctx.createRadialGradient(w * 0.52, h * 0.88, 10, w * 0.52, h * 0.88, 220);
    sun.addColorStop(0, "#fff8e8");
    sun.addColorStop(0.3, "rgba(255,231,194,0.85)");
    sun.addColorStop(1, "rgba(255,231,194,0)");
    ctx.fillStyle = sun;
    ctx.fillRect(0, h * 0.5, w, h * 0.5);
    ctx.fillStyle = "#2b211e";
    ctx.fillRect(0, h * 0.92, w, h * 0.08);
  } else if (preset === "lamp") {
    // Glowing streetlamp + perched birds
    const glow = ctx.createRadialGradient(w * 0.66, h * 0.44, 6, w * 0.66, h * 0.44, 150);
    glow.addColorStop(0, "#fffbe8");
    glow.addColorStop(0.25, "rgba(255,231,194,0.65)");
    glow.addColorStop(1, "rgba(255,231,194,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(w * 0.66, h * 0.44, 150, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#23252c";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(w * 0.36, h);
    ctx.lineTo(w * 0.36, h * 0.48);
    ctx.quadraticCurveTo(w * 0.36, h * 0.34, w * 0.58, h * 0.38);
    ctx.lineTo(w * 0.66, h * 0.41);
    ctx.stroke();

    // Two little birds
    ctx.fillStyle = "#23252c";
    [0.44, 0.62].forEach((bx, idx) => {
      const by = idx === 0 ? h * 0.35 : h * 0.37;
      ctx.beginPath();
      ctx.ellipse(w * bx, by, 11, 7, -0.2, 0, Math.PI * 2);
      ctx.arc(w * bx + 8, by - 7, 5.5, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (preset === "flock") {
    ctx.strokeStyle = "rgba(40, 32, 30, 0.8)";
    ctx.lineWidth = 2.4;
    for (let b = 0; b < 18; b++) {
      const bx = w * (0.2 + ((b * 37) % 60) / 100);
      const by = h * (0.25 + ((b * 29) % 45) / 100);
      const wing = 8 + (b % 7);
      ctx.beginPath();
      ctx.moveTo(bx - wing, by + 3);
      ctx.quadraticCurveTo(bx - wing * 0.4, by - 5, bx, by);
      ctx.quadraticCurveTo(bx + wing * 0.4, by - 5, bx + wing, by + 3);
      ctx.stroke();
    }
  } else if (preset === "mountain") {
    ctx.fillStyle = "#5f7a68";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.68);
    ctx.lineTo(w * 0.28, h * 0.54);
    ctx.lineTo(w * 0.62, h * 0.65);
    ctx.lineTo(w * 0.85, h * 0.58);
    ctx.lineTo(w, h * 0.66);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#3a563b";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.78);
    ctx.quadraticCurveTo(w * 0.35, h * 0.64, w * 0.68, h * 0.76);
    ctx.quadraticCurveTo(w * 0.86, h * 0.7, w, h * 0.75);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
  }

  // Subtle film vignette
  const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.8);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(42,30,27,0.22)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  const url = canvas.toDataURL("image/jpeg", 0.9);
  generatedCache.set(key, url);
  return url;
}

function loadPlateImage(imgEl, plate) {
  const [aw, ah] = plate.aspect || [4, 5];
  const fallbackUrl = createAtmosphericPlate(plate.preset, 720, Math.round((720 * ah) / aw));
  imgEl.onerror = () => {
    imgEl.onerror = null;
    imgEl.src = fallbackUrl;
  };
  imgEl.src = plate.file;
}

/* ---------- DOM Elements & State ---------- */
const heroScreen = document.getElementById("landing");
const heroTitle = document.getElementById("heroDynamicTitle");
const heroDesc = document.getElementById("heroDynamicDesc");
const heroExif = document.getElementById("heroExif");
const heroMainImg = document.getElementById("heroMainImg");
const heroSubImg1 = document.getElementById("heroSubImg1");
const heroSubImg2 = document.getElementById("heroSubImg2");
const heroPhotoTitle = document.getElementById("heroPhotoTitle");
const galleryGrid = document.getElementById("galleryGrid");

/* ---------- Hero Pillar Switcher ---------- */
function setPillar(key) {
  const data = PILLAR_CONTENT[key];
  if (!data) return;

  heroScreen.dataset.mood = key;
  heroTitle.textContent = data.title;
  heroDesc.innerHTML = data.desc;
  heroExif.textContent = data.exif;

  const mainPlate = MOOD_PLATES[data.mainIdx];
  loadPlateImage(heroMainImg, mainPlate);
  heroPhotoTitle.textContent = mainPlate.title;

  loadPlateImage(heroSubImg1, MOOD_PLATES[data.sub1Idx]);
  loadPlateImage(heroSubImg2, MOOD_PLATES[data.sub2Idx]);

  document.querySelectorAll(".pillar-tab").forEach((btn) => {
    const active = btn.dataset.pillar === key;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
}

document.querySelectorAll(".pillar-tab").forEach((btn) => {
  btn.addEventListener("click", () => setPillar(btn.dataset.pillar));
});

/* ---------- Parallax on Hero Stage ---------- */
const heroStage = document.getElementById("heroStage");
if (heroStage) {
  heroStage.addEventListener("mousemove", (e) => {
    const rect = heroStage.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    heroStage.querySelectorAll(".stage-card").forEach((card) => {
      const depth = Number(card.dataset.depth || 16);
      const baseRotate = card.classList.contains("stage-float-top")
        ? "rotate(-5deg)"
        : card.classList.contains("stage-float-bottom")
        ? "rotate(4deg)"
        : "";
      card.style.transform = `translate3d(${nx * depth}px, ${ny * depth}px, 0) ${baseRotate}`;
    });
  });

  heroStage.addEventListener("mouseleave", () => {
    heroStage.querySelectorAll(".stage-card").forEach((card) => {
      card.style.transform = "";
    });
  });
}

/* ---------- Gallery Rendering & Filtering ---------- */
function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";
  const items =
    filter === "all"
      ? MOOD_PLATES
      : MOOD_PLATES.filter((p) => p.category === filter);

  items.forEach((plate) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="photo-thumb-wrap">
        <img alt="${plate.title}" loading="lazy" />
        <div class="photo-hover-exif">${plate.exif}</div>
      </div>
      <div class="photo-card-body">
        <div>
          <h3 class="photo-card-title">${plate.title}</h3>
          <span class="photo-card-cat">${plate.categoryLabel}</span>
        </div>
        <div class="photo-palette-dots" aria-hidden="true">
          ${plate.palette.map((c) => `<span style="background:${c}"></span>`).join("")}
        </div>
      </div>
    `;
    loadPlateImage(card.querySelector("img"), plate);
    card.addEventListener("click", () => openLightbox(plate));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(plate);
      }
    });
    galleryGrid.appendChild(card);
  });
}

document.querySelectorAll(".filter-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    renderGallery(pill.dataset.filter);
  });
});

/* ---------- Lightbox Modal ---------- */
const lightbox = document.getElementById("lightboxModal");
const lbImage = document.getElementById("lbImage");
const lbCategory = document.getElementById("lbCategory");
const lbTitle = document.getElementById("lbTitle");
const lbStory = document.getElementById("lbStory");
const lbExif = document.getElementById("lbExif");
const lbWatermark = document.getElementById("lbWatermark");
let activePlateTitle = "";

function openLightbox(plate) {
  activePlateTitle = plate.title;
  loadPlateImage(lbImage, plate);
  lbImage.alt = plate.title;
  lbCategory.textContent = plate.categoryLabel;
  lbTitle.textContent = plate.title;
  lbStory.textContent = plate.story;
  lbExif.textContent = `EXIF · ${plate.exif}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxBackdrop").addEventListener("click", closeLightbox);
document.getElementById("lbToggleWatermark").addEventListener("click", () => {
  lbWatermark.classList.toggle("hidden");
});
document.getElementById("lbBookStyle").addEventListener("click", () => {
  closeLightbox();
  document.getElementById("shootNotes").value = `Inspired by "${activePlateTitle}" — looking for a similar sky & light mood.`;
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

/* ---------- Service Pre-fill & Swatch Copy ---------- */
document.querySelectorAll(".service-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const pkg = btn.dataset.package;
    const select = document.getElementById("serviceType");
    select.value = pkg;
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    showToast(`Selected "${pkg}"`);
  });
});

document.querySelectorAll(".swatch-chip").forEach((chip) => {
  chip.addEventListener("click", async () => {
    const hex = chip.dataset.hex;
    try {
      await navigator.clipboard.writeText(hex);
      showToast(`Copied ${hex} to clipboard`);
    } catch {
      showToast(`Brand swatch: ${hex}`);
    }
  });
});

/* ---------- Viewfinder Grid Toggle, Cursor, Mobile Menu & Booking ---------- */
const gridToggleBtn = document.getElementById("gridToggleBtn");
const viewfinderOverlay = document.getElementById("viewfinderOverlay");
gridToggleBtn.addEventListener("click", () => {
  const active = viewfinderOverlay.classList.toggle("active");
  gridToggleBtn.setAttribute("aria-pressed", active ? "true" : "false");
  showToast(active ? "Viewfinder grid enabled" : "Viewfinder grid hidden");
});

const cursorLens = document.getElementById("cursorLens");
window.addEventListener("mousemove", (e) => {
  if (!cursorLens) return;
  cursorLens.style.left = `${e.clientX}px`;
  cursorLens.style.top = `${e.clientY}px`;
});

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
mobileMenuBtn.addEventListener("click", () => {
  const open = mobileDrawer.classList.toggle("open");
  mobileMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  mobileDrawer.setAttribute("aria-hidden", open ? "false" : "true");
});
document.querySelectorAll(".drawer-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileDrawer.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("clientName").value.trim();
  const service = document.getElementById("serviceType").value;
  document.getElementById("formFeedback").textContent =
    `Thank you, ${name}. Your "${service}" inquiry has been staged—we will reply within 24 hours.`;
  e.target.reset();
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Init ---------- */
document.getElementById("yearSpan").textContent = new Date().getFullYear();
setPillar("horizons");
renderGallery("all");