import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Building2, ShieldCheck, Award, Truck, 
  Users, CheckCircle2, MessageSquare 
} from 'lucide-react';

export const AboutPage = () => {
  const { distributor } = useStore();

  const values = [
    {
      icon: <ShieldCheck size={24} />,
      title: '100% Original Products',
      desc: 'Every switch, light, and breaker sold by Alnoor Traders is 100% genuine and sourced directly from certified manufacturing lines.'
    },
    {
      icon: <Truck size={24} />,
      title: 'Fast Wholesale Delivery',
      desc: 'Our large warehouse inventory ensures same-day order processing and fast dispatch for contractors and builders across Pakistan.'
    },
    {
      icon: <Award size={24} />,
      title: '10-Year Replacement Warranty',
      desc: 'We provide direct warranty support with quick replacement from our store on all mechanical and electrical items.'
    },
    {
      icon: <Users size={24} />,
      title: 'Contractor & Builder Support',
      desc: 'We offer special wholesale rate discounts, project price estimates, and free sample display boards for architects.'
    }
  ];

  const testStandards = [
    {
      title: 'Fire-Resistant Body Test',
      desc: 'All switch plates use virgin polycarbonate that self-extinguishes and will not catch fire.'
    },
    {
      title: '40,000 Click Durability Test',
      desc: 'Switch rockers are tested for more than 40,000 clicks to ensure over 10 years of smooth daily use.'
    },
    {
      title: '6,000A Short-Circuit Safety Test',
      desc: 'Safety MCBs trip instantly to cut off short circuits and protect your home wiring.'
    },
    {
      title: 'Surge-Protected LED Drivers',
      desc: 'Isolated power circuits keep LED ceiling lights safe from voltage fluctuations.'
    }
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        
        {/* Page Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800 }}>
            Premier Wholesale Store for <br />
            <span className="text-electric-blue">Electrical & Modern Lighting</span>
          </h1>
          <p style={{ marginTop: '1.25rem', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Alnoor Traders is your trusted source for modern electrical switches, bright LED lighting, low-power fans, and tested circuit breakers in Pakistan.
          </p>
        </div>

        {/* Story Section Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1.1fr) minmax(300px, 0.9fr)',
          gap: '3.5rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }} className="about-grid">
          
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 800 }}>
              Providing Safe, Elegant & Durable Electrical Products
            </h2>

            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              Founded with the goal of bringing high-quality, safe, and beautiful electrical products to Pakistani homes and offices, <strong>Alnoor Traders</strong> is proud to supply certified wholesale electrical and modern lighting solutions.
            </p>

            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              We know that good switches and lights make a home both safe and beautiful. We supply genuine products made with pure copper contacts, fire-proof materials, and real warranties at fair wholesale prices.
            </p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--electric-cyan)', fontFamily: 'var(--font-heading)' }}>
                  15+ Years
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Market Experience</div>
              </div>

              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--electric-cyan)', fontFamily: 'var(--font-heading)' }}>
                  1,200+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contractor Network</div>
              </div>

              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--electric-cyan)', fontFamily: 'var(--font-heading)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Original Certified Stock</div>
              </div>
            </div>

          </div>

          {/* Right: Certificate Card */}
          <div 
            className="glass-card"
            style={{
              padding: '2.5rem',
              border: '1px solid var(--border-card-hover)',
              boxShadow: 'var(--shadow-elevated)',
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img 
                src="/images/logo-transparent-white-text.png" 
                alt="Alnoor Traders" 
                className="brand-logo-img"
                style={{ height: '56px', objectFit: 'contain' }} 
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                  Alnoor Traders
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-accent)', fontWeight: 700 }}>
                  Wholesale Electrical & Lighting Store
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--badge-bg)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                "This certifies that <strong>Alnoor Traders</strong> is an established wholesale electrical store dedicated to stock, supply, and warranty genuine quality electrical and lighting products."
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
                <span>Main Phone:</span>
                <a href={`tel:${distributor.phone1}`} style={{ color: 'var(--text-accent)', fontWeight: 700 }}>{distributor.phone1}</a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
                <span>Wholesale Line:</span>
                <a href={`tel:${distributor.phone2}`} style={{ color: 'var(--text-accent)', fontWeight: 700 }}>{distributor.phone2}</a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
                <span>Address:</span>
                <strong style={{ color: 'var(--text-primary)', textAlign: 'right' }}>{distributor.address}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
                <span>Hours:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>10 AM – 8 PM (Closed Friday)</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a 
                href={distributor.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ width: '100%', gap: '0.4rem', justifyContent: 'center' }}
              >
                <span>View on Google Maps</span>
              </a>
              <a 
                href={`https://wa.me/${distributor.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ width: '100%', gap: '0.4rem', justifyContent: 'center' }}
              >
                <MessageSquare size={16} />
                <span>Chat with Support Desk</span>
              </a>
            </div>

          </div>

        </div>

        {/* 4 Core Values */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>
              Why Choose <span className="text-electric-blue">Alnoor Traders</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            {values.map((v, i) => (
              <div 
                key={i}
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '1px solid var(--border-card)'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--badge-bg)',
                  color: 'var(--text-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--badge-border)'
                }}>
                  {v.icon}
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Testing */}
        <div className="glass-card" style={{ padding: '3rem', border: '1px solid var(--border-card-hover)' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            <div className="badge badge-prime" style={{ marginBottom: '0.5rem' }}>
              Quality Assurance
            </div>
            <h2>Tested for Safety & Long Life</h2>
            <p style={{ marginTop: '0.5rem' }}>
              Every product batch is tested to make sure it meets high safety standards before delivery.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {testStandards.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={18} />
                  <span>{item.title}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
