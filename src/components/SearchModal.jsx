import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  products = [],
  onSelectProduct
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '680px',
          margin: '80px auto 0',
          backgroundColor: 'var(--color-primary-white)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--color-light-gray)'
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-light-gray)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Search size={20} color="var(--color-dark-gray)" />
          <input
            type="text"
            placeholder="Search gadgets, accessories, smart devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              backgroundColor: 'transparent',
              color: 'var(--color-primary-black)'
            }}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={{ color: 'var(--color-medium-gray)' }}>
              Clear
            </button>
          )}
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '24px' }}>
          {searchTerm.trim() === '' ? (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-medium-gray)', textTransform: 'uppercase', marginBottom: '12px' }}>
                POPULAR SEARCHES
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Wireless Earbuds', 'MagSafe Stand', 'Ambient Light', 'GaN Charger', 'Pocket Tool', 'Keyboard'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      backgroundColor: 'var(--color-soft-gray)',
                      borderRadius: 'var(--radius-btn)',
                      color: 'var(--color-primary-black)'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                NO PRODUCTS FOUND
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-medium-gray)' }}>
                Try another search term like "gadgets", "stand", or "charger".
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderRadius: 'var(--radius-btn)',
                    cursor: 'pointer',
                    transition: 'background-color var(--transition-fast)'
                  }}
                  className="search-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'contain',
                        backgroundColor: 'var(--color-off-white)',
                        borderRadius: 'var(--radius-btn)',
                        padding: '4px'
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{p.title}</h4>
                      <span style={{ fontSize: '12px', color: 'var(--color-medium-gray)' }}>
                        {p.category} — ₹{p.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--color-medium-gray)" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .search-item:hover {
          background-color: var(--color-soft-gray);
        }
      `}</style>
    </div>
  );
}
