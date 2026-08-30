import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, MessageSquare, MapPin, Clock, 
  ShieldCheck, ArrowUp, BookOpen, Zap 
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, categories, distributor } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #070B14 0%, #03060C 100%)',
      color: '#94A3B8',
      borderTop: '1px solid rgba(0, 102, 255, 0.25)',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Column 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div 
              className="brand-container"
              onClick={() => navigateTo('home')}
            >
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <img 
                  src="/images/logo-transparent-white-text.png" 
                  alt="Alnoor Traders Logo" 
                  className="brand-logo-img"
                  onError={(e) => {
                    e.target.src = '/images/logo-transparent.png';
                  }}
                />
                <span className="brand-prime-sup">
                  Prime
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94A3B8' }}>
              Alnoor Traders is the authorized distributor of <strong>Prime Traders & Prime Lighting</strong>. Supplying genuine switches, tempered glass switchboards, SMD lights, inverter fans, and safety circuit breakers across Pakistan.
            </p>

            <div className="badge badge-prime" style={{ width: 'fit-content', padding: '0.4rem 0.8rem' }}>
              <ShieldCheck size={14} />
              <span>Authorized Prime Stockist</span>
            </div>
          </div>

          {/* Column 2: Product Lines */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Zap size={16} style={{ color: 'var(--text-accent)' }} />
              Product Lines
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('shop', cat.id)}
                    style={{
                      color: '#94A3B8',
                      textAlign: 'left',
                      transition: 'color var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60A5FA'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                  >
                    <span>›</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={16} style={{ color: 'var(--text-accent)' }} />
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  style={{ color: '#94A3B8', transition: 'color var(--transition-fast)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#60A5FA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog')}
                  style={{ color: '#94A3B8', transition: 'color var(--transition-fast)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#60A5FA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  Product Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('demo')}
                  style={{ color: 'var(--text-accent)', fontWeight: 600, transition: 'color var(--transition-fast)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-accent)'}
                >
                  ✨ Live Product Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  style={{ color: '#94A3B8', transition: 'color var(--transition-fast)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#60A5FA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  About Store & Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  style={{ color: '#94A3B8', transition: 'color var(--transition-fast)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#60A5FA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Phone */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={16} style={{ color: 'var(--electric-cyan)' }} />
              Contact Us
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              
              {/* Phone 1 */}
              <a 
                href={`tel:${distributor.phone1}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#FFFFFF',
                  fontWeight: 600
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--badge-bg)',
                  color: 'var(--text-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={14} />
                </div>
                <span>{distributor.phone1}</span>
              </a>

              {/* Phone 2 */}
              <a 
                href={`tel:${distributor.phone2}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#FFFFFF',
                  fontWeight: 600
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--badge-bg)',
                  color: 'var(--text-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={14} />
                </div>
                <span>{distributor.phone2}</span>
              </a>

              {/* WhatsApp Button */}
              <a 
                href={`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! I would like to inquire about Prime products.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ marginTop: '0.4rem', gap: '0.4rem' }}
              >
                <MessageSquare size={15} />
                <span>Instant WhatsApp Quote</span>
              </a>

              {/* Market Location */}
              <a 
                href={distributor.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#94A3B8', fontSize: '0.85rem' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#60A5FA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
              >
                <MapPin size={16} style={{ color: 'var(--text-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span>{distributor.address} (Open in Maps)</span>
              </a>

              {/* Timings */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                <Clock size={16} style={{ color: 'var(--text-accent)', flexShrink: 0 }} />
                <span>10:00 AM – 8:00 PM (Closed Friday)</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>
            © {new Date().getFullYear()} <strong style={{ color: '#FFFFFF' }}>Alnoor Traders</strong>. Authorized Distributor of Prime Traders & Prime Lighting. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-accent)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};
