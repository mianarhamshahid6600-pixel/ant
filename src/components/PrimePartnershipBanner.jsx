import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, Award, Zap, CheckCircle2, MessageSquare, 
  Building2, Flame, Cpu 
} from 'lucide-react';

export const PrimePartnershipBanner = () => {
  const { distributor, isContractorMode, setIsContractorMode, showToast } = useStore();

  const handleToggleContractor = () => {
    setIsContractorMode(!isContractorMode);
    showToast(
      !isContractorMode 
        ? 'Wholesale contractor prices are now active!' 
        : 'Switched back to standard retail prices',
      'info'
    );
  };

  const engineeringPillars = [
    {
      icon: <Flame size={17} />,
      title: 'Fire-Resistant Body',
      desc: 'High-grade virgin polycarbonate that will not catch fire even under extreme heat.'
    },
    {
      icon: <Cpu size={17} />,
      title: 'Surge-Protected Drivers',
      desc: 'Built-in voltage protector circuits keep LED lights safe from power fluctuations.'
    },
    {
      icon: <Zap size={17} />,
      title: 'Pure Copper Contacts',
      desc: 'Heavy pure copper terminals prevent sparking and overheating under heavy loads.'
    },
    {
      icon: <ShieldCheck size={17} />,
      title: '10-Year Replacement Warranty',
      desc: 'Complete manufacturer warranty with easy direct replacement from our distributor desk.'
    }
  ];

  return (
    <section className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, #081024 50%, var(--bg-primary) 100%)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container">
        
        {/* Main Card */}
        <div 
          className="glass-card"
          style={{
            padding: '2rem 1.75rem',
            border: '1px solid rgba(0, 210, 255, 0.25)',
            boxShadow: 'var(--glow-electric)',
            background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.95) 0%, rgba(7, 11, 20, 0.98) 100%)',
            borderRadius: 'var(--radius-xl)'
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
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                  Alnoor Traders x Prime Lighting
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.45rem, 2.5vw, 1.95rem)', color: '#FFFFFF', lineHeight: 1.25 }}>
                Direct Distributor of <br />
                <span className="text-electric-blue">Prime Traders & Lighting</span>
              </h2>

              <p style={{ marginTop: '0.6rem', fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.55 }}>
                As an authorized distributor, <strong>Alnoor Traders</strong> supplies 100% original Prime electrical products straight from the factory to electricians, contractors, builders, and homeowners with complete warranty and quick delivery.
              </p>

              {/* Contractor Wholesale Switcher */}
              <div style={{
                marginTop: '1.25rem',
                background: 'rgba(0, 102, 255, 0.1)',
                padding: '0.95rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(0, 210, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building2 size={16} style={{ color: 'var(--electric-cyan)' }} />
                    Contractor & Builder Wholesale Portal
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
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
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={18} style={{ color: 'var(--electric-cyan)' }} />
                Direct Order & Dispatch Desk
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.35rem' }}>
                  <span>Main Phone:</span>
                  <a href={`tel:${distributor.phone1}`} style={{ color: '#00D2FF', fontWeight: 700 }}>
                    {distributor.phone1}
                  </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.35rem' }}>
                  <span>Wholesale Line:</span>
                  <a href={`tel:${distributor.phone2}`} style={{ color: '#00D2FF', fontWeight: 700 }}>
                    {distributor.phone2}
                  </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.35rem' }}>
                  <span>Location:</span>
                  <a href={distributor.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#00D2FF', fontWeight: 600 }}>
                    Bawana Bazar, Faisalabad
                  </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
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
                  style={{ width: '100%', gap: '0.4rem' }}
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {engineeringPillars.map((pillar, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.65rem' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0, 102, 255, 0.15)',
                  color: 'var(--electric-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(0, 210, 255, 0.3)'
                }}>
                  {pillar.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.88rem', color: '#FFFFFF', marginBottom: '0.15rem' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.35 }}>
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
