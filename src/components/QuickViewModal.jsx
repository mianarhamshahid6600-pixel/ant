import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, ShoppingBag, MessageSquare, Star, 
  Plus, Minus, ArrowRight, ShieldCheck 
} from 'lucide-react';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    viewProductDetail,
    getWhatsAppProductUrl,
    distributor
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAdd = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  const handleOpenDetailPage = () => {
    setQuickViewProduct(null);
    viewProductDetail(product);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-overlay)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '1.5rem'
    }}
    onClick={() => setQuickViewProduct(null)}
    >
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-card-hover)',
          boxShadow: 'var(--glow-electric-strong)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          padding: '2rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--text-muted)',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)',
            zIndex: 10
          }}
        >
          <X size={22} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.2fr)',
          gap: '2.5rem',
          alignItems: 'start'
        }} className="modal-grid">
          
          {/* Product Image */}
          <div style={{
            position: 'relative',
            background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.15) 0%, transparent 70%)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px'
          }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                maxHeight: '260px',
                maxWidth: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))'
              }}
              onError={(e) => {
                e.target.src = product.fallbackImage;
              }}
            />

            {product.badge && (
              <span className="badge badge-prime" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--electric-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {product.series}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontSize: '0.85rem' }}>
                <Star size={14} fill="#F59E0B" />
                <span style={{ fontWeight: 700 }}>{product.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.35rem', lineHeight: 1.25, color: 'var(--text-primary)' }}>
              {product.name}
            </h3>

            {/* Wholesale Pricing Status Banner (No numeric prices) */}
            <div style={{
              padding: '0.75rem 1rem',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10B981' }}>
                Wholesale & Project Rates on Request
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Direct Supply from Alnoor Traders • 10-Year Warranty
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {product.description}
            </p>

            {/* Specs Table */}
            {product.specs && (
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '0.45rem 0.8rem', background: 'var(--bg-tertiary)', fontWeight: 700, fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                  Technical Highlights
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', fontSize: '0.78rem' }}>
                  {Object.entries(product.specs).slice(0, 4).map(([key, val], idx) => (
                    <div 
                      key={key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.35rem 0.8rem',
                        background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                        borderTop: '1px solid var(--border-subtle)'
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>{key}:</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                padding: '0.15rem'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.45rem 0.65rem', color: 'var(--text-primary)' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontWeight: 700, minWidth: '28px', textAlign: 'center', fontSize: '0.9rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.45rem 0.65rem', color: 'var(--text-primary)' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="btn btn-primary"
                style={{ flex: 1, gap: '0.4rem', fontSize: '0.85rem' }}
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={getWhatsAppProductUrl(product, quantity)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ width: '100%', gap: '0.4rem', justifyContent: 'center' }}
            >
              <MessageSquare size={16} />
              <span>Order on WhatsApp ({distributor.phone1})</span>
            </a>

            {/* View Full Detail Page Link */}
            <button
              onClick={handleOpenDetailPage}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', gap: '0.4rem', justifyContent: 'center' }}
            >
              <span>View Product Details</span>
              <ArrowRight size={14} />
            </button>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
