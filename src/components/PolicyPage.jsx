import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PolicyPage({ initialTab = 'shipping', onBackToHome }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <main
      style={{
        backgroundColor: 'var(--color-primary-white)',
        minHeight: '80vh',
        paddingTop: '40px',
        paddingBottom: '96px'
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '36px' }}>
          <button
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-dark-gray)'
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK TO HOME</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '40px',
            borderBottom: '1px solid var(--color-light-gray)',
            paddingBottom: '16px'
          }}
        >
          {[
            { id: 'shipping', label: 'SHIPPING POLICY' },
            { id: 'returns', label: 'REFUND & RETURNS' },
            { id: 'privacy', label: 'PRIVACY POLICY' },
            { id: 'terms', label: 'TERMS OF SERVICE' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: isActive ? 'var(--color-primary-black)' : 'transparent',
                  color: isActive ? 'var(--color-primary-white)' : 'var(--color-dark-gray)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-primary-black)' : 'var(--color-light-gray)'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--color-dark-gray)' }}>
          {activeTab === 'shipping' && (
            <article>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-black)', marginBottom: '20px', textTransform: 'uppercase' }}>
                SHIPPING & DELIVERY POLICY
              </h1>
              <p>At <strong>EDUTHOO</strong>, we prioritize quick, safe, and transparent delivery across India.</p>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-black)', marginTop: '24px', marginBottom: '8px' }}>Free Shipping Threshold</h3>
              <p>All orders with a subtotal of <strong>₹999 or above</strong> qualify for 100% Free Express Delivery across India. For orders below ₹999, a nominal standard shipping fee of ₹60 is applied at checkout.</p>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-black)', marginTop: '24px', marginBottom: '8px' }}>Dispatch Time</h3>
              <p>Orders placed on business days are dispatched within 24 to 48 hours. Once dispatched, an SMS and Email notification with a live tracking link will be sent to your registered contact details.</p>
            </article>
          )}

          {activeTab === 'returns' && (
            <article>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-black)', marginBottom: '20px', textTransform: 'uppercase' }}>
                REFUND & 7-DAY REPLACEMENT GUARANTEE
              </h1>
              <p>We stand behind the quality and engineering of every product curated on <strong>EDUTHOO</strong>.</p>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-black)', marginTop: '24px', marginBottom: '8px' }}>7-Day Replacement Policy</h3>
              <p>If your item arrives damaged, defective, or different from the specified model, you are eligible for an immediate, free replacement or full refund within 7 days of delivery.</p>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-black)', marginTop: '24px', marginBottom: '8px' }}>How to Initiate</h3>
              <p>Simply email our support team at <strong>support@eduthoo.in</strong> with your order ID and a short video or photo of the defect. We will arrange a reverse pickup at zero additional cost to you.</p>
            </article>
          )}

          {activeTab === 'privacy' && (
            <article>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-black)', marginBottom: '20px', textTransform: 'uppercase' }}>
                PRIVACY POLICY
              </h1>
              <p>Your privacy and digital security are fundamental to our business. <strong>EDUTHOO</strong> collects only the minimum necessary information (name, shipping address, contact phone, and email) required to fulfill and deliver your orders.</p>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-black)', marginTop: '24px', marginBottom: '8px' }}>Payment Processing Security</h3>
              <p>We never store or have access to your credit/debit card details or UPI PINs. All financial transactions are securely processed directly by Shopify's Level 1 PCI-DSS compliant payment gateways with 256-bit bank-grade encryption.</p>
            </article>
          )}

          {activeTab === 'terms' && (
            <article>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-black)', marginBottom: '20px', textTransform: 'uppercase' }}>
                TERMS OF SERVICE
              </h1>
              <p>By visiting, browsing, or purchasing from <strong>eduthoo.in</strong>, you agree to our standard terms and conditions.</p>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-black)', marginTop: '24px', marginBottom: '8px' }}>Product Warranties</h3>
              <p>All electronic gadgets carry their respective manufacturer warranty (minimum 1-year). EDUTHOO acts as the curated distributor facilitating direct replacement and service support.</p>
            </article>
          )}
        </div>
      </div>
    </main>
  );
}
