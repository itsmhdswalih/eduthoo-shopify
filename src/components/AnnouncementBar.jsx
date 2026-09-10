import React from 'react';

export default function AnnouncementBar({ message = "FREE DELIVERY ON ORDERS ABOVE ₹999" }) {
  return (
    <div style={{
      backgroundColor: 'var(--color-primary-black)',
      color: 'var(--color-primary-white)',
      padding: '8px 16px',
      textAlign: 'center',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}>
      <span>✦</span>
      <span>{message}</span>
      <span>✦</span>
    </div>
  );
}
