import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { PrimePartnershipBanner } from '../components/PrimePartnershipBanner';
import { useStore } from '../context/StoreContext';
import { 
  Building2, Star, Quote, ArrowRight, CheckCircle2, MessageSquare 
} from 'lucide-react';

export const HomePage = () => {
  const { navigateTo, distributor } = useStore();

  const reviews = [
    {
      name: 'Engr. Tariq Mehmood',
      role: 'Electrical Consultant',
      project: 'DHA Phase 6 Villas',
      text: 'We bought Prime Art Black switches and 12W 3-in-1 SMD downlights from Alnoor Traders for 40 luxury villas. Excellent quality and prompt service.',
      rating: 5
    },
    {
      name: 'Muhammad Asif',
      role: 'Electrical Contractor',
      project: 'Commercial Plaza & Offices',
      text: 'Alnoor Traders gives the best wholesale rates on Prime breakers and DB boxes. Same-day delivery and 100% original Prime stock.',
      rating: 5
    },
    {
      name: 'Zubair Qureshi',
      role: 'Interior Designer',
      project: 'Gulberg Corporate Offices',
      text: 'The LG Toughened Glass switches with chrome buttons give a rich, clean look. The rotary dimmers operate with zero buzzing noise.',
      rating: 5
    }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Categories Grid Section */}
      <CategoriesSection />

      {/* 4. Featured Prime Products Showcase */}
      <FeaturedProducts />

      {/* 5. Prime Partnership & Contractor Portal Banner */}
      <PrimePartnershipBanner />

      {/* 6. Contractor & Project Wholesale Supply Hub */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
            border: '1px solid var(--border-card-hover)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem 1.75rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 1.25fr) minmax(260px, 0.75fr)',
              gap: '2rem',
              alignItems: 'center'
            }} className="hub-grid">
              
              <div>
                <div className="badge badge-prime" style={{ marginBottom: '0.5rem', fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                  <Building2 size={13} />
                  Wholesale Project Supply
                </div>

                <h2 style={{ fontSize: 'clamp(1.45rem, 2.5vw, 1.95rem)', lineHeight: 1.25 }}>
                  Supplying Materials for <br />
                  <span className="text-electric-blue">Houses, Plazas & Projects</span>
                </h2>

                <p style={{ marginTop: '0.6rem', fontSize: '0.92rem', lineHeight: 1.55 }}>
                  Whether you are building a single home, an apartment building, or an office plaza, <strong>Alnoor Traders</strong> provides bulk carton supplies, verified warranties, and dedicated trade support.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.65rem',
                  marginTop: '1rem',
                  fontSize: '0.82rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span>Sample Boards for Architects</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span>Free BOQ Price Quotations</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span>Large Ready Stock in Warehouse</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span>Direct Contractor Phone Helpline</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => navigateTo('contact')}
                    className="btn btn-electric"
                    style={{ gap: '0.4rem' }}
                  >
                    <span>Request Project Quote</span>
                    <ArrowRight size={15} />
                  </button>

                  <a 
                    href={`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! I have a bulk project requirement for Prime electrical products.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ gap: '0.4rem' }}
                  >
                    <MessageSquare size={15} />
                    <span>WhatsApp: {distributor.phone1}</span>
                  </a>
                </div>
              </div>

              {/* Stats Box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.85rem'
              }}>
                {distributor.keyStats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: '1rem',
                      textAlign: 'center',
                      background: 'rgba(0, 102, 255, 0.05)',
                      border: '1px solid rgba(0, 210, 255, 0.2)'
                    }}
                  >
                    <div style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: 'var(--electric-cyan)',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 600 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. Client Reviews */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
            <div className="badge badge-prime" style={{ marginBottom: '0.4rem', fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
              <Star size={12} fill="currentColor" />
              Customer Reviews
            </div>
            <h2>
              What Our <span className="text-electric-blue">Customers & Contractors</span> Say
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.15rem'
          }}>
            {reviews.map((rev, i) => (
              <div 
                key={i}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  border: '1px solid var(--border-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.15rem', color: '#F59E0B' }}>
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={13} fill="#F59E0B" />
                    ))}
                  </div>
                  <Quote size={16} style={{ color: 'var(--electric-cyan)', opacity: 0.4 }} />
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1, fontStyle: 'italic' }}>
                  "{rev.text}"
                </p>

                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    {rev.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--electric-cyan)' }}>
                    {rev.role}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    Project: {rev.project}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hub-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
