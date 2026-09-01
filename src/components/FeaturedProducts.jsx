import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Star, ArrowRight, MessageSquare } from 'lucide-react';

export const FeaturedProducts = () => {
  const { 
    products, 
    addToCart, 
    setQuickViewProduct, 
    viewProductDetail,
    getWhatsAppProductUrl,
    navigateTo
  } = useStore();

  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'switches-sockets', label: 'Switches & Sockets' },
    { id: 'dimmers-regulators', label: 'Dimmers' },
    { id: 'smd-downlights', label: 'SMD Lights' },
    { id: 'fans', label: 'Inverter Fans' },
    { id: 'breakers-db', label: 'Breakers & DBs' }
  ];

  const filteredProducts = activeTab === 'all'
    ? products.filter(p => p.featured)
    : products.filter(p => p.category === activeTab);

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '4.5rem 0' }}>
      <div className="container">
        
        {/* Clean, Spacious Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 800 }}>
            Featured <span className="text-electric-blue">Electrical Products</span>
          </h2>
          <p style={{ marginTop: '0.6rem', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            High-quality switches, ceiling lights, low-power fans, and safety circuit breakers.
          </p>
        </div>

        {/* Spacious, Easy-to-Click Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.92rem',
                fontWeight: 700,
                background: activeTab === tab.id 
                  ? 'var(--badge-bg)' 
                  : 'var(--bg-card)',
                color: activeTab === tab.id ? 'var(--text-accent)' : 'var(--text-secondary)',
                border: `1.5px solid ${activeTab === tab.id ? 'var(--border-card-hover)' : 'var(--border-card)'}`,
                boxShadow: activeTab === tab.id ? 'var(--glow-electric)' : 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Spacious Products Grid */}
        <div className="grid-products">
          {filteredProducts.slice(0, 8).map((product) => {
            return (
              <div 
                key={product.id}
                className="glass-card product-card"
                onClick={() => viewProductDetail(product)}
                style={{ 
                  cursor: 'pointer', 
                  borderRadius: 'var(--radius-lg)',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Product Image Wrap */}
                <div 
                  className="product-image-wrap" 
                  style={{ 
                    padding: '1.5rem',
                    background: 'radial-gradient(circle at center, rgba(0, 85, 255, 0.08) 0%, transparent 70%)',
                    height: '210px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.src = product.fallbackImage;
                    }}
                  />

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      opacity: 0.95,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      padding: '0.4rem 0.9rem',
                      fontSize: '0.82rem',
                      gap: '0.35rem',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    <Eye size={14} />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  
                  {/* Category / Series Label */}
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    {product.series}
                  </div>

                  {/* Clear Product Title */}
                  <h3 style={{
                    fontSize: '1.08rem',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.35
                  }}>
                    {product.name}
                  </h3>

                  {/* Pricing and Availability Note */}
                  <div style={{ marginTop: '0.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.92rem', color: '#10B981', fontWeight: 700 }}>
                      Wholesale Price on Request
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      10-Year Warranty • 100% Genuine
                    </div>
                  </div>

                  {/* Large, Easy-to-Click Buttons */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '0.6rem',
                    marginTop: 'auto',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <a
                      href={getWhatsAppProductUrl(product, 1)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-whatsapp"
                      style={{ padding: '0.6rem 0.9rem', gap: '0.4rem', fontSize: '0.88rem', justifyContent: 'center', fontWeight: 700 }}
                    >
                      <MessageSquare size={16} />
                      <span>Order on WhatsApp</span>
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="btn btn-primary"
                      style={{ padding: '0.6rem 0.85rem' }}
                      title="Add to Cart"
                    >
                      <ShoppingBag size={17} />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => navigateTo('shop')}
            className="btn btn-electric"
            style={{ gap: '0.5rem', padding: '0.85rem 2.2rem', fontSize: '1.05rem', fontWeight: 700 }}
          >
            <span>Browse Full Product Catalog</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
