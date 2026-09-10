document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-purchase-control]').forEach((control) => {
    const buyButton = control.querySelector('[data-buy-button]');
    const handle = control.querySelector('.ed-swipe-handle');
    if (!buyButton || !handle) return;

    let startX = null;
    let activated = false;
    buyButton.addEventListener('pointerdown', (event) => {
      startX = event.clientX;
      activated = false;
      buyButton.setPointerCapture?.(event.pointerId);
    });
    buyButton.addEventListener('pointermove', (event) => {
      if (startX === null) return;
      const max = Math.max(1, buyButton.clientWidth - 48);
      const distance = Math.min(max, Math.max(0, startX - event.clientX));
      handle.style.transform = `translate(${-distance}px, -50%)`;
    });
    buyButton.addEventListener('pointerup', (event) => {
      if (startX === null) return;
      const max = Math.max(1, buyButton.clientWidth - 48);
      const distance = Math.max(0, startX - event.clientX);
      startX = null;
      handle.style.transform = '';
      if (distance >= max * 0.82) {
        activated = true;
        event.preventDefault();
        buyButton.click();
      }
    });
    buyButton.addEventListener('click', (event) => {
      if (activated) activated = false;
    });
    buyButton.addEventListener('pointercancel', () => { startX = null; handle.style.transform = ''; });
  });
});
