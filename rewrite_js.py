import re

with open('assets/eduthoo-theme.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('// 2. SWIPE TO BUY & AJAX CART DRAWER')
if start_idx != -1:
    content = content[:start_idx]

new_js = r'''
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

  // Override ADD button
  document.querySelectorAll('[data-add-button]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const form = btn.closest('form');
      if (!form) return;
      
      const formData = new FormData(form);
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>...</span>';
      
      fetch(window.Shopify?.routes?.root ? window.Shopify.routes.root + 'cart/add.js' : '/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(() => {
        btn.innerHTML = '<span>ADDED</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        fetchCartAndRender();
        openDrawer();
      })
      .catch(() => { form.submit(); });
    });
  });

  // Handle Swipe logic AND BUY button direct checkout
  document.querySelectorAll('[data-wave-swipe-control]').forEach((control) => {
    const handle = control.querySelector('[data-swipe-handle]');
    const buyButton = control.querySelector('[data-buy-button]');
    const form = control.closest('form');
    if (!handle || !buyButton || !form) return;

    let startX = null;
    let isDragging = false;
    let currentOffset = 0;
    
    const getTargetMaxDrag = () => {
      return (control.offsetWidth / 2) - (handle.offsetWidth / 2) - 4;
    };
    
    let maxDrag = getTargetMaxDrag();

    const triggerCheckout = () => {
      const buyLabel = control.querySelector('[data-buy-label]');
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
    };
    
    // Direct Click on BUY button triggers checkout!
    buyButton.addEventListener('click', (e) => {
      e.preventDefault();
      triggerCheckout();
    });

    const updateVisuals = (offset) => {
      handle.style.transform = `translateX(${-offset}px)`;
    };

    const onPointerDown = (e) => {
      maxDrag = getTargetMaxDrag();
      startX = e.clientX;
      isDragging = true;
      handle.setPointerCapture?.(e.pointerId);
      handle.style.transition = 'none';
    };

    const onPointerMove = (e) => {
      if (!isDragging || startX === null) return;
      const diff = startX - e.clientX;
      currentOffset = Math.max(0, Math.min(maxDrag, diff));
      updateVisuals(currentOffset);
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      
      if (currentOffset >= maxDrag * 0.65) {
        handle.style.transform = `translateX(${-maxDrag}px)`;
        triggerCheckout();
      } else {
        currentOffset = 0;
        handle.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        updateVisuals(0);
      }
    };

    const onPointerCancel = () => {
      isDragging = false;
      startX = null;
      currentOffset = 0;
      handle.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      updateVisuals(0);
    };

    handle.addEventListener('pointerdown', onPointerDown);
    handle.addEventListener('pointermove', onPointerMove);
    handle.addEventListener('pointerup', onPointerUp);
    handle.addEventListener('pointercancel', onPointerCancel);
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
'''

with open('assets/eduthoo-theme.js', 'w', encoding='utf-8') as f:
    f.write(content + new_js)
print("JS rewrite complete with raw string variables.")
