import React, { useRef, useState, useEffect } from 'react';
import { ShoppingBag, Zap, Check, ChevronLeft } from 'lucide-react';

export default function WaveSwipeButton({
  onAdd,
  onBuy,
  isAdded = false,
  className = ""
}) {
  const containerRef = useRef(null);
  const [dragX, setDragX] = useState(0); // Offset in pixels dragged left
  const [isDragging, setIsDragging] = useState(false);
  const [swipedSuccess, setSwipedSuccess] = useState(false);
  const startXRef = useRef(null);
  const maxDragRef = useRef(140);

  useEffect(() => {
    if (containerRef.current) {
      maxDragRef.current = Math.max(100, containerRef.current.offsetWidth * 0.42);
    }
  }, []);

  // Handle Drag / Swipe
  const handlePointerDown = (e) => {
    if (swipedSuccess) return;
    startXRef.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || startXRef.current === null) return;
    // Dragging towards the left (Buy -> Add direction per drawing arrow `<=`)
    const diff = startXRef.current - e.clientX;
    const clamped = Math.max(0, Math.min(maxDragRef.current, diff));
    setDragX(clamped);
  };

  const handlePointerUp = (e) => {
    if (!isDragging || startXRef.current === null) return;
    setIsDragging(false);

    // If dragged more than 60% of max drag, trigger Buy Now!
    if (dragX >= maxDragRef.current * 0.6) {
      setSwipedSuccess(true);
      setDragX(maxDragRef.current);
      onBuy();
      setTimeout(() => {
        setSwipedSuccess(false);
        setDragX(0);
      }, 1200);
    } else {
      // Spring back
      setDragX(0);
    }
    startXRef.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    startXRef.current = null;
    setDragX(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Outer Pill Shape Button */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          height: '58px',
          backgroundColor: '#000000',
          borderRadius: '9999px',
          border: '1.5px solid #222222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
          userSelect: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          cursor: 'pointer'
        }}
        className={className}
      >
        {/* LEFT ZONE: "ADD" / ADD TO CART */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#FFFFFF',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            paddingLeft: '16px',
            zIndex: 1,
            transition: 'background-color 0.15s ease'
          }}
          aria-label="Add to cart"
        >
          {isAdded ? (
            <>
              <Check size={16} color="#4ADE80" />
              <span style={{ color: '#4ADE80' }}>ADDED</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>ADD</span>
            </>
          )}
        </button>

        {/* CENTER WAVE DIVIDER & DRAGGABLE ARROW HANDLE (Modeled strictly on user sketch) */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{
            position: 'absolute',
            left: `calc(50% - ${dragX}px)`,
            top: 0,
            bottom: 0,
            width: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateX(-50%)',
            touchAction: 'none',
            zIndex: 10,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* SVG Vertical Fluid Wave Line */}
          <svg
            viewBox="0 0 30 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {/* Water-like Sine Wave dividing boundary */}
            <path
              d="M15,0 C6,25 24,50 15,75 C6,90 15,100 15,100"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>

          {/* Draggable Wave Arrow Pill / Handle */}
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              zIndex: 2,
              transform: isDragging ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.15s ease'
            }}
            title="Swipe left to Buy"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </div>
        </div>

        {/* RIGHT ZONE: "BUY" / BUY NOW */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBuy();
          }}
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#FFFFFF',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            paddingRight: '16px',
            zIndex: 1,
            transition: 'background-color 0.15s ease'
          }}
          aria-label="Buy now"
        >
          {swipedSuccess ? (
            <>
              <Check size={16} color="#FFFFFF" />
              <span>BUYING...</span>
            </>
          ) : (
            <>
              <Zap size={16} fill="#FFFFFF" />
              <span>BUY</span>
            </>
          )}
        </button>
      </div>

      {/* Subtitle / Hint under button: "swipe" per user's sketch */}
      <span
        style={{
          marginTop: '6px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'lowercase',
          color: 'var(--color-medium-gray)',
          userSelect: 'none'
        }}
      >
        swipe
      </span>
    </div>
  );
}
