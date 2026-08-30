import React from 'react';
import { useStore } from '../context/StoreContext';
import { Lightbulb, SunMedium } from 'lucide-react';

export const PageTransitionWall = () => {
  const { transitionStatus, theme } = useStore();

  const isClosing = transitionStatus === 'closing';
  const isOpening = transitionStatus === 'opening';
  const isIdle = transitionStatus === 'idle';

  // Always keep the wall in the DOM so CSS transitions reliably interpolate from -100% to 0% and back to -100%
  const transformStyle = isClosing
    ? 'translateY(0%)'
    : 'translateY(-100%)';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: isIdle ? 'none' : 'all',
        overflow: 'hidden',
        transform: transformStyle,
        transition: isIdle ? 'none' : 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
        willChange: 'transform',
        background: theme === 'dark'
          ? 'linear-gradient(180deg, #050C1F 0%, #081432 50%, #030814 100%)'
          : 'linear-gradient(180deg, #F0F4FA 0%, #E2ECFA 50%, #F5F8FC 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
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
        background: 'linear-gradient(90deg, transparent, #0055FF, #002B80, transparent)',
        boxShadow: '0 0 12px rgba(0, 85, 255, 0.6)'
      }} />

      {/* Bottom Accent Line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #002B80, #0055FF, transparent)',
        boxShadow: '0 0 12px rgba(0, 85, 255, 0.6)'
      }} />

      {/* Subtle Ambient Radial Glow */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: theme === 'dark' 
          ? 'radial-gradient(circle, rgba(0, 85, 255, 0.22) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0, 43, 128, 0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* ================= FLOATING BULBS & LIGHTING ELEMENTS ================= */}
      
      {/* Floating Bulb 1: Top Left (Warm Golden Glow) */}
      <div style={{
        position: 'absolute',
        top: '15%',
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
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 0 24px rgba(245, 158, 11, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F59E0B'
        }}>
          <Lightbulb size={26} />
        </div>
        <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          3000K Warm
        </span>
      </div>

      {/* Floating Bulb 2: Top Right (Cool White Glow) */}
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
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(0, 85, 255, 0.12)',
          border: '1px solid rgba(0, 85, 255, 0.4)',
          boxShadow: '0 0 24px rgba(0, 85, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-accent)'
        }}>
          <SunMedium size={24} />
        </div>
        <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          6500K Cool
        </span>
      </div>

      {/* Floating Product 3: Bottom Left (Prime Switch Plate Mini) */}
      <div style={{
        position: 'absolute',
        bottom: '16%',
        left: '15%',
        padding: '0.5rem 0.95rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-card)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        animation: 'floatBulb3 5s ease-in-out infinite alternate 1s',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, #1E293B, #0F172A)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '8px', height: '14px', borderRadius: '2px', background: '#0055FF', boxShadow: '0 0 6px #0055FF' }} />
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Prime Art Switch</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Luxury Series</div>
        </div>
      </div>

      {/* Floating Product 4: Bottom Right (Glowing SMD Downlight Mini) */}
      <div style={{
        position: 'absolute',
        bottom: '18%',
        right: '13%',
        padding: '0.5rem 0.95rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-card)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        animation: 'floatBulb4 4.8s ease-in-out infinite alternate 1.5s',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFF2D6 40%, #0047AB 100%)',
          boxShadow: '0 0 14px rgba(255, 242, 214, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} />
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Prime SMD Downlight</div>
          <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 600 }}>Energy Saver</div>
        </div>
      </div>

      {/* ================= CENTER: ALNOOR TRADERS LOGO ================= */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        zIndex: 10
      }}>
        
        {/* Alnoor Traders Logo Glass Card */}
        <div style={{
          position: 'relative',
          padding: '1.5rem 3rem',
          borderRadius: 'var(--radius-xl)',
          background: theme === 'dark' ? 'rgba(10, 22, 51, 0.88)' : 'rgba(255, 255, 255, 0.95)',
          border: `1px solid ${theme === 'dark' ? 'rgba(0, 85, 255, 0.4)' : 'rgba(0, 43, 128, 0.2)'}`,
          boxShadow: theme === 'dark' 
            ? '0 20px 50px rgba(0, 85, 255, 0.3), inset 0 0 20px rgba(0, 85, 255, 0.15)' 
            : '0 20px 50px rgba(0, 43, 128, 0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'primePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          
          {/* Alnoor Traders Logo Image */}
          <img
            src={theme === 'dark' ? '/images/logo-transparent-white-text.png' : '/images/logo-transparent.png'}
            alt="Alnoor Traders"
            style={{
              height: '62px',
              width: 'auto',
              objectFit: 'contain',
              filter: theme === 'dark' 
                ? 'drop-shadow(0 0 16px rgba(0, 85, 255, 0.55))' 
                : 'drop-shadow(0 4px 10px rgba(0, 43, 128, 0.2))',
              transition: 'all 0.3s ease'
            }}
            onError={(e) => {
              e.target.src = '/images/logo-transparent.png';
            }}
          />

        </div>

        {/* Minimal Soft Pulsing Line */}
        <div style={{
          width: '90px',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #0055FF, transparent)',
          borderRadius: '999px',
          animation: 'primePulse 1.4s ease-in-out infinite'
        }} />

      </div>

      {/* Floating Animations CSS */}
      <style>{`
        @keyframes floatBulb1 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-18px) rotate(6deg); }
        }
        @keyframes floatBulb2 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-22px) rotate(-8deg); }
        }
        @keyframes floatBulb3 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-14px); }
        }
        @keyframes floatBulb4 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-16px); }
        }
        @keyframes primePop {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes primePulse {
          0% { opacity: 0.3; transform: scaleX(0.7); }
          50% { opacity: 1; transform: scaleX(1.2); }
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
