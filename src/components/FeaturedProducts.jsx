import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, Eye, Star, ArrowRight, Sparkles 
} from 'lucide-react';

export const FeaturedProducts = () => {
  const { 
    products, 
    addToCart, 
    setQuickViewProduct, 
    navigateTo,
    isContractorMode 
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
                  ? 'linear-gradient(135deg, var(--electric-cyan) 0%, var(--electric-blue) 100%)' 
                  : 'var(--bg-card)',
                color: activeTab === tab.id ? '#070B14' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === tab.id ? '#00D2FF' : 'var(--border-card)'}`,
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
            const displayPrice = isContractorMode ? product.contractorPrice : product.price;

            return (
              <div 
                key={product.id}
                className="glass-card product-card"
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
                    onClick={() => setQuickViewProduct(product)}
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
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--electric-cyan)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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

                  {/* Price Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Rs. {displayPrice.toLocaleString()}
                        </span>
                        {product.originalPrice && !isContractorMode && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {isContractorMode ? (
                        <div style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 700 }}>
                          Wholesale Applied
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          Wholesale: Rs. {product.contractorPrice.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="btn btn-primary btn-sm"
                      style={{
                        padding: '0.35rem 0.65rem',
                        gap: '0.25rem',
                        fontSize: '0.78rem'
                      }}
                      title="Add to Quote"
                    >
                      <ShoppingBag size={13} />
                      <span>Add</span>
                    </button>
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
