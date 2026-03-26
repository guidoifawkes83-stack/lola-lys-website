// SLIDING TAGLINES (homepage only)
const taglines = document.querySelectorAll('.hero-tagline');
const tdots = document.querySelectorAll('.tdot');
let currentTagline = 0;

if (taglines.length > 0) {
  setInterval(function() {
    taglines[currentTagline].classList.remove('active');
    tdots[currentTagline].classList.remove('active');
    currentTagline = (currentTagline + 1) % taglines.length;
    taglines[currentTagline].classList.add('active');
    tdots[currentTagline].classList.add('active');
  }, 3500);
}

// ACTIVE NAV LINK
const navLinks = document.querySelectorAll('.nav-right a');
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.forEach(function(l) { l.classList.remove('active'); });
    this.classList.add('active');
  });
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ─── LIGHTBOX ───────────────────────────────────────────────
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
  <div class="lightbox-overlay"></div>
  <div class="lightbox-box">
    <button class="lightbox-close">✕</button>
    <img class="lightbox-img" src="" alt="">
    <p class="lightbox-caption"></p>
  </div>
`;
document.body.appendChild(lightbox);

function openLightbox(src, caption) {
  lightbox.querySelector('.lightbox-img').src = src;
  lightbox.querySelector('.lightbox-caption').textContent = caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});

// ─── HELPER ─────────────────────────────────────────────────
function fetchJSON(path) {
  return fetch(path).then(r => {
    if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
    return r.json();
  });
}

// ─── RESORT RATES ───────────────────────────────────────────
const ratesContainer = document.getElementById('rates-container');
if (ratesContainer) {
  fetchJSON('data/rates.json').then(data => {
    data.rates.forEach(rate => {
      const card = document.createElement('div');
      card.className = 'rate-card';
      let badgeHTML = rate.featured ? `<div class="rate-featured-badge">${rate.badge}</div>` : '';
      const includesList = rate.includes.map(i => `<li>${i}</li>`).join('');
      card.innerHTML = `
        ${badgeHTML}
        <div class="rate-card-top">
          <span class="rate-icon">${rate.icon}</span>
          <h3 class="rate-type">${rate.type}</h3>
          <p class="rate-desc">${rate.desc}</p>
        </div>
        <div class="rate-price-block">
          <span class="rate-amount">PHP ${rate.price.toLocaleString()}</span>
          <span class="rate-unit">${rate.unit}</span>
        </div>
        <ul class="rate-includes">${includesList}</ul>
        <p class="rate-note">${rate.note}</p>
      `;
      ratesContainer.appendChild(card);
    });
  }).catch(e => console.error(e));
}

// ─── CAFE MENU (with thumbnails) ────────────────────────────
const menuContainer = document.getElementById('menu-container');
if (menuContainer) {
  fetchJSON('data/cafe-menu.json').then(data => {
    data.cafeMenu.forEach(category => {
      const section = document.createElement('div');
      section.className = 'menu-category';

      const title = document.createElement('h3');
      title.className = 'menu-category-title';
      title.textContent = category.category;
      section.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'menu-grid';

      category.items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'menu-item';
        if (item.featured) el.classList.add('menu-item--featured');

        const badgeHTML = item.badge ? `<span class="menu-badge">${item.badge}</span>` : '';
        const tagHTML = item.tag ? `<span class="menu-tag">${item.tag}</span>` : '';
        const thumbSrc = item.image || `https://placehold.co/80x80/2a1a0a/F4D03F?text=${encodeURIComponent(item.name)}`;
        const fullSrc = item.image || `https://placehold.co/800x500/2a1a0a/F4D03F?text=${encodeURIComponent(item.name)}`;

        el.innerHTML = `
          <img class="menu-item-thumb" src="${thumbSrc}" alt="${item.name}" loading="lazy">
          <div class="menu-item-info">
            <h4 class="menu-item-name">${item.name} ${badgeHTML} ${tagHTML}</h4>
            <p class="menu-item-desc">${item.desc}</p>
          </div>
          <span class="menu-item-price">₱${item.price}</span>
        `;

        el.querySelector('.menu-item-thumb').addEventListener('click', function() {
          openLightbox(fullSrc, item.name);
        });

        grid.appendChild(el);
      });

      section.appendChild(grid);
      menuContainer.appendChild(section);
    });
  }).catch(e => console.error(e));
}

