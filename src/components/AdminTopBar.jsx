import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, LayoutDashboard, LogOut, CheckCircle2, Eye } from 'lucide-react';

export const AdminTopBar = () => {
  const { 
    isAdminAuthenticated, 
    currentPage, 
    navigateTo, 
    logoutAdmin 
  } = useStore();

  if (!isAdminAuthenticated || currentPage === 'admin') {
    return null;
  }

  return (
    <aside aria-label="Admin quick toolbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'linear-gradient(90deg, #09132B 0%, #0F2042 50%, #09132B 100%)',
      borderBottom: '1px solid rgba(0, 102, 255, 0.4)',
      padding: '0.45rem 1.25rem',
      color: '#FFFFFF',
      fontSize: '0.82rem',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Left: Admin Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(0, 102, 255, 0.25)',
            border: '1px solid rgba(0, 102, 255, 0.5)',
            color: '#60A5FA',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            fontWeight: 800,
            fontSize: '0.74rem',
            letterSpacing: '0.04em'
          }}>
            <ShieldCheck size={14} />
            <span>ADMIN MODE</span>
          </span>

          <span style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.3rem' }} className="hidden-mobile">
            <CheckCircle2 size={13} style={{ color: '#10B981' }} />
            <span>Viewing Live Storefront Preview</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={() => navigateTo('admin')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #0055FF 0%, #002B80 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 85, 255, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <LayoutDashboard size={14} />
            <span>Open Admin Dashboard</span>
          </button>

          <button
            onClick={logoutAdmin}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#F87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Log out of Admin session"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
