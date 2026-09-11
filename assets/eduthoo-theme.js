document.addEventListener('DOMContentLoaded', () => {
  // 1. DANCING LETTERS PHYSICS INTERACTION (Hero Section)
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

  // 2. FLUID WAVE SWIPE BUTTON INTERACTION (Product Details Page)
  document.querySelectorAll('[data-wave-swipe-control]').forEach((control) => {
    const handle = control.querySelector('[data-swipe-handle]');
    const buyButton = control.querySelector('[data-buy-button]');
    const form = control.closest('form');
    if (!handle || !buyButton) return;

    let startX = null;
    let isDragging = false;
    let currentOffset = 0;
    const maxDrag = Math.min(160, Math.max(90, control.offsetWidth * 0.42));

    const onPointerDown = (e) => {
      startX = e.clientX;
      isDragging = true;
      handle.setPointerCapture?.(e.pointerId);
      handle.style.transition = 'none';
    };

    const onPointerMove = (e) => {
      if (!isDragging || startX === null) return;
      // Dragging towards the left (Buy -> Add direction per user drawing arrow <=)
      const diff = startX - e.clientX;
      currentOffset = Math.max(0, Math.min(maxDrag, diff));
      handle.style.left = `calc(50% - ${currentOffset}px)`;
    };

    const onPointerUp = (e) => {
      if (!isDragging || startX === null) return;
      isDragging = false;
      startX = null;
      handle.releasePointerCapture?.(e.pointerId);
      handle.style.transition = 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1)';

      // Dragged past 55% threshold: Trigger direct checkout!
      if (currentOffset >= maxDrag * 0.55) {
        handle.style.left = `calc(50% - ${maxDrag}px)`;
        const buyLabel = control.querySelector('[data-buy-label]');
        if (buyLabel) buyLabel.textContent = 'BUYING...';

        setTimeout(() => {
          if (buyButton) {
            buyButton.click();
          } else if (form) {
            form.submit();
          }
        }, 150);

        setTimeout(() => {
          handle.style.left = '50%';
          if (buyLabel) buyLabel.textContent = 'BUY';
        }, 1500);
      } else {
        // Spring back smoothly to center
        handle.style.left = '50%';
      }
      currentOffset = 0;
    };

    const onPointerCancel = () => {
      isDragging = false;
      startX = null;
      currentOffset = 0;
      handle.style.transition = 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      handle.style.left = '50%';
    };

    handle.addEventListener('pointerdown', onPointerDown);
    handle.addEventListener('pointermove', onPointerMove);
    handle.addEventListener('pointerup', onPointerUp);
    handle.addEventListener('pointercancel', onPointerCancel);
  });
});

