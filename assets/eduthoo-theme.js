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

  // 2. SWIPE TO BUY (WITH BLACK FILL PROGRESS)
  document.querySelectorAll('[data-wave-swipe-control]').forEach((control) => {
    const handle = control.querySelector('[data-swipe-handle]');
    const fillEl = control.querySelector('[data-swipe-fill]');
    const buyButton = control.querySelector('[data-buy-button]');
    const form = control.closest('form');
    if (!handle || !buyButton || !form) return;

    let startX = null;
    let isDragging = false;
    let currentOffset = 0;
    
    // Calculate max drag dynamically
    const getTargetMaxDrag = () => {
      return (control.offsetWidth / 2) - (handle.offsetWidth / 2) - 4;
    };
    
    let maxDrag = getTargetMaxDrag();

    const updateVisuals = (offset) => {
      handle.style.transform = `translateX(${-offset}px) translateY(-50%)`;
      if (fillEl) {
        // Percentage of completion for the left side (which starts at 50% width)
        const percentage = Math.min(100, Math.max(0, (offset / maxDrag) * 100));
        fillEl.style.width = `calc(50% + ${percentage / 2}%)`;
      }
    };

    const onPointerDown = (e) => {
      maxDrag = getTargetMaxDrag();
      startX = e.clientX;
      isDragging = true;
      handle.setPointerCapture?.(e.pointerId);
      handle.style.transition = 'none';
      if (fillEl) fillEl.style.transition = 'none';
    };

    const onPointerMove = (e) => {
      if (!isDragging || startX === null) return;
      // Dragging left means e.clientX is smaller than startX
      const diff = startX - e.clientX;
      currentOffset = Math.max(0, Math.min(maxDrag, diff));
      updateVisuals(currentOffset);
    };

    const triggerCheckout = () => {
      const buyLabel = control.querySelector('[data-buy-label]');
      if (buyLabel) buyLabel.textContent = 'CHECKOUT...';
      
      // Force visual to 100% full
      handle.style.transform = `translateX(${-maxDrag}px) translateY(-50%)`;
      if (fillEl) fillEl.style.width = `100%`;

      // Prevent duplicate submits
      if (form.dataset.submitting) return;
      form.dataset.submitting = 'true';

      // Submit via Fetch to ensure adding to cart and going to checkout
      const formData = new FormData(form);
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        window.location.href = '/checkout';
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        form.submit(); // fallback
      });
    };

    const onPointerUp = (e) => {
      if (!isDragging || startX === null) return;
      isDragging = false;
      startX = null;
      handle.releasePointerCapture?.(e.pointerId);
      
      handle.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      if (fillEl) fillEl.style.transition = 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)';

      // Dragged past 65% threshold: Trigger checkout!
      if (currentOffset >= maxDrag * 0.65) {
        triggerCheckout();
      } else {
        // Spring back smoothly
        updateVisuals(0);
      }
      currentOffset = 0;
    };

    const onPointerCancel = () => {
      isDragging = false;
      startX = null;
      currentOffset = 0;
      handle.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      if (fillEl) fillEl.style.transition = 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      updateVisuals(0);
    };

    handle.addEventListener('pointerdown', onPointerDown);
    handle.addEventListener('pointermove', onPointerMove);
    handle.addEventListener('pointerup', onPointerUp);
    handle.addEventListener('pointercancel', onPointerCancel);
  });
});
