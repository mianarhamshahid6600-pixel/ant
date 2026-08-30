import React, { useState, useEffect } from 'react';
import { ShoppingBag, BookOpen, ShieldCheck, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection = () => {
  const { navigateTo } = useStore();

  // 1. Text Animation Headlines (rotates every 3.5 seconds)
  const textHeadlines = [
    { main: "Welcome to Alnoor Traders", highlight: "Authorized Prime Distributor", badge: "Official Prime Stockist" },
    { main: "3rd Big Distributor of Prime", highlight: "Serving Faisalabad & Pakistan", badge: "Wholesale & Projects" },
    { main: "Adding Value to Your Lifestyle", highlight: "Luxury Switches & Modern Lights", badge: "10-Year Warranty" },
    { main: "100% Genuine Electricals", highlight: "Direct Wholesale Rates", badge: "Guaranteed Quality" }
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [textFade, setTextFade] = useState(true);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % textHeadlines.length);
        setTextFade(true);
      }, 350);
    }, 3800);

    return () => clearInterval(textInterval);
  }, [textHeadlines.length]);

  // 2. Right Side Showcase Images (rotates every 7 seconds)
  const imageSlides = [
    {
      id: 1,
      title: "Prime Art Series Switch",
      subtitle: "Matte Black Luxury Wall Switch",
      series: "Prime Art Series",
      badge: "10-Year Warranty",
      image: "/images/products/art-black.png",
      fallback: "https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png",
      tag: "Luxury Living"
    },
    {
      id: 2,
      title: "Prime LG Glass Switchboard",
      subtitle: "Crystal Tempered Glass Surface",
      series: "LG Crystal Series",
      badge: "Scratch & Fire Proof",
      image: "/images/products/lg-series.png",
      fallback: "https://primelighting.net/wp-content/uploads/2024/09/ART-WHITE.png",
      tag: "Modern Interior"
    },
    {
      id: 3,
      title: "Prime 12W SMD Ceiling Light",
      subtitle: "3-in-1 Color Changing Downlight",
      series: "SMD Series",
      badge: "A+ Energy Saver",
      image: "/images/products/smd.jpg",
      fallback: "https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png",
      tag: "Soft Ambient Light"
    },
    {
      id: 4,
      title: "Prime Rock Gold Switch",
      subtitle: "Premium Brushed Metal Finish",
      series: "Rock Series",
      badge: "Pure Silver Contacts",
      image: "/images/products/rock-gold.png",
      fallback: "https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png",
      tag: "Designer Series"
    },
    {
      id: 5,
      title: "Prime Heavy Circuit Breaker",
      subtitle: "High Breaking Capacity MCB & DB",
      series: "Safety Series",
      badge: "Short-Circuit Protection",
      image: "/images/products/breaker.jpg",
      fallback: "https://primelighting.net/wp-content/uploads/2024/09/ART-WHITE.png",
      tag: "Home Safety"
    }
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideFade, setSlideFade] = useState(true);

  // 7-second image timer
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setSlideFade(false);
      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % imageSlides.length);
        setSlideFade(true);
      }, 400);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, [imageSlides.length]);

  const goToSlide = (index) => {
    setSlideFade(false);
    setTimeout(() => {
      setSlideIndex(index);
      setSlideFade(true);
    }, 200);
  };

  const nextSlide = () => {
    goToSlide((slideIndex + 1) % imageSlides.length);
  };

  const prevSlide = () => {
    goToSlide((slideIndex - 1 + imageSlides.length) % imageSlides.length);
  };

  const currentText = textHeadlines[textIndex];
  const currentSlide = imageSlides[slideIndex];

  return (
    <section style={{
      position: 'relative',
      padding: '3rem 0 3.5rem',
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
        width: '560px',
        height: '280px',
        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.2) 0%, rgba(0, 210, 255, 0.08) 40%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(280px, 0.95fr)',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* ================= LEFT COLUMN: ANIMATED TITLE & EASY DESCRIPTION ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Animated Pill Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div 
                className="badge badge-prime" 
                style={{ 
                  padding: '0.35rem 0.85rem', 
                  fontSize: '0.78rem',
                  transition: 'opacity 0.3s ease',
                  opacity: textFade ? 1 : 0.4
                }}
              >
                <Sparkles size={14} />
                <span>{currentText.badge}</span>
              </div>

              <div className="badge badge-success" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                <ShieldCheck size={14} />
                <span>100% Original Prime Products</span>
              </div>
            </div>

            {/* Dynamic Animated Switching Title */}
            <div style={{ minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 
                style={{
                  fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)',
                  lineHeight: 1.2,
                  fontWeight: 800,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: textFade ? 1 : 0,
                  transform: textFade ? 'translateY(0)' : 'translateY(8px)'
                }}
              >
                {currentText.main} <br />
                <span className="text-electric-blue">
                  {currentText.highlight}
                </span>
              </h1>
            </div>

            {/* Natural & Easy to Understand Description */}
            <p style={{
              fontSize: '1.02rem',
              lineHeight: 1.6,
              maxWidth: '560px',
              color: 'var(--text-secondary)'
            }}>
              We are an authorized distributor of <strong style={{ color: 'var(--text-primary)' }}>Prime</strong> electrical products in Faisalabad. Buy genuine luxury switches, tempered glass switchboards, LED lights, low-power fans, and safety circuit breakers at direct wholesale prices.
            </p>

            {/* BIG HEIGHT ACTION BUTTONS */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem'
            }}>
              <button 
                onClick={() => navigateTo('shop')}
                className="btn btn-electric"
                style={{
                  minHeight: '52px',
                  padding: '0.9rem 2rem',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  gap: '0.5rem',
                  boxShadow: 'var(--glow-electric)'
                }}
              >
                <ShoppingBag size={20} />
                <span>Shop Now</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => navigateTo('catalog')}
                className="btn btn-outline"
                style={{
                  minHeight: '52px',
                  padding: '0.9rem 1.85rem',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  gap: '0.5rem',
                  borderWidth: '2px'
                }}
              >
                <BookOpen size={20} />
                <span>Visit Catalog</span>
              </button>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: 7-SECOND ANIMATED SHOWCASE ================= */}
          <div style={{ position: 'relative' }}>
            
            {/* Ambient Background Glow Behind Slider */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(0, 210, 255, 0.28) 0%, rgba(0, 102, 255, 0.15) 50%, transparent 80%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              pointerEvents: 'none'
            }} />

            {/* Slider Showcase Card */}
            <div 
              className="glass-card"
              style={{
                position: 'relative',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-card-hover)',
                boxShadow: 'var(--glow-electric)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                overflow: 'hidden'
              }}
            >
              
              {/* Card Top: Series Tag & Warranty Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-prime" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                  {currentSlide.series}
                </span>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-accent)',
                  background: 'var(--badge-bg)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-card)'
                }}>
                  {currentSlide.badge}
                </span>
              </div>

              {/* Product Image Area with Smooth 7s Animation Transition */}
              <div 
                style={{
                  position: 'relative',
                  height: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.14) 0%, transparent 72%)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}
              >
                <img 
                  key={currentSlide.id}
                  src={currentSlide.image} 
                  alt={currentSlide.title} 
                  style={{
                    maxHeight: '85%',
                    maxWidth: '85%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.45))',
                    transition: 'all 0.45s ease',
                    opacity: slideFade ? 1 : 0,
                    transform: slideFade ? 'scale(1)' : 'scale(0.95)'
                  }}
                  onError={(e) => {
                    e.target.src = currentSlide.fallback;
                  }}
                />

                {/* Next & Previous Arrow Controls */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-glass)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: 0.85,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-glass)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: 0.85,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Slide Meta Description */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: '0.25rem',
                transition: 'opacity 0.35s ease',
                opacity: slideFade ? 1 : 0
              }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    {currentSlide.title}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    {currentSlide.subtitle}
                  </div>
                </div>

                <div className="badge badge-success" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
                  {currentSlide.tag}
                </div>
              </div>

              {/* Slide Dots and 7-Second Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                {/* Dots */}
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {imageSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      style={{
                        width: slideIndex === idx ? '22px' : '8px',
                        height: '8px',
                        borderRadius: '999px',
                        background: slideIndex === idx ? 'var(--text-accent)' : 'var(--border-subtle)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>

                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Auto-switch (7s)
                </span>
              </div>

              {/* 7-Second Animated Progress Bar */}
              <div style={{
                width: '100%',
                height: '3px',
                background: 'var(--border-subtle)',
                borderRadius: '999px',
                overflow: 'hidden',
                marginTop: '0.1rem'
              }}>
                <div 
                  key={slideIndex}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #0066FF, #00D2FF)',
                    animation: 'heroTimerProgress 7s linear infinite'
                  }}
                />
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Embedded Animations Style */}
      <style>{`
        @keyframes heroTimerProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (max-width: 868px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>

    </section>
  );
};
