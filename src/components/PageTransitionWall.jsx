import React from 'react';
import { useStore } from '../context/StoreContext';
import { Lightbulb, Sparkles, ShieldCheck, SunMedium } from 'lucide-react';

export const PageTransitionWall = () => {
  const { transitionStatus, theme } = useStore();

  if (transitionStatus === 'idle') return null;

  const isClosing = transitionStatus === 'closing';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: 'all',
        overflow: 'hidden',
        // Top to bottom (0%), then bottom to top (-100%)
        transform: isClosing ? 'translateY(0%)' : 'translateY(-100%)',
        transition: 'transform 0.38s cubic-bezier(0.7, 0, 0.25, 1)',
        background: theme === 'dark'
          ? 'linear-gradient(180deg, #050C1F 0%, #081432 50%, #030814 100%)'
          : 'linear-gradient(180deg, #F0F4FA 0%, #E2ECFA 50%, #F5F8FC 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
      }}
      className="page-transition-wall"
    >
      
      {/* Top Accent Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #00D2FF, #0066FF, transparent)',
        boxShadow: '0 0 12px rgba(0, 210, 255, 0.8)'
      }} />

      {/* Bottom Accent Line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #0066FF, #00D2FF, transparent)',
        boxShadow: '0 0 12px rgba(0, 210, 255, 0.8)'
      }} />

      {/* Subtle Minimal Radial Aura */}
      <div style={{
        position: 'absolute',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: theme === 'dark' 
          ? 'radial-gradient(circle, rgba(0, 102, 255, 0.18) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0, 43, 128, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* ================= FLOATING BULBS & LIGHTING ELEMENTS ================= */}
      
      {/* Floating Bulb 1: Top Left (Warm Golden Glow) */}
      <div style={{
        position: 'absolute',
        top: '14%',
        left: '12%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        opacity: 0.85,
        animation: 'floatBulb1 4s ease-in-out infinite alternate',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F59E0B'
        }}>
          <Lightbulb size={24} />
        </div>
        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          3000K Warm
        </span>
      </div>

      {/* Floating Bulb 2: Top Right (Electric Cyan Glow) */}
      <div style={{
        position: 'absolute',
        top: '18%',
        right: '14%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        opacity: 0.85,
        animation: 'floatBulb2 4.5s ease-in-out infinite alternate 0.5s',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(0, 210, 255, 0.12)',
          border: '1px solid rgba(0, 210, 255, 0.35)',
          boxShadow: '0 0 20px rgba(0, 210, 255, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00D2FF'
        }}>
          <SunMedium size={22} />
        </div>
        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          6500K Cool
        </span>
      </div>

      {/* Floating Product 3: Bottom Left (Prime Switch Plate Mini) */}
      <div style={{
        position: 'absolute',
        bottom: '16%',
        left: '15%',
        padding: '0.45rem 0.85rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-card)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'floatBulb3 5s ease-in-out infinite alternate 1s',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, #1E293B, #0F172A)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '8px', height: '14px', borderRadius: '2px', background: '#00D2FF', boxShadow: '0 0 6px #00D2FF' }} />
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>Prime Art Switch</div>
          <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Matte Black</div>
        </div>
      </div>

      {/* Floating Product 4: Bottom Right (Glowing SMD Downlight Mini) */}
      <div style={{
        position: 'absolute',
        bottom: '18%',
        right: '13%',
        padding: '0.45rem 0.85rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-card)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'floatBulb4 4.8s ease-in-out infinite alternate 1.5s',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFF2D6 40%, #0066FF 100%)',
          boxShadow: '0 0 12px rgba(255, 242, 214, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} />
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>Prime SMD Light</div>
          <div style={{ fontSize: '0.62rem', color: '#10B981', fontWeight: 600 }}>Energy Saver</div>
        </div>
      </div>

      {/* ================= CENTER MINIMAL LOGO CARD ================= */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        zIndex: 10
      }}>
        
        {/* Minimal Frosted Glass Logo Container */}
        <div style={{
          position: 'relative',
          padding: '1.25rem 2.25rem',
          borderRadius: 'var(--radius-lg)',
          background: theme === 'dark' ? 'rgba(10, 22, 51, 0.75)' : 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${theme === 'dark' ? 'rgba(0, 210, 255, 0.3)' : 'rgba(0, 43, 128, 0.18)'}`,
          boxShadow: theme === 'dark' 
            ? '0 15px 35px rgba(0, 102, 255, 0.25), inset 0 0 15px rgba(0, 210, 255, 0.1)' 
            : '0 15px 35px rgba(0, 43, 128, 0.1)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'minimalPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <img
              src={theme === 'dark' ? '/images/logo-transparent-white-text.png' : '/images/logo-transparent.png'}
              alt="Alnoor Traders ANT Logo"
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                filter: theme === 'dark' ? 'drop-shadow(0 0 8px rgba(0, 210, 255, 0.5))' : 'none'
              }}
              onError={(e) => {
                e.target.src = '/images/logo-transparent.png';
              }}
            />
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-24px',
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #00D2FF 0%, #0066FF 100%)',
              padding: '2px 6px',
              borderRadius: '999px',
              boxShadow: '0 0 8px rgba(0, 210, 255, 0.6)'
            }}>
              Prime
            </span>
          </div>
        </div>

        {/* Minimal Clean Caption */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          letterSpacing: '0.04em'
        }}>
          <ShieldCheck size={14} style={{ color: '#10B981' }} />
          <span>Authorized Prime Distributor</span>
        </div>

        {/* Minimal Soft Pulsing Line */}
        <div style={{
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--text-accent), transparent)',
          borderRadius: '999px',
          animation: 'minimalPulse 1.2s ease-in-out infinite'
        }} />

      </div>

      {/* Floating Animations CSS */}
      <style>{`
        @keyframes floatBulb1 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-16px) rotate(6deg); }
        }
        @keyframes floatBulb2 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(-8deg); }
        }
        @keyframes floatBulb3 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-12px); }
        }
        @keyframes floatBulb4 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-14px); }
        }
        @keyframes minimalPop {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes minimalPulse {
          0% { opacity: 0.3; transform: scaleX(0.7); }
          50% { opacity: 1; transform: scaleX(1.1); }
          100% { opacity: 0.3; transform: scaleX(0.7); }
        }
        @media (max-width: 640px) {
          .page-transition-wall > div[style*="position: absolute"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
