document.addEventListener('DOMContentLoaded', () => {
  // 1. DANCING LETTERS PHYSICS INTERACTION
  const dancingLetters = document.querySelectorAll('.ed-dancing-letters .ed-dancing-letter');
  dancingLetters.forEach((letter, index) => {
    const triggerDance = () => {
      const animClass = `anim-${index % 7}`;
      if (!letter.classList.contains(animClass)) {
        letter.classList.add(animClass);
      }
    };
    letter.addEventListener('pointerenter', triggerDance);
    letter.addEventListener('touchstart', triggerDance, { passive: true });
    letter.addEventListener('animationend', (e) => {
      letter.classList.remove(`anim-${index % 7}`);
    });
  });

  
  
  // 2. SWIPE TO BUY & AJAX CART DRAWER
  
  // Drawer Elements
  const drawer = document.getElementById('ed-cart-drawer');
  const drawerBody = document.getElementById('ed-cart-drawer-body');
  const drawerTotal = document.getElementById('ed-cart-drawer-total');
  
  const openDrawer = () => {
    if (drawer) drawer.classList.add('is-open');
  };
  
  const closeDrawer = () => {
    if (drawer) drawer.classList.remove('is-open');
  };

  if (drawer) {
    drawer.querySelectorAll('[data-cart-close]').forEach(btn => {
      btn.addEventListener('click', closeDrawer);
    });
  }

  const formatMoney = (cents) => {
    return '₹' + (cents / 100).toFixed(2);
  };

  const renderCartDrawer = (cart) => {
    if (!drawerBody || !drawerTotal) return;
    
    drawerTotal.textContent = formatMoney(cart.total_price);
    
    if (cart.items.length === 0) {
      drawerBody.innerHTML = '<div class="ed-cart-drawer-empty">Your cart is currently empty.</div>';
      return;
    }
    
    let html = '';
    cart.items.forEach(item => {
      html += `
        <div class="ed-drawer-item" data-line="${item.key}">
          <img src="${item.image || ''}" alt="${item.title}" class="ed-drawer-item-image">
          <div class="ed-drawer-item-details">
            <a href="${item.url}" class="ed-drawer-item-title">${item.product_title}</a>
            <div class="ed-drawer-item-price">${formatMoney(item.price)} x ${item.quantity}</div>
            <div class="ed-drawer-item-actions">
              <button type="button" class="ed-drawer-item-remove" data-remove-key="${item.key}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });
    
    drawerBody.innerHTML = html;
    
    drawerBody.querySelectorAll('.ed-drawer-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.target.getAttribute('data-remove-key');
        updateCartItem(key, 0);
      });
    });
  };

  window.addEventListener('ed-cart-update', () => { fetchCartAndRender(); });
    const fetchCartAndRender = () => {
    fetch(window.Shopify?.routes?.root ? window.Shopify.routes.root + 'cart.js' : '/cart.js')
      .then(response => response.json())
      .then(cart => renderCartDrawer(cart))
      .catch(err => console.error(err));
  };

  const updateCartItem = (key, quantity) => {
    fetch(window.Shopify?.routes?.root ? window.Shopify.routes.root + 'cart/change.js' : '/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    })
    .then(response => response.json())
    .then(cart => renderCartDrawer(cart));
  };

  
  // Intercept cart links to open drawer
  document.querySelectorAll('a[href="/cart"], a[href*="routes.cart_url"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      fetchCartAndRender();
      openDrawer();
    });
  });

  // Override ADD button
  
  document.querySelectorAll('[data-add-button], .ed-card-button').forEach(btn => {
    const form = btn.closest('form');
    if (!form) return;
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>...</span>';
      
      const formData = new FormData(form);
      fetch(window.Shopify?.routes?.root ? window.Shopify.routes.root + 'cart/add.js' : '/cart/add.js', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Add to cart failed');
        return response.json();
      })
      .then(() => {
        btn.innerHTML = '<span>ADDED</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        window.dispatchEvent(new Event('ed-cart-update'));
        openDrawer();
      })
      .catch((e) => { 
        console.error(e);
        form.submit(); 
      });
    });
  });
  // Direct BUY button
  document.querySelectorAll('[data-buy-button-direct]').forEach((buyButton) => {
    const form = buyButton.closest('form');
    if (!form) return;

    buyButton.addEventListener('click', (e) => {
      e.preventDefault();
      const buyLabel = buyButton.querySelector('[data-buy-label]');
      if (buyLabel) buyLabel.textContent = 'CHECKOUT...';
      
      if (form.dataset.submitting) return;
      form.dataset.submitting = 'true';

      const formData = new FormData(form);
      fetch(window.Shopify?.routes?.root ? window.Shopify.routes.root + 'cart/add.js' : '/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(() => {
        window.location.href = '/checkout';
      })
      .catch(error => {
        form.submit();
      });
    });
  });

  // 3. PARALLAX FLOATING IMAGES ON SCROLL
  const floatingItems = document.querySelectorAll('.ed-floating-wrapper');
  if (floatingItems.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      floatingItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0;
        item.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

});