// ─── EVENT PACKAGES ─────────────────────────────────────────
const packagesContainer = document.getElementById('packages-container');
if (packagesContainer) {
  fetchJSON('data/event-packages.json').then(data => {
    data.eventPackages.forEach(pkg => {
      const card = document.createElement('div');
      card.className = 'package-card';
      if (pkg.featured) card.classList.add('package-card--featured');
      const badgeHTML = pkg.badge ? `<div class="package-badge">${pkg.badge}</div>` : '';
      const includesList = pkg.includes.map(i => `<li>${i}</li>`).join('');
      const priceHTML = pkg.startPrice
        ? `<span class="package-price">Starts at PHP ${pkg.startPrice.toLocaleString()}</span>`
        : `<span class="package-price">Let's talk</span>`;
      card.innerHTML = `
        ${badgeHTML}
        <div class="package-card-top">
          <h3 class="package-type">${pkg.type}</h3>
          <p class="package-desc">${pkg.desc}</p>
          <p class="package-capacity">👥 ${pkg.capacity}</p>
        </div>
        ${priceHTML}
        <ul class="package-includes">${includesList}</ul>
        <a href="mailto:lolalys.resort01@gmail.com" class="package-btn ${pkg.featured ? 'package-btn--light' : ''}">Inquire Now</a>
      `;
      packagesContainer.appendChild(card);
    });
  }).catch(e => console.error(e));
}

// ─── PROMO PACKAGES ─────────────────────────────────────────
const promoContainer = document.getElementById('promo-container');
if (promoContainer) {
  fetchJSON('data/promo-packages.json').then(data => {
    data.promoPackages.forEach(pkg => {
      const card = document.createElement('div');
      card.className = 'promo-card';
      if (pkg.featured) card.classList.add('promo-card--featured');
      const includesList = pkg.includes.map(i => `<li>${i}</li>`).join('');
      card.innerHTML = `
        <div class="promo-card-header">
          <h3 class="promo-name">${pkg.name}</h3>
          <p class="promo-guests">${pkg.guests}</p>
        </div>
        <div class="promo-price-block">
          <span class="promo-original">PHP ${pkg.originalPrice.toLocaleString()}</span>
          <span class="promo-amount">PHP ${pkg.promoPrice.toLocaleString()}</span>
          <span class="promo-unit">only</span>
        </div>
        <ul class="package-includes">${includesList}</ul>
        <a href="mailto:lolalys.resort01@gmail.com" class="package-btn ${pkg.featured ? 'package-btn--light' : ''}">Book ${pkg.name}</a>
      `;
      promoContainer.appendChild(card);
    });
  }).catch(e => console.error(e));
}

// ─── RESORT GALLERY (with lightbox) ─────────────────────────
const resortGallery = document.getElementById('resort-gallery-container');
if (resortGallery) {
  fetchJSON('data/gallery-resort.json').then(data => {
    data.galleryResort.forEach(photo => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `<img src="${photo.image}" alt="${photo.caption}" loading="lazy"><p>${photo.caption}</p>`;
      item.querySelector('img').addEventListener('click', function() {
        openLightbox(photo.image, photo.caption);
      });
      resortGallery.appendChild(item);
    });
  }).catch(e => console.error(e));
}

// ─── CAFE GALLERY (with lightbox) ───────────────────────────
const cafeGallery = document.getElementById('cafe-gallery-container');
if (cafeGallery) {
  fetchJSON('data/gallery-cafe.json').then(data => {
    data.galleryCafe.forEach(photo => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `<img src="${photo.image}" alt="${photo.caption}" loading="lazy"><p>${photo.caption}</p>`;
      item.querySelector('img').addEventListener('click', function() {
        openLightbox(photo.image, photo.caption);
      });
      cafeGallery.appendChild(item);
    });
  }).catch(e => console.error(e));
}

// ─── EVENTS GALLERY (with lightbox) ─────────────────────────
const eventsGallery = document.getElementById('events-gallery-container');
if (eventsGallery) {
  fetchJSON('data/gallery-events.json').then(data => {
    data.galleryEvents.forEach(photo => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      if (photo.large) item.classList.add('events-gallery-item--large');
      item.innerHTML = `<img src="${photo.image}" alt="${photo.caption}" loading="lazy">`;
      item.querySelector('img').addEventListener('click', function() {
        openLightbox(photo.image, photo.caption);
      });
      eventsGallery.appendChild(item);
    });
  }).catch(e => console.error(e));
}
