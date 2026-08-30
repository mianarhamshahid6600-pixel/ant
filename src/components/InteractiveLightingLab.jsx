import React, { useState } from 'react';
import { Power, Sliders, Sun, RotateCcw, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const InteractiveLightingLab = () => {
  const { navigateTo } = useStore();

  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [cct, setCct] = useState('4000K');
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const productsToTest = [
    {
      name: 'Prime Art Matte Black Switch',
      type: 'Luxury Wall Switch',
      maxPower: 10,
      image: '/images/products/art-black.png',
      finish: 'Matte Finish'
    },
    {
      name: 'Prime LG Real Glass Switchboard',
      type: 'Tempered Glass Plate',
      maxPower: 16,
      image: '/images/products/lg-series.png',
      finish: 'Crystal Tempered Glass'
    },
    {
      name: 'Prime 12W SMD Ceiling Light',
      type: '3-in-1 Color Downlight',
      maxPower: 12,
      image: '/images/products/smd.jpg',
      finish: 'Anti-Glare Soft Light'
    },
    {
      name: 'Prime Touch Glass Dimmer',
      type: 'Touch Fan & Light Dimmer',
      maxPower: 500,
      image: '/images/products/6m-black.png',
      finish: 'Silent Touch Control'
    }
  ];

  const currentProduct = productsToTest[selectedProductIndex];

  const getCctColor = () => {
    if (cct === '3000K') return { hex: '#FFB03A', name: 'Warm Golden (3000K)', bg: 'rgba(255, 176, 58,' };
    if (cct === '4000K') return { hex: '#FFF2D6', name: 'Natural Day (4000K)', bg: 'rgba(255, 242, 214,' };
    return { hex: '#BDE4FF', name: 'Cool White (6500K)', bg: 'rgba(189, 228, 255,' };
  };

  const activeColor = getCctColor();
  const calculatedWatts = isOn ? ((brightness / 100) * currentProduct.maxPower).toFixed(1) : '0.0';
  const calculatedLumens = isOn ? Math.round((brightness / 100) * 1200) : 0;

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '2.75rem 0',
      background: 'radial-gradient(ellipse at 50% 30%, rgba(0, 102, 255, 0.1) 0%, var(--bg-primary) 70%)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 1.75rem' }}>
          <div className="badge badge-prime" style={{ marginBottom: '0.5rem', fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
            <Sparkles size={12} />
            Live Product Demo
          </div>
          <h2>
            Try <span className="text-electric-blue">Prime Switches & Lights</span> Live
          </h2>
          <p style={{ marginTop: '0.4rem', fontSize: '0.92rem' }}>
            Click the switch button, slide the brightness dimmer, and test light colors live in real-time.
          </p>
        </div>

        {/* Demo Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.15fr) minmax(280px, 0.95fr)',
          gap: '1.25rem',
          alignItems: 'stretch'
        }} className="lab-grid">
          
          {/* Left: Virtual Room Preview */}
          <div 
            className="glass-card"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.25rem',
              background: isOn 
                ? `${activeColor.bg} ${(brightness / 100) * 0.12}), var(--bg-secondary)` 
                : '#040711',
              boxShadow: isOn 
                ? `0 0 35px ${activeColor.bg} ${(brightness / 100) * 0.3})` 
                : 'inset 0 0 25px rgba(0,0,0,0.8)',
              transition: 'all 0.4s ease'
            }}
          >
            {/* Top Bar on Preview */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isOn ? '#10B981' : '#EF4444',
                  boxShadow: isOn ? '0 0 8px #10B981' : 'none',
                  display: 'inline-block'
                }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {isOn ? `Light is ON: ${brightness}% Brightness` : 'Light is Switched OFF'}
                </span>
              </div>

              <div className="badge" style={{ background: 'var(--bg-glass)', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                {activeColor.name}
              </div>
            </div>

            {/* Light Source & Glow */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              margin: '1rem 0'
            }}>
              
              <div style={{
                position: 'absolute',
                top: '-25px',
                width: '140px',
                height: '18px',
                borderRadius: '999px',
                background: isOn ? activeColor.hex : '#20293A',
                boxShadow: isOn 
                  ? `0 0 30px ${activeColor.hex}, 0 15px 60px ${activeColor.hex}` 
                  : 'none',
                opacity: isOn ? (brightness / 100) * 0.9 + 0.1 : 0.2,
                transition: 'all 0.3s ease'
              }} />

              {isOn && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  width: '260px',
                  height: '180px',
                  background: `linear-gradient(180deg, ${activeColor.bg} ${(brightness / 100) * 0.35}) 0%, transparent 100%)`,
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease'
                }} />
              )}

              {/* Product Image */}
              <div style={{
                width: '130px',
                height: '130px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: isOn 
                  ? `brightness(${0.8 + (brightness / 100) * 0.4}) drop-shadow(0 10px 20px rgba(0,0,0,0.5))` 
                  : 'brightness(0.4) grayscale(0.5)',
                transition: 'all 0.3s ease'
              }}>
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png';
                  }}
                />
              </div>

              <div style={{
                marginTop: '0.6rem',
                textAlign: 'center',
                background: 'var(--bg-glass)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {currentProduct.name}
                </span>
              </div>
            </div>

            {/* Real-time Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              background: 'var(--bg-glass)',
              padding: '0.6rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Electricity Used</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-accent)', fontFamily: 'var(--font-mono)' }}>
                  {calculatedWatts} <span style={{ fontSize: '0.68rem' }}>Watts</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Brightness</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {calculatedLumens} <span style={{ fontSize: '0.68rem' }}>Lumens</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Efficiency</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                  {isOn ? 'A+ Saver' : 'Standby'}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Controls Box */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>Demo Controls</h3>
                <p style={{ fontSize: '0.78rem' }}>Adjust controls below to test live</p>
              </div>
              <button 
                onClick={() => {
                  setIsOn(true);
                  setBrightness(85);
                  setCct('4000K');
                }}
                className="btn btn-outline btn-sm"
                title="Reset to default"
                style={{ padding: '0.25rem 0.5rem' }}
              >
                <RotateCcw size={13} />
              </button>
            </div>

            {/* 1. Main Switch Power Button */}
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-sm)',
                  background: isOn ? 'linear-gradient(135deg, var(--electric-cyan), var(--electric-blue))' : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isOn ? '#070B14' : 'var(--text-muted)',
                  boxShadow: isOn ? 'var(--glow-electric)' : 'none'
                }}>
                  <Power size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Main Power Switch</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {isOn ? 'Power is ON' : 'Power is OFF'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOn(!isOn)}
                style={{
                  width: '54px',
                  height: '28px',
                  borderRadius: '999px',
                  background: isOn ? 'linear-gradient(90deg, #002B80, #0055FF)' : 'var(--bg-primary)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isOn ? '0 0 12px rgba(0, 85, 255, 0.4)' : 'none'
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: isOn ? '26px' : '3px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </button>
            </div>

            {/* 2. Dimmer Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sliders size={14} style={{ color: 'var(--text-accent)' }} />
                  Brightness Slider (Dimmer)
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-accent)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                  {isOn ? `${brightness}%` : 'OFF'}
                </span>
              </div>

              <input 
                type="range"
                min="5"
                max="100"
                value={brightness}
                disabled={!isOn}
                onChange={(e) => setBrightness(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '999px',
                  background: `linear-gradient(to right, #002B80 0%, #0055FF ${brightness}%, rgba(255,255,255,0.1) ${brightness}%, rgba(255,255,255,0.1) 100%)`,
                  outline: 'none',
                  cursor: isOn ? 'pointer' : 'not-allowed',
                  opacity: isOn ? 1 : 0.5
                }}
              />
            </div>

            {/* 3. Light Color Selector */}
            <div>
              <span style={{ fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.45rem' }}>
                <Sun size={14} style={{ color: 'var(--text-accent)' }} />
                Light Color (3-in-1 Switch):
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem' }}>
                {[
                  { id: '3000K', label: 'Warm Golden', color: '#FFB03A', desc: '3000K' },
                  { id: '4000K', label: 'Natural Day', color: '#FFF2D6', desc: '4000K' },
                  { id: '6500K', label: 'Cool White', color: '#BDE4FF', desc: '6500K' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCct(item.id)}
                    style={{
                      padding: '0.45rem 0.35rem',
                      borderRadius: 'var(--radius-sm)',
                      background: cct === item.id ? 'var(--badge-bg)' : 'var(--bg-tertiary)',
                      border: `1px solid ${cct === item.id ? item.color : 'var(--border-subtle)'}`,
                      color: 'var(--text-primary)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: item.color,
                      margin: '0 auto 0.25rem',
                      boxShadow: cct === item.id ? `0 0 6px ${item.color}` : 'none'
                    }} />
                    <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Switchable Products */}
            <div>
              <span style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.35rem', display: 'block' }}>
                Select Product:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
                {productsToTest.map((p, idx) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedProductIndex(idx)}
                    style={{
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedProductIndex === idx ? 'var(--badge-bg)' : 'var(--bg-tertiary)',
                      border: `1px solid ${selectedProductIndex === idx ? 'var(--border-card-hover)' : 'var(--border-subtle)'}`,
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: selectedProductIndex === idx ? 700 : 500,
                      color: selectedProductIndex === idx ? 'var(--text-accent)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: selectedProductIndex === idx ? 'var(--text-accent)' : 'transparent'
                    }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name.replace('Prime', '').trim()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button 
                onClick={() => navigateTo('shop')}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Browse Products
              </button>
              <button 
                onClick={() => navigateTo('catalog')}
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                View Specs
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .lab-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
