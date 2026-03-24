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
    navLinks.forEach(function(l) {
      l.classList.remove('active');
    });
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

  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// FETCH ALL DATA — single request, handles all pages
fetch('/data.json')
  .then(response => response.json())
  .then(data => {

    // --- RESORT RATES (resort.html) ---
    const ratesContainer = document.getElementById('rates-container');
    if (ratesContainer) {
      data.rates.forEach(rate => {
        const rateCard = document.createElement('div');
        rateCard.className = 'rate-card';

        let badgeHTML = '';
        if (rate.featured) {
          badgeHTML = `<div class="rate-featured-badge">${rate.badge}</div>`;
        }

        const includesList = rate.includes
          .map(item => `<li>${item}</li>`)
          .join('');

        rateCard.innerHTML = `
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
          <ul class="rate-includes">
            ${includesList}
          </ul>
          <p class="rate-note">${rate.note}</p>
        `;

        ratesContainer.appendChild(rateCard);
      });
    }

    // --- CAFE MENU (cafe.html) ---
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
      data.cafeMenu.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category';

        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'menu-category-title';
        categoryTitle.textContent = category.category;
        categorySection.appendChild(categoryTitle);

        const menuGrid = document.createElement('div');
        menuGrid.className = 'menu-grid';

        category.items.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.className = 'menu-item';

          if (item.featured) {
            menuItem.classList.add('menu-item--featured');
          }

          let badgeHTML = '';
          if (item.badge) {
            badgeHTML = `<span class="menu-badge">${item.badge}</span>`;
          }

          let tagHTML = '';
          if (item.tag) {
            tagHTML = `<span class="menu-tag">${item.tag}</span>`;
          }

          menuItem.innerHTML = `
            <div class="menu-item-info">
              <h4 class="menu-item-name">${item.name} ${badgeHTML} ${tagHTML}</h4>
              <p class="menu-item-desc">${item.desc}</p>
            </div>
            <span class="menu-item-price">₱${item.price}</span>
          `;

          menuGrid.appendChild(menuItem);
        });

        categorySection.appendChild(menuGrid);
        menuContainer.appendChild(categorySection);
      });
    }

    // --- EVENT PACKAGES (events.html) ---
    const packagesContainer = document.getElementById('packages-container');
    if (packagesContainer) {
      data.eventPackages.forEach(pkg => {
        const pkgCard = document.createElement('div');
        pkgCard.className = 'package-card';

        if (pkg.featured) {
          pkgCard.classList.add('package-card--featured');
        }

        let badgeHTML = '';
        if (pkg.badge) {
          badgeHTML = `<div class="package-badge">${pkg.badge}</div>`;
        }

        const includesList = pkg.includes
          .map(item => `<li>${item}</li>`)
          .join('');

        const priceHTML = pkg.startPrice
          ? `<span class="package-price">Starts at PHP ${pkg.startPrice.toLocaleString()}</span>`
          : `<span class="package-price">Let's talk</span>`;

        pkgCard.innerHTML = `
          ${badgeHTML}
          <div class="package-card-top">
            <h3 class="package-type">${pkg.type}</h3>
            <p class="package-desc">${pkg.desc}</p>
            <p class="package-capacity">👥 ${pkg.capacity}</p>
          </div>
          ${priceHTML}
          <ul class="package-includes">
            ${includesList}
          </ul>
          <a href="mailto:lolalys.resort01@gmail.com" class="package-btn ${pkg.featured ? 'package-btn--light' : ''}">Inquire Now</a>
        `;

        packagesContainer.appendChild(pkgCard);
      });
    }

    // --- PROMO PACKAGES (events.html) ---
    const promoContainer = document.getElementById('promo-container');
    if (promoContainer) {
      data.promoPackages.forEach(pkg => {
        const promoCard = document.createElement('div');
        promoCard.className = 'promo-card';

        if (pkg.featured) {
          promoCard.classList.add('promo-card--featured');
        }

        const includesList = pkg.includes
          .map(item => `<li>${item}</li>`)
          .join('');

        promoCard.innerHTML = `
          <div class="promo-card-header">
            <h3 class="promo-name">${pkg.name}</h3>
            <p class="promo-guests">${pkg.guests}</p>
          </div>
          <div class="promo-price-block">
            <span class="promo-original">PHP ${pkg.originalPrice.toLocaleString()}</span>
            <span class="promo-amount">PHP ${pkg.promoPrice.toLocaleString()}</span>
            <span class="promo-unit">only</span>
          </div>
          <ul class="package-includes">
            ${includesList}
          </ul>
          <a href="mailto:lolalys.resort01@gmail.com" class="package-btn ${pkg.featured ? 'package-btn--light' : ''}">Book ${pkg.name}</a>
        `;

        promoContainer.appendChild(promoCard);
      });
    }

    // --- RESORT GALLERY (resort.html) ---
    const resortGalleryContainer = document.getElementById('resort-gallery-container');
    if (resortGalleryContainer) {
      data.galleryResort.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
          <img src="${photo.image}" alt="${photo.caption}" loading="lazy">
          <p>${photo.caption}</p>
        `;
        resortGalleryContainer.appendChild(galleryItem);
      });
    }

    // --- CAFE GALLERY (cafe.html) ---
    const cafeGalleryContainer = document.getElementById('cafe-gallery-container');
    if (cafeGalleryContainer) {
      data.galleryCafe.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
          <img src="${photo.image}" alt="${photo.caption}" loading="lazy">
          <p>${photo.caption}</p>
        `;
        cafeGalleryContainer.appendChild(galleryItem);
      });
    }

    // --- EVENTS GALLERY (events.html) ---
    const eventsGalleryContainer = document.getElementById('events-gallery-container');
    if (eventsGalleryContainer) {
      data.galleryEvents.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        if (photo.large) {
          galleryItem.classList.add('events-gallery-item--large');
        }

        galleryItem.innerHTML = `
          <img src="${photo.image}" alt="${photo.caption}">
        `;

        eventsGalleryContainer.appendChild(galleryItem);
      });
    }

  })
  .catch(error => console.error('Error loading data.json:', error));