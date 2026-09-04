import React, { useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const CategoriesSection = () => {
  const { categories, navigateTo, theme } = useStore();
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const visibleCategories = categories.filter(c => !c.hidden);
  // Duplicate list for infinite smooth continuous loop
  const repeatedCategories = [...visibleCategories, ...visibleCategories, ...visibleCategories];

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section" style={{ background: 'var(--bg-primary)', padding: '3.5rem 0 4rem', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Section Header with Left/Right Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 800 }}>
              Browse by <span className="text-electric-blue">Category</span>
            </h2>
            <p style={{ marginTop: '0.4rem', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Hover to view category • Click to explore full collection
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Scroll Left Button */}
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="btn btn-outline"
              style={{
                width: '44px',
                height: '44px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: '1.5px'
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Scroll Right Button */}
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="btn btn-outline"
              style={{
                width: '44px',
                height: '44px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: '1.5px'
              }}
            >
              <ChevronRight size={22} />
            </button>

            <button 
              onClick={() => navigateTo('shop')}
              className="btn btn-primary"
              style={{ gap: '0.45rem', padding: '0.65rem 1.4rem', fontSize: '0.95rem', fontWeight: 700, marginLeft: '0.5rem' }}
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Full-width Single-Line Moving Strip */}
      <div 
        ref={sliderRef}
        className="category-slider-container"
        style={{
          width: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '1rem 0'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`category-slider-track ${isPaused ? 'paused' : ''}`}
          style={{
            display: 'flex',
            gap: '1.5rem',
            width: 'max-content',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            animation: 'marqueeLeft 36s linear infinite'
          }}
        >
          {repeatedCategories.map((cat, idx) => (
            <div
              key={`${cat.id}-${idx}`}
              onClick={() => navigateTo('shop', cat.id)}
              className="category-image-card"
              style={{
                width: '250px',
                height: '240px',
                borderRadius: 'var(--radius-xl)',
                background: theme === 'dark' 
                  ? 'linear-gradient(145deg, rgba(13, 27, 62, 0.85) 0%, rgba(7, 15, 38, 0.95) 100%)' 
                  : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(0, 85, 255, 0.25)' : '1px solid rgba(0, 43, 128, 0.14)',
                boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.45)' : '0 4px 18px rgba(0, 43, 128, 0.08)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              
              {/* Category Product Image (Only element visible by default) */}
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.75rem',
                transition: 'transform 0.4s ease'
              }} className="cat-img-wrapper">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  style={{
                    maxHeight: '160px',
                    maxWidth: '85%',
                    objectFit: 'contain',
                    filter: theme === 'dark' 
                      ? 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6))' 
                      : 'drop-shadow(0 8px 16px rgba(0, 31, 91, 0.15))',
                    transition: 'transform 0.35s ease'
                  }}
                  className="cat-card-img"
                  onError={(e) => {
                    e.target.src = cat.fallbackImage;
                  }}
                />
              </div>

              {/* Bold Category Name Display on Hover */}
              <div 
                className="category-hover-overlay"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.1rem 1rem',
                  background: theme === 'dark'
                    ? 'linear-gradient(180deg, transparent 0%, rgba(3, 10, 26, 0.92) 30%, rgba(3, 10, 26, 0.98) 100%)'
                    : 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.92) 30%, rgba(255, 255, 255, 0.98) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderTop: theme === 'dark' ? '1px solid rgba(0, 85, 255, 0.4)' : '1px solid rgba(0, 43, 128, 0.15)'
                }}
              >
                <span style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: theme === 'dark' ? '#FFFFFF' : '#030A18',
                  textAlign: 'center',
                  lineHeight: 1.25,
                  letterSpacing: '0.01em'
                }}>
                  {cat.name}
                </span>
                
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--text-accent)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginTop: '2px'
                }}>
                  <span>View Products</span>
                  <ArrowRight size={13} />
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .category-slider-container::-webkit-scrollbar {
          display: none;
        }
        .category-slider-track.paused {
          animation-play-state: paused !important;
        }
        .category-image-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 85, 255, 0.35) !important;
          border-color: rgba(0, 102, 255, 0.7) !important;
        }
        .category-image-card:hover .cat-card-img {
          transform: scale(1.1);
        }
        .category-image-card:hover .category-hover-overlay {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </section>
  );
};
