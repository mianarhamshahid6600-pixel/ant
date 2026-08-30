import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ToggleRight, Sliders, SunMedium, Lightbulb, 
  Fan, ShieldCheck, Zap, ArrowRight, Sparkles 
} from 'lucide-react';

export const CategoriesSection = () => {
  const { categories, navigateTo } = useStore();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'ToggleRight': return <ToggleRight size={18} />;
      case 'Sliders': return <Sliders size={18} />;
      case 'SunMedium': return <SunMedium size={18} />;
      case 'Lightbulb': return <Lightbulb size={18} />;
      case 'Fan': return <Fan size={18} />;
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'Zap': return <Zap size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.75rem'
        }}>
          <div>
            <div className="badge badge-prime" style={{ marginBottom: '0.4rem', fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
              <Sparkles size={12} />
              Product Lines
            </div>
            <h2>
              Browse by <span className="text-electric-blue">Category</span>
            </h2>
            <p style={{ marginTop: '0.35rem', maxWidth: '580px', fontSize: '0.92rem' }}>
              Choose from luxury switches, bright ceiling lights, low-power fans, and tested circuit breakers.
            </p>
          </div>

          <button 
            onClick={() => navigateTo('shop')}
            className="btn btn-outline btn-sm"
            style={{ gap: '0.4rem' }}
          >
            <span>View All Categories</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid-categories">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', cat.id)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.15rem',
                gap: '0.85rem',
                border: '1px solid var(--border-card)',
                transition: 'all var(--transition-normal)'
              }}
            >
              
              {/* Card Top: Icon & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 210, 255, 0.2) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--electric-cyan)',
                  border: '1px solid rgba(0, 210, 255, 0.3)',
                  boxShadow: '0 0 10px rgba(0, 102, 255, 0.15)'
                }}>
                  {getCategoryIcon(cat.icon)}
                </div>

                <span className="badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  {cat.badge}
                </span>
              </div>

              {/* Thumbnail */}
              <div style={{
                height: '110px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.08) 0%, transparent 70%)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}>
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  style={{
                    maxHeight: '85%',
                    maxWidth: '85%',
                    objectFit: 'contain',
                    transition: 'transform 0.4s ease'
                  }}
                  onError={(e) => {
                    e.target.src = cat.fallbackImage;
                  }}
                />
              </div>

              {/* Text Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  {cat.name}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-accent)', fontWeight: 600 }}>
                  {cat.subtitle}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: 1.45 }}>
                  {cat.description}
                </p>
              </div>

              {/* Bottom Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '0.6rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {cat.count}+ Models
                </span>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--electric-cyan)'
                }}>
                  <span>View</span>
                  <ArrowRight size={13} />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
