import re

with open('assets/eduthoo-theme.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the add to cart fetch robust
new_add_to_cart = r'''
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
'''

# Find the block to replace
start_idx = content.find("document.querySelectorAll('[data-add-button], .ed-card-button').forEach(btn => {")
end_idx = content.find("  // Direct BUY button")
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_add_to_cart + content[end_idx:]

with open('assets/eduthoo-theme.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated JS add to cart logic")
