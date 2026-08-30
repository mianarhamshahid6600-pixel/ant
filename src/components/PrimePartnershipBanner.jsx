import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, Award, Zap, Flame, Lock, 
  Building2, CheckCircle2, Phone, MessageSquare, ArrowRight 
} from 'lucide-react';

export const PrimePartnershipBanner = () => {
  const { distributor, isContractorMode, setIsContractorMode, navigateTo } = useStore();

  const handleToggleContractor = () => {
    setIsContractorMode(!isContractorMode);
  };

  const engineeringPillars = [
    {
      icon: <Zap size={18} />,
      title: 'Pure Silver Alloy Contacts',
      desc: 'Tested for over 40,000 continuous switch presses without sparking or erosion.'
    },
    {
      icon: <Flame size={18} />,
      title: '850°C Fire-Proof PC Body',
      desc: 'Non-flammable, heat-resistant polycarbonate that will not ignite or melt.'
    },
    {
      icon: <Lock size={18} />,
      title: 'Child Safety Shutters',
      desc: 'Built-in protective shutters on all sockets to prevent electric shock.'
    },
    {
      icon: <ShieldCheck size={18} />,
      title: '10-Year Replacement Warranty',
      desc: 'Official distributor warranty with instant replacement at our store.'
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        
        <div 
          className="glass-card"
          style={{
            borderRadius: 'var(--radius-xl)',
            padding: '2rem 1.75rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-card-hover)',
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)'
          }}
        >
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1.25fr) minmax(260px, 0.75fr)',
            gap: '1.75rem',
            alignItems: 'center'
          }} className="banner-grid">
            
            {/* Left Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <span className="badge badge-prime" style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem' }}>
                  <ShieldCheck size={14} />
                  Authorized Distribution Partner
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Alnoor Traders x Prime Lighting
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.45rem, 2.5vw, 1.95rem)', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                Direct Distributor of <br />
                <span className="text-electric-blue">Prime Traders & Lighting</span>
              </h2>

              <p style={{ marginTop: '0.6rem', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                As an authorized distributor, <strong>Alnoor Traders</strong> supplies 100% original Prime electrical products straight from the factory to electricians, contractors, builders, and homeowners with complete warranty and quick delivery.
              </p>

              {/* Contractor Wholesale Switcher */}
              <div style={{
                marginTop: '1.25rem',
                background: 'var(--badge-bg)',
                padding: '0.95rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building2 size={16} style={{ color: 'var(--text-accent)' }} />
                    Contractor & Builder Wholesale Portal
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {isContractorMode 
                      ? 'Wholesale discounts are active across store' 
                      : 'Click to see discounted wholesale prices for builders'}
                  </div>
                </div>

                <button
                  onClick={handleToggleContractor}
                  className={`btn ${isContractorMode ? 'btn-electric' : 'btn-outline'} btn-sm`}
                  style={{ gap: '0.35rem' }}
                >
                  <CheckCircle2 size={14} />
                  <span>{isContractorMode ? 'Wholesale Active' : 'Enable Wholesale'}</span>
                </button>
              </div>

            </div>

            {/* Right: Contact & Dispatch Box */}
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={18} style={{ color: 'var(--text-accent)' }} />
                Direct Order & Dispatch Desk
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem' }}>
                  <span>Main Phone:</span>
                  <a href={`tel:${distributor.phone1}`} style={{ color: 'var(--text-accent)', fontWeight: 700 }}>
                    {distributor.phone1}
                  </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem' }}>
                  <span>Wholesale Line:</span>
                  <a href={`tel:${distributor.phone2}`} style={{ color: 'var(--text-accent)', fontWeight: 700 }}>
                    {distributor.phone2}
                  </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem' }}>
                  <span>Location:</span>
                  <a href={distributor.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-accent)', fontWeight: 600 }}>
                    Bawana Bazar, Faisalabad
                  </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Delivery:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>Same-Day Dispatch</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
                <a
                  href={`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! I am inquiring about wholesale prices for Prime Lighting.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ width: '100%', gap: '0.4rem', justifyContent: 'center' }}
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp: {distributor.phone1}</span>
                </a>
              </div>

            </div>

          </div>

          {/* 4 Quality Points */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.75rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {engineeringPillars.map((pillar, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.65rem' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--badge-bg)',
                  color: 'var(--text-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--border-card)'
                }}>
                  {pillar.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .banner-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
