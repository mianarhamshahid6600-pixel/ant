import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, Eye, Star, ArrowRight, Sparkles, MessageSquare 
} from 'lucide-react';

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
    { id: 'all', label: 'All Featured' },
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
    <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 1.75rem' }}>
          <div className="badge badge-prime" style={{ marginBottom: '0.4rem', fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
            <Sparkles size={12} />
            Top Recommendations
          </div>
          <h2>
            Popular Prime <span className="text-electric-blue">Products</span>
          </h2>
          <p style={{ marginTop: '0.35rem', fontSize: '0.92rem' }}>
            Top-selling switches, bright ceiling lights, low-power fans, and tested circuit breakers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.4rem',
          flexWrap: 'wrap',
          marginBottom: '1.75rem'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.35rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: activeTab === tab.id 
                  ? 'var(--badge-bg)' 
                  : 'var(--bg-card)',
                color: activeTab === tab.id ? 'var(--text-accent)' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--border-card-hover)' : 'var(--border-card)'}`,
                boxShadow: activeTab === tab.id ? 'var(--glow-electric)' : 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid-products">
          {filteredProducts.slice(0, 8).map((product) => {
            return (
              <div 
                key={product.id}
                className="glass-card product-card"
                onClick={() => viewProductDetail(product)}
                style={{ cursor: 'pointer' }}
              >
                {/* Top Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  zIndex: 2,
                  display: 'flex',
                  gap: '0.3rem'
                }}>
                  {product.badge && (
                    <span className="badge badge-prime" style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem' }}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div className="product-image-wrap">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
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
                      bottom: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      opacity: 0.95,
                      boxShadow: '0 3px 12px rgba(0,0,0,0.35)',
                      padding: '0.3rem 0.7rem',
                      fontSize: '0.75rem',
                      gap: '0.3rem'
                    }}
                  >
                    <Eye size={13} />
                    <span>Quick Specs</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="product-body">
                  
                  {/* Series and Rating */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {product.series}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', color: '#F59E0B' }}>
                      <Star size={12} fill="#F59E0B" />
                      <span>{product.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    marginBottom: '0.3rem',
                    color: 'var(--text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '2.4em',
                    lineHeight: 1.3
                  }}>
                    {product.name}
                  </h4>

                  {/* Feature Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.6rem' }}>
                    {product.features?.slice(0, 2).map((feat, i) => (
                      <span 
                        key={i} 
                        style={{
                          fontSize: '0.68rem',
                          background: 'var(--bg-tertiary)',
                          color: 'var(--text-secondary)',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Action & WhatsApp Row (No numeric price) */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '0.55rem',
                    borderTop: '1px solid var(--border-subtle)',
                    gap: '0.4rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                        Wholesale Rate
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        Contact on WhatsApp
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                      <a
                        href={getWhatsAppProductUrl(product, 1)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-whatsapp btn-sm"
                        style={{ padding: '0.35rem 0.55rem', gap: '0.3rem', fontSize: '0.75rem' }}
                        title="Inquire Price on WhatsApp"
                      >
                        <MessageSquare size={14} />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="btn btn-primary btn-sm"
                        style={{
                          padding: '0.35rem 0.55rem',
                          fontSize: '0.75rem'
                        }}
                        title="Add to Quote List"
                      >
                        <ShoppingBag size={13} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '2.25rem' }}>
          <button 
            onClick={() => navigateTo('shop')}
            className="btn btn-electric"
            style={{ gap: '0.4rem' }}
          >
            <span>View All Products in Store</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
