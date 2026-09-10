import React from 'react';
import { X, ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  onSelectCategory,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact
}) {
  if (!isOpen) return null;

  const links = [
    { label: 'ALL PRODUCTS', filter: 'all' },
    { label: 'GADGETS', filter: 'Gadgets' },
    { label: 'TECH & DESK', filter: 'Tech' },
    { label: 'HOME & LIVING', filter: 'Home' },
    { label: 'TRENDING FINDS', filter: 'trending' }
  ];

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '85%',
          maxWidth: '360px',
          backgroundColor: 'var(--color-primary-white)',
          zIndex: 1001,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'slideInLeft 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: '10px 0 40px rgba(0,0,0,0.1)'
        }}
      >
        <style>{`
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
            <button
              onClick={() => {
                onNavigateHome();
                onClose();
              }}
              style={{ padding: 0, display: 'flex', alignItems: 'center' }}
              aria-label="EDUTHOO Home"
            >
              <img 
                src="/assets/logo/eduthoo-emblem-clean.png" 
                alt="EDUTHOO" 
                style={{ height: '38px', objectFit: 'contain' }}
              />
            </button>
            <button 
              onClick={onClose} 
              className="btn-icon" 
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onSelectCategory(link.filter);
                  onClose();
                }}
                style={{
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-soft-gray)'
                }}
              >
                <span>{link.label}</span>
                <ArrowRight size={16} color="var(--color-medium-gray)" />
              </button>
            ))}

            <button
              onClick={() => {
                onNavigateAbout();
                onClose();
              }}
              style={{
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--color-soft-gray)'
              }}
            >
              <span>ABOUT EDUTHOO</span>
              <ArrowRight size={16} color="var(--color-medium-gray)" />
            </button>

            <button
              onClick={() => {
                onNavigateContact();
                onClose();
              }}
              style={{
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--color-soft-gray)'
              }}
            >
              <span>CONTACT CARE</span>
              <ArrowRight size={16} color="var(--color-medium-gray)" />
            </button>
          </nav>
        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid var(--color-light-gray)' }}>
          <p style={{ fontSize: '11px', color: 'var(--color-medium-gray)', marginBottom: '12px', letterSpacing: '0.05em' }}>
            SMART THINGS FOR EVERYDAY LIFE
          </p>
          <a 
            href="https://www.instagram.com/eduthoo.in/" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '13px', 
              fontWeight: 600 
            }}
          >
            <InstagramIcon size={16} />
            <span>@eduthoo.in</span>
          </a>
        </div>
      </div>
    </div>
  );
}
