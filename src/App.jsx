import React from 'react';
import { useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CatalogPage } from './pages/CatalogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DemoPage } from './pages/DemoPage';
import { MessageSquare, Phone, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const App = () => {
  const { currentPage, toast, distributor } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage />;
      case 'catalog':
        return <CatalogPage />;
      case 'demo':
        return <DemoPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-container">
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main View Router */}
      <main className="main-content">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Interactive Cart / Quote Drawer */}
      <CartDrawer />

      {/* Global Quick View Product Modal */}
      <QuickViewModal />

      {/* Floating Bottom Quick WhatsApp Action */}
      <aside aria-label="Quick contact" style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem'
      }}>
        <a
          href={`https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! I would like to inquire about Prime Lighting products.')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: '#FFFFFF',
            padding: '0.75rem 1.25rem',
            borderRadius: '999px',
            boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'all var(--transition-fast)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
          className="animate-pulse-glow"
        >
          <MessageSquare size={20} />
          <span>Quick Quote: {distributor.phone1}</span>
        </a>
      </aside>

      {/* Global Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '24px',
          zIndex: 120,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--glow-electric-strong)',
          border: '1px solid var(--border-card-hover)',
          animation: 'fadeIn 0.3s ease'
        }}>
          {toast.type === 'info' ? (
            <Info size={18} style={{ color: 'var(--electric-cyan)' }} />
          ) : toast.type === 'warning' ? (
            <AlertTriangle size={18} style={{ color: '#F59E0B' }} />
          ) : (
            <CheckCircle size={18} style={{ color: '#10B981' }} />
          )}
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{toast.message}</span>
        </div>
      )}

      {/* Global Toast Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
};
