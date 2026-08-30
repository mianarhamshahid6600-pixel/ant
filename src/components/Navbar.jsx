import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sun, Moon, ShoppingBag, Search, Phone, MessageSquare,
  Menu, X, Sparkles, BookOpen, Layers, ShieldCheck, ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    currentPage,
    navigateTo,
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    distributor
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleNavClick = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setShowSearchModal(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Distributor Utility Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #070B14 0%, #0D1527 50%, #070B14 100%)',
        borderBottom: '1px solid rgba(0, 102, 255, 0.25)',
        color: '#94A3B8',
        fontSize: '0.8rem',
        padding: '0.45rem 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {/* Left: Authorized Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: '#00D2FF',
              fontWeight: 600
            }}>
              <ShieldCheck size={14} />
              Authorized Distributor of Prime Traders
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ display: 'none', md: 'inline' }}>
              Switches • Bulbs • Fans • SMDs • Dimmers • Breakers
            </span>
          </div>

          {/* Right: Quick Direct Call & WhatsApp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={`tel:${distributor.phone1}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#FFFFFF',
                  fontWeight: 600
                }}
              >
                <Phone size={13} style={{ color: '#00D2FF' }} />
                <span>{distributor.phone1}</span>
              </a>
              <span style={{ opacity: 0.4 }}>/</span>
              <a
                href={`tel:${distributor.phone2}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#FFFFFF',
                  fontWeight: 600
                }}
              >
                <span>{distributor.phone2}</span>
              </a>
            </div>

            <a
              href={`https://wa.me/${distributor.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'rgba(37, 211, 102, 0.15)',
                color: '#25D366',
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                fontWeight: 700,
                fontSize: '0.75rem'
              }}
            >
              <MessageSquare size={12} />
              <span>WhatsApp Instant</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all var(--transition-normal)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          paddingBottom: '0.85rem'
        }}>

          {/* Brand Logo with Top-Right "Prime" Badge */}
          <div
            className="brand-container"
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', marginRight: '1.25rem' }}
          >
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <img
                src={theme === 'dark' ? '/images/logo-transparent-white-text.png' : '/images/logo-transparent.png'}
                alt="Alnoor Traders ANT Logo"
                className="brand-logo-img"
                onError={(e) => {
                  e.target.src = '/images/logo-transparent.png';
                }}
              />
              <span className="brand-prime-sup">
                Prime
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
          }} className="desktop-nav">
            <button
              onClick={() => handleNavClick('home')}
              style={{
                fontWeight: currentPage === 'home' ? 700 : 500,
                color: currentPage === 'home' ? 'var(--electric-cyan)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.4rem 0',
                fontSize: '0.95rem'
              }}
            >
              Home
              {currentPage === 'home' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--electric-cyan), var(--electric-blue))',
                  borderRadius: '2px'
                }} />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              style={{
                fontWeight: currentPage === 'shop' ? 700 : 500,
                color: currentPage === 'shop' ? 'var(--electric-cyan)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.4rem 0',
                fontSize: '0.95rem'
              }}
            >
              Shop Now
              {currentPage === 'shop' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--electric-cyan), var(--electric-blue))',
                  borderRadius: '2px'
                }} />
              )}
            </button>

            <button
              onClick={() => handleNavClick('catalog')}
              style={{
                fontWeight: currentPage === 'catalog' ? 700 : 500,
                color: currentPage === 'catalog' ? 'var(--electric-cyan)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.4rem 0',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <BookOpen size={16} />
              Catalog
              {currentPage === 'catalog' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--electric-cyan), var(--electric-blue))',
                  borderRadius: '2px'
                }} />
              )}
            </button>

            {/* Live Product Demo Button */}
            <button
              onClick={() => handleNavClick('demo')}
              style={{
                fontWeight: 700,
                color: currentPage === 'demo' ? '#FFFFFF' : 'var(--electric-cyan)',
                background: currentPage === 'demo' 
                  ? 'linear-gradient(135deg, var(--electric-cyan), var(--electric-blue))' 
                  : 'rgba(0, 102, 255, 0.14)',
                border: '1px solid rgba(0, 210, 255, 0.4)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: currentPage === 'demo' ? 'var(--glow-electric)' : '0 0 12px rgba(0, 102, 255, 0.2)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Sparkles size={14} />
              <span>Live Demo</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              style={{
                fontWeight: currentPage === 'about' ? 700 : 500,
                color: currentPage === 'about' ? 'var(--electric-cyan)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.4rem 0',
                fontSize: '0.95rem'
              }}
            >
              About Distributor
              {currentPage === 'about' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--electric-cyan), var(--electric-blue))',
                  borderRadius: '2px'
                }} />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              style={{
                fontWeight: currentPage === 'contact' ? 700 : 500,
                color: currentPage === 'contact' ? 'var(--electric-cyan)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.4rem 0',
                fontSize: '0.95rem'
              }}
            >
              Contact
              {currentPage === 'contact' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--electric-cyan), var(--electric-blue))',
                  borderRadius: '2px'
                }} />
              )}
            </button>
          </nav>

          {/* Action Buttons & Utility Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

            {/* Live Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Search electrical products"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Search size={18} />
            </button>

            {/* Dark/Light Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark or light theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: theme === 'dark' ? 'rgba(0, 102, 255, 0.15)' : 'rgba(255, 180, 0, 0.15)',
                color: theme === 'dark' ? '#00D2FF' : '#D97706',
                border: `1px solid ${theme === 'dark' ? 'rgba(0, 210, 255, 0.3)' : 'rgba(217, 119, 6, 0.3)'}`,
                transition: 'all var(--transition-fast)'
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Quick Catalog Button */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="btn btn-outline btn-sm hidden-mobile"
              style={{ gap: '0.35rem' }}
            >
              <BookOpen size={15} />
              <span>Catalog</span>
            </button>

            {/* Primary Shop Now Button */}
            <button
              onClick={() => handleNavClick('shop')}
              className="btn btn-primary btn-sm hidden-mobile"
              style={{ gap: '0.4rem' }}
            >
              <ShoppingBag size={15} />
              <span>Shop Now</span>
            </button>

            {/* Cart & Quote Drawer Toggle with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open quote cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 210, 255, 0.2) 100%)',
                color: '#00D2FF',
                border: '1px solid rgba(0, 210, 255, 0.4)',
                boxShadow: cartCount > 0 ? '0 0 15px rgba(0, 210, 255, 0.4)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'linear-gradient(135deg, #00D2FF 0%, #0066FF 100%)',
                  color: '#070B14',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 0 8px rgba(0, 210, 255, 0.8)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle navigation menu"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <button
              onClick={() => handleNavClick('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: currentPage === 'home' ? 'var(--badge-bg)' : 'transparent',
                color: currentPage === 'home' ? 'var(--electric-cyan)' : 'var(--text-primary)',
                fontWeight: 600,
                textAlign: 'left'
              }}
            >
              <span>Home</span>
              <ChevronRight size={16} opacity={0.5} />
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: currentPage === 'shop' ? 'var(--badge-bg)' : 'transparent',
                color: currentPage === 'shop' ? 'var(--electric-cyan)' : 'var(--text-primary)',
                fontWeight: 600,
                textAlign: 'left'
              }}
            >
              <span>Shop All Products</span>
              <ChevronRight size={16} opacity={0.5} />
            </button>

            <button
              onClick={() => handleNavClick('catalog')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: currentPage === 'catalog' ? 'var(--badge-bg)' : 'transparent',
                color: currentPage === 'catalog' ? 'var(--electric-cyan)' : 'var(--text-primary)',
                fontWeight: 600,
                textAlign: 'left'
              }}
            >
              <span>Digital Catalog & Specs</span>
              <ChevronRight size={16} opacity={0.5} />
            </button>

            <button
              onClick={() => handleNavClick('demo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: currentPage === 'demo' ? 'var(--badge-bg)' : 'transparent',
                color: currentPage === 'demo' ? 'var(--electric-cyan)' : 'var(--text-primary)',
                fontWeight: 600,
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} style={{ color: 'var(--electric-cyan)' }} />
                <span>Live Product Demo</span>
              </div>
              <ChevronRight size={16} opacity={0.5} />
            </button>

            <button
              onClick={() => handleNavClick('about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: currentPage === 'about' ? 'var(--badge-bg)' : 'transparent',
                color: currentPage === 'about' ? 'var(--electric-cyan)' : 'var(--text-primary)',
                fontWeight: 600,
                textAlign: 'left'
              }}
            >
              <span>About Distributor</span>
              <ChevronRight size={16} opacity={0.5} />
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: currentPage === 'contact' ? 'var(--badge-bg)' : 'transparent',
                color: currentPage === 'contact' ? 'var(--electric-cyan)' : 'var(--text-primary)',
                fontWeight: 600,
                textAlign: 'left'
              }}
            >
              <span>Contact & Wholesale Inquiries</span>
              <ChevronRight size={16} opacity={0.5} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => handleNavClick('catalog')}
                className="btn btn-outline"
              >
                <BookOpen size={16} />
                <span>Catalog</span>
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="btn btn-primary"
              >
                <ShoppingBag size={16} />
                <span>Shop Now</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Live Search Modal */}
      {showSearchModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 100,
          background: 'var(--bg-overlay)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '5rem 1rem 1rem'
        }}
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '620px',
              padding: '1.5rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-card-hover)',
              boxShadow: 'var(--glow-electric)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem' }}>
                <Search size={18} style={{ color: 'var(--electric-cyan)' }} />
                Search Prime Electrical Products
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1rem'
              }}>
                <Search size={20} style={{ color: 'var(--electric-cyan)' }} />
                <input
                  type="text"
                  placeholder="Search switches, 6M series, dimmers, SMD panels, BLDC fans, breakers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')}>
                    <X size={16} style={{ color: 'var(--text-muted)' }} />
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Popular:</span>
                  {['Art Series', 'LG Glass', 'SMD 12W', 'BLDC Fan', 'Breakers', 'Dimmer'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        navigateTo('shop');
                        setShowSearchModal(false);
                      }}
                      className="badge"
                      style={{ cursor: 'pointer' }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inline styles for responsive header */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
