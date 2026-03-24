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
// FETCH AND DISPLAY RATES FROM data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const ratesContainer = document.getElementById('rates-container');
    
    if (ratesContainer) {
      data.rates.forEach(rate => {
        // Create the rate card
        const rateCard = document.createElement('div');
        rateCard.className = 'rate-card';
        
        // Add featured badge if needed
        let badgeHTML = '';
        if (rate.featured) {
          badgeHTML = `<div class="rate-featured-badge">${rate.badge}</div>`;
        }
        
        // Build the includes list
        const includesList = rate.includes
          .map(item => `<li>${item}</li>`)
          .join('');
        
        // Build the card HTML
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
        
        // Add the card to the container
        ratesContainer.appendChild(rateCard);
      });
    }
  })
  .catch(error => console.error('Error loading rates:', error));
// FETCH AND DISPLAY CAFE MENU FROM data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById('menu-container');
    
    if (menuContainer) {
      data.cafeMenu.forEach(category => {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category';
        
        // Category title
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'menu-category-title';
        categoryTitle.textContent = category.category;
        categorySection.appendChild(categoryTitle);
        
        // Menu items grid
        const menuGrid = document.createElement('div');
        menuGrid.className = 'menu-grid';
        
        category.items.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.className = 'menu-item';
          
          // Add featured class if needed
          if (item.featured) {
            menuItem.classList.add('menu-item--featured');
          }
          
          // Build badge HTML if featured
          let badgeHTML = '';
          if (item.badge) {
            badgeHTML = `<span class="menu-badge">${item.badge}</span>`;
          }
          
          // Build tag HTML if exists
          let tagHTML = '';
          if (item.tag) {
            tagHTML = `<span class="menu-tag">${item.tag}</span>`;
          }
          
          // Build item HTML
          menuItem.innerHTML = `
            <div class="menu-item-info">
              <h4 class="menu-item-name">${item.name} ${badgeHTML}</h4>
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
  })
  .catch(error => console.error('Error loading menu:', error));
  // FETCH AND DISPLAY PROMO PACKAGES FROM data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const promoContainer = document.getElementById('promo-container');
    
    if (promoContainer) {
      data.promoPackages.forEach(pkg => {
        // Create the promo card
        const promoCard = document.createElement('div');
        promoCard.className = 'promo-card';
        
        // Add featured class if needed
        if (pkg.featured) {
          promoCard.classList.add('promo-card--featured');
        }
        
        // Build the includes list
        const includesList = pkg.includes
          .map(item => `<li>${item}</li>`)
          .join('');
        
        // Build the promo card HTML
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
        
        // Add the card to the container
        promoContainer.appendChild(promoCard);
      });
    }
  })
  .catch(error => console.error('Error loading promo packages:', error));
  // FETCH AND DISPLAY RESORT GALLERY FROM data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
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
  })
  .catch(error => console.error('Error loading resort gallery:', error));

// FETCH AND DISPLAY CAFE GALLERY FROM data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
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
  })
  .catch(error => console.error('Error loading cafe gallery:', error));

// FETCH AND DISPLAY EVENTS GALLERY FROM data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const eventsGalleryContainer = document.getElementById('events-gallery-container');
    
    if (eventsGalleryContainer) {
      data.galleryEvents.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Add large class if marked
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
  .catch(error => console.error('Error loading events gallery:', error));