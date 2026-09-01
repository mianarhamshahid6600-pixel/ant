import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  BookOpen, Printer, MessageSquare, Phone, ArrowRight 
} from 'lucide-react';

export const CatalogPage = () => {
  const { distributor, navigateTo } = useStore();

  const catalogSeries = [
    {
      id: 'art-series',
      title: 'Art Luxury Switch Series',
      subtitle: 'Modern Matte Finish Switches & Universal Sockets',
      cover: '/images/products/art-black.png',
      fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png',
      specs: [
        { label: 'Voltage & Power', value: '220V - 250V AC, 50/60Hz' },
        { label: 'Button Lifespan', value: 'Tested for 40,000+ Clicks' },
        { label: 'Internal Terminals', value: 'Pure Copper with Silver-Nickel Arc Protection' },
        { label: 'Fire Safety', value: 'Flame-Retardant Polycarbonate (Will not catch fire)' },
        { label: 'Standard Size', value: 'Standard 3x3 inches (86mm x 86mm)' }
      ],
      finishes: ['Matte Black', 'Pure White', 'Space Grey', 'Walnut Brown']
    },
    {
      id: '6m-series',
      title: '6M Architectural Grid Series',
      subtitle: 'Wide Switchboards with Rose Gold Trim Border',
      cover: '/images/products/6m-black.png',
      fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/6m-BLACK.png',
      specs: [
        { label: 'Capacity', value: 'Up to 6 Switches / Sockets / Dimmers on one plate' },
        { label: 'Plate Dimensions', value: '200mm Wide x 86mm Height' },
        { label: 'Frame Structure', value: 'Reinforced Steel Backframe' },
        { label: 'Surface Finish', value: 'Anti-Fingerprint Coating with Gold Accent' },
        { label: 'Wall Box Size', value: 'Standard 6M Wall Box' }
      ],
      finishes: ['Carbon Matte Black', 'Slate Metallic Grey']
    },
    {
      id: 'lg-glass',
      title: 'LG Real Glass Series',
      subtitle: '4mm Diamond-Cut Tempered Glass Switchboards',
      cover: '/images/products/lg-series.png',
      fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/LG.png',
      specs: [
        { label: 'Glass Material', value: '4.0mm Real Toughened Safety Glass' },
        { label: 'Edge Profile', value: 'Diamond-polished curved bevel edges' },
        { label: 'Water Resistance', value: 'Water and stain resistant surface' },
        { label: 'Keys / Buttons', value: 'Chrome-Plated Precision Micro Switches' },
        { label: 'Durability', value: 'Never turns yellow or fades' }
      ],
      finishes: ['Crystal Black Glass', 'Crystal White Glass']
    },
    {
      id: 'smd-lighting',
      title: 'OptiGlow Slim SMD Ceiling Lights',
      subtitle: '3-in-1 Color Switching Panels with Built-in Surge Protectors',
      cover: '/images/products/smd.jpg',
      fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/SMD-2-scaled.jpg',
      specs: [
        { label: 'Available Sizes', value: '7W, 12W, 18W, 24W' },
        { label: '3-in-1 Colors', value: 'Warm Golden, Natural Day, Cool Daylight' },
        { label: 'Brightness', value: '100+ Lumens per Watt (Super Bright)' },
        { label: 'Eye Comfort', value: 'Flicker-Free Anti-Glare Lens' },
        { label: 'Voltage Protection', value: 'Surge protected against voltage fluctuations' }
      ],
      finishes: ['Round Slim Ceiling Light', 'Square Slim Ceiling Light', 'Surface Downlight']
    },
    {
      id: 'bldc-fans',
      title: 'AeroInverter BLDC Ceiling Fans',
      subtitle: 'Super Low-Power 30W Inverter Motor with Wireless Remote',
      cover: '/images/products/mm-series.png',
      fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/MM.png',
      specs: [
        { label: 'Motor Type', value: '100% Pure Copper BLDC Inverter Motor' },
        { label: 'Electricity Usage', value: 'Only 30W (Full Speed) vs 80W Standard Fan' },
        { label: 'Blade Size', value: '56 Inches (1400mm) Aerodynamic Aluminum' },
        { label: 'Remote Control', value: '6-Speed Remote with Timer & Reverse Airflow' },
        { label: 'UPS & Solar Friendly', value: 'Runs 3x longer on UPS/Battery without humming' }
      ],
      finishes: ['Matte Black', 'Arctic White', 'Royal Gold & Wood']
    },
    {
      id: 'circuit-breakers',
      title: 'SafeGuard Breakers & DB Boxes',
      subtitle: 'Certified Miniature Circuit Breakers & Acrylic Distribution Boxes',
      cover: '/images/products/breaker.jpg',
      fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/BREAKER-scaled.jpg',
      specs: [
        { label: 'Safety Standard', value: 'IEC/EN 60898-1 Certified' },
        { label: 'Short-Circuit Capacity', value: '6,000 Amperes (6kA)' },
        { label: 'Available Sizes', value: '6A, 10A, 16A, 20A, 32A, 63A (Single & Double Pole)' },
        { label: 'Trip Type', value: 'Fast C-Curve Overload Protection' },
        { label: 'DB Box Material', value: 'Thick Galvanized Steel with Smoked Acrylic Door' }
      ],
      finishes: ['Concealed Wall DB Box', 'Surface DB Box (4 to 24 Breakers)']
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '3rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800 }}>
              Alnoor Digital <span className="text-electric-blue">Product Catalog</span>
            </h1>
            <p style={{ marginTop: '0.75rem', maxWidth: '650px', fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
              Official product catalog and technical specifications for builders, electricians, and homeowners.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              className="btn btn-primary"
              style={{ gap: '0.5rem' }}
            >
              <Printer size={16} />
              <span>Print / Save as PDF</span>
            </button>

            <a
              href={`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! Please send me the complete product catalog PDF.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ gap: '0.5rem' }}
            >
              <MessageSquare size={16} />
              <span>Request Full Catalog on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Store Information Letterhead */}
        <div 
          className="glass-card"
          style={{
            padding: '1.5rem 2rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            background: 'var(--badge-bg)',
            border: '1px solid var(--border-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/images/logo-transparent-white-text.png" 
              alt="Alnoor Traders" 
              style={{ height: '52px', width: 'auto', objectFit: 'contain' }} 
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                Alnoor Traders
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Wholesale Electrical Switches & Modern Lighting Systems
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Main Phone:</span>{' '}
              <strong style={{ color: 'var(--text-accent)' }}>{distributor.phone1}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Wholesale Line:</span>{' '}
              <strong style={{ color: 'var(--text-accent)' }}>{distributor.phone2}</strong>
            </div>
          </div>
        </div>

        {/* Catalog Series Deep Dive */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {catalogSeries.map((series, index) => (
            <div 
              key={series.id}
              className="glass-card"
              style={{
                padding: '2.5rem',
                border: '1px solid var(--border-card-hover)',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(260px, 0.8fr) minmax(320px, 1.2fr)',
                gap: '2.5rem',
                alignItems: 'center'
              }} className="catalog-grid">
                
                {/* Product Image */}
                <div style={{
                  background: 'radial-gradient(circle at center, rgba(0, 85, 255, 0.12) 0%, transparent 70%)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '260px'
                }}>
                  <img 
                    src={series.cover} 
                    alt={series.title}
                    style={{ maxHeight: '200px', maxWidth: '85%', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }}
                    onError={(e) => {
                      e.target.src = series.fallbackCover;
                    }}
                  />
                  <div style={{
                    marginTop: '1.25rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-accent)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Section {index + 1} • {series.title}
                  </div>
                </div>

                {/* Details Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                      {series.title}
                    </h3>
                    <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                      {series.subtitle}
                    </p>
                  </div>

                  {/* Specs Table */}
                  <div style={{
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden'
                  }}>
                    {series.specs.map((item, idx) => (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.55rem 1rem',
                          fontSize: '0.85rem',
                          background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                          borderTop: idx > 0 ? '1px solid var(--border-subtle)' : 'none'
                        }}
                      >
                        <span style={{ color: 'var(--text-muted)' }}>{item.label}:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Available Colors */}
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      Available Colors & Finishes:
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {series.finishes.map((f, i) => (
                        <span 
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-card)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="btn btn-primary btn-sm"
                    >
                      <span>Shop this Series</span>
                      <ArrowRight size={14} />
                    </button>
                    <a
                      href={`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent(`Hello Alnoor Traders! I would like to inquire about price and stock for ${series.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <MessageSquare size={14} />
                      <span>Quote this Series</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div style={{
          marginTop: '4rem',
          textAlign: 'center',
          padding: '3rem 2rem',
          background: 'var(--badge-bg)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-card)'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Need Custom Price Lists or Tender Files?</h3>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem', color: 'var(--text-secondary)' }}>
            Contact our sales team for wholesale catalogs, project quotes, and sample boards.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href={`tel:${distributor.phone1}`}
              className="btn btn-primary"
            >
              <Phone size={16} />
              <span>Call Us: {distributor.phone1}</span>
            </a>
            <a 
              href={`https://wa.me/${distributor.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          .catalog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
