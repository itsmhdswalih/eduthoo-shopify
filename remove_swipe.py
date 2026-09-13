import re

with open('assets/eduthoo-theme.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the old swipe logic block
start_idx = content.find('// Handle Swipe logic AND BUY button direct checkout')
if start_idx != -1:
    content = content[:start_idx]

# Append new direct buy button logic
new_js = r'''
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
'''

with open('assets/eduthoo-theme.js', 'w', encoding='utf-8') as f:
    f.write(content + new_js)
print("JS rewrite complete.")
