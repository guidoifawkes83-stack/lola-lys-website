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