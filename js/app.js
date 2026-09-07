/**
 * ==============================================================================
 * EDUTHOO — STANDALONE INTERACTIVE ENGINE
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initFromConfig();
  initScrollAnimations();
  initInteractivePromo();
  initSmoothScroll();
});

/**
 * Hydrates DOM elements with data from EDUTHOO_CONFIG (js/config.js)
 */
function initFromConfig() {
  if (typeof EDUTHOO_CONFIG === 'undefined') return;

  const cfg = EDUTHOO_CONFIG;

  // Instagram links & labels
  const instagramLinks = document.querySelectorAll('.js-instagram-link');
  instagramLinks.forEach(link => {
    link.href = cfg.instagram.url || 'YOUR_INSTAGRAM_URL';
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  const instagramHandle = document.querySelector('.js-instagram-handle');
  if (instagramHandle) instagramHandle.textContent = cfg.instagram.handle;

  const instagramDesc = document.querySelector('.js-instagram-desc');
  if (instagramDesc) instagramDesc.textContent = cfg.instagram.message;

  const instagramCta = document.querySelector('.js-instagram-cta');
  if (instagramCta) instagramCta.textContent = cfg.instagram.ctaText;

  // Promotional Section
  const promoPlaceholder = document.querySelector('.js-promo-placeholder');
  if (promoPlaceholder && cfg.promotional.placeholderText) {
    if (cfg.promotional.placeholderText !== 'PROMOTIONAL_TEXT') {
      promoPlaceholder.textContent = cfg.promotional.placeholderText;
    }
  }

  const promoLink = document.querySelector('.js-promo-link');
  if (promoLink && cfg.promotional.targetUrl) {
    promoLink.href = cfg.promotional.targetUrl;
    if (cfg.promotional.targetUrl !== '#' && cfg.promotional.targetUrl !== 'PROMOTIONAL_LINK') {
      promoLink.setAttribute('target', '_blank');
      promoLink.setAttribute('rel', 'noopener noreferrer');
    }
  }

  // Populate the single Curated 6-Item Collection Grid
  const curatedContainer = document.getElementById('curated-container');
  if (curatedContainer && Array.isArray(cfg.curatedItems)) {
    curatedContainer.innerHTML = cfg.curatedItems.map((item, idx) => `
      <article class="curated-card reveal-item reveal-delay-${(idx % 3) + 1}">
        <div class="curated-media reveal-img-wrap">
          <img src="${item.image}" alt="${item.category} - ${item.name}" class="curated-img" loading="lazy" />
          <span class="curated-badge">${item.badge || 'COMING SOON'}</span>
        </div>
        <div class="curated-details">
          <div class="curated-meta-top">
            <span class="curated-num">${item.number}</span>
            <span class="curated-cat">${item.category}</span>
          </div>
          <h3 class="curated-name">${item.name}</h3>
        </div>
      </article>
    `).join('');
  }

  // Footer text
  const footerYear = document.querySelector('.js-footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

/**
 * Setup subtle scroll reveal with IntersectionObserver
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
  }, 100);

  // Subtle header border change on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.style.borderBottomColor = '#e0e0e0';
      } else {
        header.style.borderBottomColor = 'var(--border-subtle)';
      }
    }, { passive: true });
  }
}

/**
 * Promotional VIP early access subscription interaction
 */
function initInteractivePromo() {
  const form = document.getElementById('promo-form');
  const input = document.getElementById('promo-email');
  const successMsg = document.getElementById('promo-success-msg');

  if (!form || !input || !successMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (email && email.includes('@')) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
      successMsg.textContent = `Thank you. ${email} has been added to our VIP launch list.`;
    }
  });
}

/**
 * Smooth anchor jump handling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
