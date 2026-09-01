import React from 'react';
import { Phone, Truck, Sparkles, MessageSquare } from 'lucide-react';

export const TopNotificationBar = () => {
  const tickerContent = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2.5rem', paddingRight: '2.5rem', whiteSpace: 'nowrap' }}>
      
      {/* Phone 1 */}
      <a 
        href="tel:03146600174" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          color: '#FFFFFF', 
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '0.82rem',
          transition: 'opacity 0.2s ease'
        }}
        className="top-ticker-link"
      >
        <Phone size={13} style={{ color: '#60A5FA' }} />
        <span>03146600174</span>
      </a>

      <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>•</span>

      {/* Phone 2 */}
      <a 
        href="tel:03246600174" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          color: '#FFFFFF', 
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '0.82rem',
          transition: 'opacity 0.2s ease'
        }}
        className="top-ticker-link"
      >
        <Phone size={13} style={{ color: '#60A5FA' }} />
        <span>03246600174</span>
      </a>

      <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>•</span>

      {/* Free Delivery Banner */}
      <span style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.45rem', 
        color: '#FDE047', 
        fontWeight: 800,
        fontSize: '0.83rem',
        textTransform: 'none',
        letterSpacing: '0.02em'
      }}>
        <Truck size={14} style={{ color: '#FDE047' }} />
        <span>Free Delivery over Faisalabad</span>
      </span>

      <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>•</span>

      {/* WhatsApp Quick Link */}
      <a
        href="https://wa.me/923146600174?text=Hello%20Alnoor%20Traders!"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: '#4ADE80',
          fontWeight: 700,
          fontSize: '0.8rem',
          textDecoration: 'none'
        }}
        className="top-ticker-link"
      >
        <MessageSquare size={13} />
        <span>WhatsApp Order</span>
      </a>

      <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>✦</span>
    </div>
  );

  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(90deg, #002B80 0%, #0044CC 25%, #0066FF 50%, #0044CC 75%, #002B80 100%)',
      borderBottom: '1px solid rgba(0, 102, 255, 0.35)',
      boxShadow: 'none',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 60,
      height: '34px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div 
        className="ticker-track-right"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeRight 24s linear infinite',
          willChange: 'transform'
        }}
      >
        {tickerContent}
        {tickerContent}
        {tickerContent}
        {tickerContent}
      </div>

      <style>{`
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .ticker-track-right:hover {
          animation-play-state: paused;
        }
        .top-ticker-link:hover {
          text-decoration: underline !important;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};
