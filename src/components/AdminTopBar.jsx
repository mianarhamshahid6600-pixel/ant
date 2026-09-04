import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, LayoutDashboard, LogOut, CheckCircle2, Database, RefreshCw } from 'lucide-react';

export const AdminTopBar = () => {
  const { 
    isAdminAuthenticated, 
    currentPage, 
    navigateTo, 
    logoutAdmin,
    cloudStatus,
    lastSyncTime,
    isCloudSyncing,
    syncNowWithCloud
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
      padding: '0.4rem 1.25rem',
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
        {/* Left: Admin Status & Cloud Database Connection Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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

          {/* Database Live Cloud Indicator */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: cloudStatus === 'connected' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
            border: `1px solid ${cloudStatus === 'connected' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(234, 179, 8, 0.35)'}`,
            color: cloudStatus === 'connected' ? '#34D399' : '#FBBF24',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            fontSize: '0.74rem',
            fontWeight: 700
          }}>
            <Database size={13} />
            <span>Firebase: {cloudStatus === 'connected' ? 'Live Connected' : 'Connecting...'}</span>
          </span>

          <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem' }} className="hidden-mobile">
            <CheckCircle2 size={12} style={{ color: '#10B981' }} />
            <span>Storefront Preview {lastSyncTime ? `(Synced ${lastSyncTime})` : ''}</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          {/* Force Cloud Sync Button */}
          <button
            onClick={syncNowWithCloud}
            disabled={isCloudSyncing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.76rem',
              cursor: isCloudSyncing ? 'wait' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Force push all store state to Firebase Database"
          >
            <RefreshCw size={12} className={isCloudSyncing ? 'spin-icon' : ''} />
            <span>{isCloudSyncing ? 'Syncing...' : 'Sync Cloud'}</span>
          </button>

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
              fontSize: '0.78rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 85, 255, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <LayoutDashboard size={13} />
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
              fontSize: '0.78rem',
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

      <style>{`
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </aside>
  );
};
