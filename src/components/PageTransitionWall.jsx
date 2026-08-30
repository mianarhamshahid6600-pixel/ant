import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const PageTransitionWall = () => {
  const { transitionStatus, theme } = useStore();

  if (transitionStatus === 'idle') return null;

  const isClosing = transitionStatus === 'closing';
  const isOpening = transitionStatus === 'opening';

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
        transform: isClosing 
          ? 'translateY(0%)' 
          : isOpening 
            ? 'translateY(100%)' 
            : 'translateY(-100%)',
        transition: 'transform 0.42s cubic-bezier(0.77, 0, 0.175, 1)',
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at center, #0B1938 0%, #050C1F 60%, #02060F 100%)'
          : 'radial-gradient(ellipse at center, #E2ECFA 0%, #F0F4FA 60%, #D8E5F7 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), inset 0 0 100px rgba(0, 102, 255, 0.2)'
      }}
      className="page-transition-wall"
    >
      {/* Top & Bottom Accent Energy Beams on the Wall */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'linear-gradient(90deg, transparent 0%, #0066FF 30%, #00D2FF 50%, #0066FF 70%, transparent 100%)',
        boxShadow: '0 0 15px #00D2FF'
      }} />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'linear-gradient(90deg, transparent 0%, #0066FF 30%, #00D2FF 50%, #0066FF 70%, transparent 100%)',
        boxShadow: '0 0 15px #00D2FF'
      }} />

      {/* Decorative Grid Lines / Tech Pattern */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(0, 210, 255, 0.12)' : 'rgba(0, 43, 128, 0.08)'} 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.7,
        pointerEvents: 'none'
      }} />

      {/* Center Animated Logo Showcase */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        zIndex: 2,
        padding: '2rem'
      }}>
        
        {/* Pulsing Outer Glow Aura */}
        <div style={{
          position: 'absolute',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.25) 0%, rgba(0, 102, 255, 0.1) 50%, transparent 75%)',
          filter: 'blur(30px)',
          animation: 'wallGlowPulse 1.5s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }} />

        {/* Rotating Tech Ring */}
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: '2px dashed rgba(0, 210, 255, 0.4)',
          animation: 'wallSpinRing 6s linear infinite',
          pointerEvents: 'none'
        }} />

        {/* Logo Container */}
        <div style={{
          position: 'relative',
          padding: '1.25rem 2rem',
          borderRadius: 'var(--radius-lg)',
          background: theme === 'dark' ? 'rgba(10, 22, 51, 0.85)' : 'rgba(255, 255, 255, 0.92)',
          border: `1px solid ${theme === 'dark' ? 'rgba(0, 210, 255, 0.4)' : 'rgba(0, 43, 128, 0.2)'}`,
          boxShadow: theme === 'dark' 
            ? '0 10px 40px rgba(0, 102, 255, 0.4), inset 0 0 20px rgba(0, 210, 255, 0.2)' 
            : '0 10px 30px rgba(0, 43, 128, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'wallLogoPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <img
              src={theme === 'dark' ? '/images/logo-transparent-white-text.png' : '/images/logo-transparent.png'}
              alt="Alnoor Traders ANT Logo"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                filter: theme === 'dark' ? 'drop-shadow(0 0 10px rgba(0, 210, 255, 0.6))' : 'none'
              }}
              onError={(e) => {
                e.target.src = '/images/logo-transparent.png';
              }}
            />
            <span style={{
              position: 'absolute',
              top: '-10px',
              right: '-28px',
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #00D2FF 0%, #0066FF 100%)',
              padding: '2px 7px',
              borderRadius: '999px',
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              Prime
            </span>
          </div>
        </div>

        {/* Distributor Status Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-accent)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          animation: 'wallTextFade 0.4s ease'
        }}>
          <ShieldCheck size={16} style={{ color: '#10B981' }} />
          <span>Authorized Prime Distributor</span>
        </div>

        {/* Loading Beam */}
        <div style={{
          width: '140px',
          height: '3px',
          background: 'rgba(0, 102, 255, 0.2)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60px',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #00D2FF, transparent)',
            animation: 'wallBeamSwipe 0.8s ease-in-out infinite'
          }} />
        </div>

      </div>

      {/* Embedded Transition Animations */}
      <style>{`
        @keyframes wallGlowPulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes wallSpinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wallLogoPop {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes wallTextFade {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes wallBeamSwipe {
          0% { left: -60px; }
          100% { left: 140px; }
        }
      `}</style>
    </div>
  );
};
