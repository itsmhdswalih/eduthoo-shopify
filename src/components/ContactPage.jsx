import React, { useState } from 'react';
import { ArrowLeft, Mail, Clock, MapPin, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContactPage({ onBackToHome }) {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Orders are processed and dispatched within 24-48 business hours. Delivery typically takes 2-5 days across India with live tracking updates.'
    },
    {
      q: 'What is your return and refund policy?',
      a: 'We offer a 7-day hassle-free replacement or full refund on all products if received defective or damaged. Simply contact us with your order ID.'
    },
    {
      q: 'How do I track my shipment?',
      a: 'Once your order is shipped, you will automatically receive an SMS and email notification with a direct tracking link.'
    },
    {
      q: 'Are all products covered under warranty?',
      a: 'Yes, all EDUTHOO electronic and smart gadgets come with a minimum 1-year brand warranty against manufacturing defects.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      style={{
        backgroundColor: 'var(--color-primary-white)',
        minHeight: '80vh',
        paddingTop: '40px',
        paddingBottom: '96px'
      }}
    >
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Back Button */}
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

        {/* Page Title */}
        <div style={{ marginBottom: '48px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-medium-gray)',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            WE ARE HERE TO HELP
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--color-primary-black)'
            }}
          >
            CONTACT CUSTOMER CARE
          </h1>
        </div>

        {/* Two-Column Grid: Left Contact Info & Form, Right FAQs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}
        >
          {/* Left: Contact Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  padding: '32px',
                  backgroundColor: 'var(--color-soft-gray)',
                  borderRadius: 'var(--radius-card)',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'var(--color-primary-black)', color: 'var(--color-primary-white)', marginBottom: '16px' }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  Message Received
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-dark-gray)' }}>
                  Thank you for reaching out. Our support team will respond to your email within 12-24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    YOUR FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '13px',
                      border: '1px solid var(--color-light-gray)',
                      borderRadius: 'var(--radius-input)',
                      outline: 'none',
                      backgroundColor: 'var(--color-off-white)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '13px',
                      border: '1px solid var(--color-light-gray)',
                      borderRadius: 'var(--radius-input)',
                      outline: 'none',
                      backgroundColor: 'var(--color-off-white)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    ORDER ID (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #ED-10492"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '13px',
                      border: '1px solid var(--color-light-gray)',
                      borderRadius: 'var(--radius-input)',
                      outline: 'none',
                      backgroundColor: 'var(--color-off-white)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    YOUR MESSAGE
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="How can we assist you?"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '13px',
                      border: '1px solid var(--color-light-gray)',
                      borderRadius: 'var(--radius-input)',
                      outline: 'none',
                      backgroundColor: 'var(--color-off-white)'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '13px', marginTop: '8px' }}>
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            )}

            {/* Direct Contact Cards */}
            <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} color="var(--color-dark-gray)" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>support@eduthoo.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={18} color="var(--color-dark-gray)" />
                <span style={{ fontSize: '13px', color: 'var(--color-dark-gray)' }}>Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} color="var(--color-dark-gray)" />
                <span style={{ fontSize: '13px', color: 'var(--color-dark-gray)' }}>Kerala, India</span>
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--color-light-gray)',
                      borderRadius: 'var(--radius-card)',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 700,
                        backgroundColor: isOpen ? 'var(--color-soft-gray)' : 'var(--color-primary-white)'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && (
                      <div style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--color-dark-gray)', lineHeight: 1.6, backgroundColor: 'var(--color-primary-white)' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
