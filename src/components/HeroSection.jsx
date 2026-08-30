import React from 'react';
import { ShoppingBag, BookOpen, MessageSquare, ShieldCheck, Zap, Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection = () => {
  const { navigateTo, products, viewProductDetail, getWhatsAppProductUrl, distributor } = useStore();
  const featuredHeroProduct = products[0] || { name: 'Prime Art Series Switch', series: 'Prime Art' };

  return (
    <section style={{
      position: 'relative',
      padding: '2.5rem 0 3rem',
      background: 'var(--hero-mesh)',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(0, 210, 255, 0.08) 40%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1.25fr) minmax(280px, 0.85fr)',
          gap: '2.25rem',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Left Column: Hero Headline & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Distributor Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <div className="badge badge-prime" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                <ShieldCheck size={14} />
                <span>Authorized Prime Traders Distributor</span>
              </div>
              <span className="badge badge-success" style={{ padding: '0.25rem 0.65rem', fontSize: '0.7rem' }}>
                100% Original Stock
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ lineHeight: 1.18, fontWeight: 800 }}>
              Quality Electricals & <br />
              <span className="text-gradient">Modern Lighting for Every Space</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '1rem', lineHeight: 1.55, maxWidth: '560px', color: 'var(--text-secondary)' }}>
              Welcome to <strong style={{ color: 'var(--text-primary)' }}>Alnoor Traders</strong>. We supply 100% genuine <strong style={{ color: 'var(--electric-cyan)' }}>Prime Lighting</strong> products — including luxury switches, tempered glass switchboards, energy-saving SMD downlights, low-wattage inverter fans, and safe circuit breakers at honest wholesale rates.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              <button 
                onClick={() => navigateTo('shop')}
                className="btn btn-electric"
                style={{ gap: '0.4rem' }}
              >
                <ShoppingBag size={16} />
                <span>Browse Products</span>
                <ArrowRight size={15} />
              </button>

              <button 
                onClick={() => navigateTo('catalog')}
                className="btn btn-outline"
                style={{ gap: '0.4rem' }}
              >
                <BookOpen size={16} />
                <span>View Product Catalog</span>
              </button>

              <button 
                onClick={() => navigateTo('demo')}
                className="btn btn-outline"
                style={{ gap: '0.4rem', borderColor: 'rgba(0, 210, 255, 0.4)', color: 'var(--electric-cyan)' }}
              >
                <Sparkles size={15} />
                <span>Live Demo Lab</span>
              </button>
            </div>

            {/* Trust Points */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.75rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              marginTop: '0.5rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10B981', fontWeight: 700, fontSize: '0.85rem' }}>
                  <CheckCircle2 size={15} />
                  <span>10-Year Warranty</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>On all switch products</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--electric-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Zap size={15} />
                  <span>Fire-Proof Build</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tested for home safety</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F59E0B', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Award size={15} />
                  <span>Wholesale Rates</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Special builder discounts</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div style={{ position: 'relative' }}>
            
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '260px',
              height: '260px',
              background: 'radial-gradient(circle, rgba(0, 210, 255, 0.25) 0%, rgba(0, 102, 255, 0.12) 50%, transparent 80%)',
              borderRadius: '50%',
              filter: 'blur(25px)',
              pointerEvents: 'none'
            }} />

            {/* Featured Product Card */}
            <div 
              className="glass-card animate-float"
              style={{
                padding: '1.25rem',
                border: '1px solid rgba(0, 210, 255, 0.25)',
                boxShadow: 'var(--glow-electric)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="badge badge-prime" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>
                  <Sparkles size={12} />
                  Featured Product
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Prime Art Line
                </span>
              </div>

              <div style={{
                position: 'relative',
                height: '170px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.12) 0%, transparent 70%)',
                borderRadius: 'var(--radius-md)'
              }}>
                <img 
                  src="/images/products/art-black.png" 
                  alt="Prime Art Series Switch" 
                  style={{
                    maxHeight: '80%',
                    maxWidth: '80%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png';
                  }}
                />

                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'var(--bg-glass)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-card-hover)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--electric-cyan)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Matte Black Finish
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '1.05rem' }}>{featuredHeroProduct.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 800 }}>
                    Wholesale Available
                  </span>
                </div>

                <p style={{ fontSize: '0.78rem', marginTop: '0.2rem', color: 'var(--text-secondary)' }}>
                  Silver-alloy internal contacts that prevent sparks and keep electrical points safe.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button 
                  onClick={() => viewProductDetail(featuredHeroProduct)}
                  className="btn btn-electric btn-sm"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.6rem' }}
                >
                  View Product Page
                </button>
                <a 
                  href={getWhatsAppProductUrl(featuredHeroProduct, 1)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.6rem', gap: '0.3rem' }}
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp Price</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
