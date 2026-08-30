import React from 'react';
import { InteractiveLightingLab } from '../components/InteractiveLightingLab';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Sliders, SunMedium } from 'lucide-react';

export const DemoPage = () => {
  const { navigateTo } = useStore();

  const features = [
    {
      icon: <Zap size={20} />,
      title: 'Instant Switch Testing',
      desc: 'Test real-world tactile response and power telemetry with live watt & lumen calculations.'
    },
    {
      icon: <Sliders size={20} />,
      title: 'Stepless 5% - 100% Dimmer',
      desc: 'Experience our silent electronic dimming without any humming or coil vibration.'
    },
    {
      icon: <SunMedium size={20} />,
      title: '3-in-1 Color Switching',
      desc: 'Simulate 3000K Warm Golden, 4000K Natural Day, and 6500K Cool White illumination.'
    }
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '85vh', paddingBottom: '4rem' }}>
      
      {/* Dedicated Page Hero Header */}
      <div style={{
        padding: '3rem 0 1.5rem',
        background: 'radial-gradient(ellipse at 50% 10%, rgba(0, 102, 255, 0.25) 0%, transparent 60%)',
        borderBottom: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="badge badge-prime" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={13} />
            Virtual Experience Room
          </div>
          <h1>
            Live Product <span className="text-electric-blue">Simulator</span>
          </h1>
          <p style={{ marginTop: '0.5rem', maxWidth: '640px', margin: '0.5rem auto 0', fontSize: '1.05rem' }}>
            Interact with our switches, test dimmer brightness levels, and cycle through 3-in-1 light color temperatures before placing your order.
          </p>

          {/* 3 Quick Benefit Chips */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {features.map((feat, idx) => (
              <div 
                key={idx}
                className="glass-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0, 102, 255, 0.15)',
                  color: 'var(--electric-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {feat.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{feat.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Main Interactive Lighting Lab Simulator */}
      <InteractiveLightingLab />

      {/* Bottom CTA Banner */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div 
          className="glass-card"
          style={{
            padding: '2rem 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.12) 0%, rgba(0, 210, 255, 0.12) 100%)',
            border: '1px solid rgba(0, 210, 255, 0.3)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>Ready to Order or Request a Wholesale Quote?</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Explore our full stock of switches, LED lights, BLDC fans, and circuit breakers with direct dispatch.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigateTo('shop')}
              className="btn btn-electric"
              style={{ gap: '0.4rem' }}
            >
              <span>Explore All Products</span>
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => navigateTo('catalog')}
              className="btn btn-outline"
            >
              Download Catalog
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
