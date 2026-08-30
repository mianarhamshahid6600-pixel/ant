import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, MessageSquare, MapPin, Clock, 
  Send, CheckCircle2, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage = () => {
  const { distributor, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    projectType: 'Residential Project',
    interests: ['Switches & Sockets'],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInterestToggle = (item) => {
    setFormData(prev => {
      const exists = prev.interests.includes(item);
      return {
        ...prev,
        interests: exists 
          ? prev.interests.filter(i => i !== item)
          : [...prev.interests, item]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please enter your name and phone number.', 'warning');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    showToast('Your price inquiry has been sent to Alnoor Traders!');

    const waText = `*PRICE & PRODUCT INQUIRY - ALNOOR TRADERS*\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Company:* ${formData.company || 'Personal Home'}\n` +
      `*Project Type:* ${formData.projectType}\n` +
      `*Interested In:* ${formData.interests.join(', ')}\n` +
      `*Notes:* ${formData.message || 'Please send price quotation.'}\n`;

    setTimeout(() => {
      window.open(`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent(waText)}`, '_blank');
    }, 1200);
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
          <div className="badge badge-prime" style={{ marginBottom: '0.75rem' }}>
            <Phone size={13} />
            Get in Touch
          </div>
          <h1>
            Contact <span className="text-electric-blue">Alnoor Traders</span>
          </h1>
          <p style={{ marginTop: '0.75rem', fontSize: '1.05rem' }}>
            Contact our distributor team directly for wholesale prices, bulk orders, and stock availability.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 0.9fr) minmax(320px, 1.1fr)',
          gap: '3rem',
          alignItems: 'start'
        }} className="contact-grid">
          
          {/* Left: Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Card 1: Phone Numbers */}
            <div className="glass-card" style={{ padding: '1.75rem', border: '1px solid var(--border-card-hover)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 210, 255, 0.2) 100%)',
                  color: 'var(--electric-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>Phone Numbers</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Call us for instant stock availability</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a 
                  href={`tel:${distributor.phone1}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                >
                  <span>Primary Helpline:</span>
                  <span style={{ color: 'var(--text-accent)' }}>{distributor.phone1}</span>
                </a>

                <a 
                  href={`tel:${distributor.phone2}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                >
                  <span>Wholesale Desk:</span>
                  <span style={{ color: 'var(--text-accent)' }}>{distributor.phone2}</span>
                </a>
              </div>
            </div>

            {/* Card 2: WhatsApp Support */}
            <div className="glass-card" style={{ padding: '1.75rem', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(37, 211, 102, 0.15)',
                  color: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>WhatsApp Support</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quickest way to ask prices and place orders</div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Send your list of items or pictures of switch designs directly on WhatsApp for quick prices.
              </p>

              <a 
                href={`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! I would like to inquire about Prime Lighting products.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', gap: '0.5rem', justifyContent: 'center' }}
              >
                <MessageSquare size={18} />
                <span>Open WhatsApp ({distributor.phone1})</span>
              </a>
            </div>

            {/* Card 3: Location & Timings */}
            <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <MapPin size={20} style={{ color: 'var(--text-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Store & Warehouse Address:</strong>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.45 }}>
                      {distributor.address}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Clock size={20} style={{ color: 'var(--text-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Opening Hours:</strong>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.45 }}>
                      10:00 AM – 8:00 PM (All days except Friday)
                      <div style={{ color: '#EF4444', fontSize: '0.8rem', fontWeight: 600, marginTop: '2px' }}>
                        Closed on Friday
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Button */}
              <a
                href={distributor.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ width: '100%', gap: '0.4rem', justifyContent: 'center' }}
              >
                <MapPin size={15} />
                <span>Open on Google Maps</span>
              </a>
            </div>

          </div>

          {/* Right: Order / Inquiry Form */}
          <div 
            className="glass-card"
            style={{
              padding: '2.5rem',
              border: '1px solid var(--border-card-hover)',
              boxShadow: 'var(--glow-electric)'
            }}
          >
            <div style={{ marginBottom: '1.75rem' }}>
              <div className="badge badge-prime" style={{ marginBottom: '0.5rem' }}>
                <Sparkles size={12} />
                Quick Message
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>Send Us a Message</h2>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Fill in the details below to ask for wholesale rates or place an order.
              </p>
            </div>

            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3>Inquiry Sent Successfully!</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
                  Our distributor team is reviewing your requirements and will reply on WhatsApp / Phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      Your Full Name *
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input 
                      type="tel"
                      placeholder="03xx xxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                </div>

                {/* Company & Project Type */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      Company / Contractor Name (Optional)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Apex Builders"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Residential House">Residential House / Villa</option>
                      <option value="Commercial Plaza">Commercial Plaza / Offices</option>
                      <option value="Apartment Building">Apartment Building</option>
                      <option value="Factory / Industrial">Factory / Industrial</option>
                      <option value="Shop Wholesale Stock">Retail Shop Stock</option>
                    </select>
                  </div>
                </div>

                {/* Products Needed */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Select Products You Need:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      'Switches & Sockets', 
                      'Luxury Glass Plates', 
                      'Dimmers', 
                      'SMD Downlights', 
                      'LED Bulbs', 
                      'BLDC Inverter Fans', 
                      'Circuit Breakers & DBs', 
                      'Flood Lights'
                    ].map((item) => {
                      const isSelected = formData.interests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleInterestToggle(item)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: isSelected ? 'var(--badge-bg)' : 'var(--bg-tertiary)',
                            color: isSelected ? 'var(--text-accent)' : 'var(--text-secondary)',
                            border: `1px solid ${isSelected ? 'var(--text-accent)' : 'var(--border-subtle)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          {isSelected && <CheckCircle2 size={13} />}
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    Estimated Quantities or Special Notes
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="e.g. Need 100 pcs Art Black switches, 50 pcs 12W SMD lights, 10 pcs 30W BLDC fans for delivery in Lahore..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-electric btn-lg"
                  style={{ width: '100%', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  <Send size={18} />
                  <span>Send Message on WhatsApp</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
