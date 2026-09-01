import React from 'react';
import { ShoppingBag, BookOpen, ArrowRight, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection = () => {
  const { navigateTo, theme, distributor } = useStore();

  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 5rem',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      
      {/* Background Store Image with Soft Focus */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <img
          src="/images/shop.jpg"
          alt="Alnoor Traders Store Backdrop"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            filter: theme === 'dark' 
              ? 'blur(2.5px) saturate(1.2) brightness(0.82)' 
              : 'blur(2.5px) saturate(1.1) brightness(1.02)',
            transform: 'scale(1.02)',
            opacity: theme === 'dark' ? 0.78 : 0.82,
            transition: 'all 0.4s ease'
          }}
          onError={(e) => {
            e.target.src = '/images/shop.jpeg';
          }}
        />

        {/* Soft Contrast Tint Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: theme === 'dark'
            ? 'linear-gradient(180deg, rgba(5, 12, 31, 0.65) 0%, rgba(8, 20, 50, 0.5) 50%, rgba(5, 12, 31, 0.8) 100%)'
            : 'linear-gradient(180deg, rgba(240, 244, 250, 0.62) 0%, rgba(255, 255, 255, 0.48) 50%, rgba(240, 244, 250, 0.72) 100%)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Spacious, Clean & Calm Hero Content Container */}
        <div style={{
          maxWidth: '820px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem'
        }}>

          {/* Large, Easy-to-Read Title */}
          <h1 
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.1rem)',
              lineHeight: 1.2,
              fontWeight: 800,
              textShadow: theme === 'dark' ? '0 2px 14px rgba(0, 0, 0, 0.85)' : '0 1px 2px rgba(255, 255, 255, 0.95)',
              color: theme === 'dark' ? '#FFFFFF' : '#030A18'
            }}
          >
            Welcome to Alnoor Traders <br />
            <span 
              className="text-electric-blue"
              style={{
                color: theme === 'dark' ? '#60A5FA' : '#001A4D',
                fontWeight: 800,
                display: 'inline-block',
                marginTop: '0.25rem',
                textShadow: theme === 'dark' ? '0 2px 12px rgba(0, 0, 0, 0.8)' : '0 1px 2px rgba(255, 255, 255, 0.95)'
              }}
            >
              Luxury Switches & Modern Lighting
            </span>
          </h1>

          {/* Spacious, Clear Description */}
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            maxWidth: '720px',
            color: theme === 'dark' ? '#E2E8F0' : '#0A1629',
            fontWeight: theme === 'dark' ? 400 : 600,
            textShadow: theme === 'dark' ? '0 1px 6px rgba(0, 0, 0, 0.8)' : 'none'
          }}>
            Supplying genuine electrical switches, tempered glass switchboards, energy-saving LED lights, low-power fans, and safety circuit breakers across Faisalabad and Pakistan at fair wholesale prices.
          </p>

          {/* Big, Easy-to-Click Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginTop: '0.5rem'
          }}>
            <button 
              onClick={() => navigateTo('shop')}
              className="btn btn-electric"
              style={{
                minHeight: '52px',
                padding: '0.85rem 2.2rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                gap: '0.6rem',
                boxShadow: theme === 'dark' 
                  ? '0 6px 20px rgba(0, 85, 255, 0.45)' 
                  : '0 6px 18px rgba(0, 43, 128, 0.22)'
              }}
            >
              <ShoppingBag size={20} />
              <span>Shop All Products</span>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => navigateTo('catalog')}
              className="btn btn-outline"
              style={{
                minHeight: '52px',
                padding: '0.85rem 2rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                gap: '0.6rem',
                borderWidth: '2px'
              }}
            >
              <BookOpen size={20} />
              <span>View Catalog</span>
            </button>

            <a
              href={`tel:${distributor.phone1}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: theme === 'dark' ? '#93C5FD' : '#001B4E',
                textDecoration: 'none',
                marginLeft: '0.25rem'
              }}
            >
              <Phone size={18} style={{ color: '#60A5FA' }} />
              <span>Call: {distributor.phone1}</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};
