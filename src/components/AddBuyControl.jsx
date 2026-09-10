import React, { useRef, useState } from 'react';
import { Check, ChevronLeft, ShoppingBag } from 'lucide-react';

/**
 * A joined purchase control: tapping the left half adds to cart, while the
 * right half can either be tapped or dragged left to continue straight to checkout.
 */
export default function AddBuyControl({ isAdded, onAdd, onBuy }) {
  const buyZoneRef = useRef(null);
  const pointerStartRef = useRef(null);
  const ignoreClickRef = useRef(false);
  const hasPurchasedRef = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const triggerBuy = () => {
    if (hasPurchasedRef.current) return;

    hasPurchasedRef.current = true;
    setDragOffset(buyZoneRef.current?.offsetWidth || 0);
    onBuy();
    window.setTimeout(() => {
      hasPurchasedRef.current = false;
      setDragOffset(0);
    }, 900);
  };

  const resetDrag = () => {
    pointerStartRef.current = null;
    setIsDragging(false);
    if (!hasPurchasedRef.current) setDragOffset(0);
  };

  const handlePointerDown = (event) => {
    if (hasPurchasedRef.current) return;

    pointerStartRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (pointerStartRef.current === null || !buyZoneRef.current) return;

    const distance = Math.max(0, pointerStartRef.current - event.clientX);
    const maxDistance = Math.max(1, buyZoneRef.current.offsetWidth - 48);
    setDragOffset(Math.min(maxDistance, distance));
  };

  const handlePointerUp = (event) => {
    if (pointerStartRef.current === null) return;

    const maxDistance = Math.max(1, buyZoneRef.current?.offsetWidth - 48);
    const releaseDistance = Math.max(0, pointerStartRef.current - event.clientX);
    const didDrag = releaseDistance > 8;
    if (releaseDistance >= maxDistance * 0.82) {
      ignoreClickRef.current = true;
      triggerBuy();
    } else if (didDrag) {
      ignoreClickRef.current = true;
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    resetDrag();
  };

  const handleBuyClick = () => {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false;
      return;
    }
    triggerBuy();
  };

  const handleBuyKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      triggerBuy();
    }
  };

  return (
    <div className="purchase-combo" aria-label="Purchase options">
      <button
        type="button"
        onClick={onAdd}
        className="purchase-add-action"
      >
        {isAdded ? <Check size={17} /> : <ShoppingBag size={17} />}
        <span>{isAdded ? 'ADDED TO CART' : 'ADD TO CART'}</span>
      </button>

      <div
        ref={buyZoneRef}
        className={`purchase-buy-action ${isDragging ? 'is-dragging' : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Buy now. Tap to buy immediately, or swipe left to buy."
        onClick={handleBuyClick}
        onKeyDown={handleBuyKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetDrag}
      >
        <span className="purchase-buy-track-label" aria-hidden="true">
          BUY NOW
        </span>
        <span
          className="purchase-buy-thumb"
          aria-hidden="true"
          style={{ transform: `translateX(-${dragOffset}px)` }}
        >
          <ChevronLeft size={18} />
        </span>
      </div>
    </div>
  );
}
