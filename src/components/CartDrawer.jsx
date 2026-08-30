import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, Plus, Minus, Trash2, ShoppingBag, MessageSquare, 
  ShieldCheck, Printer, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartCount, 
    getWhatsAppOrderUrl,
    distributor,
    navigateTo,
    viewProductDetail
  } = useStore();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.open(getWhatsAppOrderUrl(), '_blank');
  };

  const handlePrintQuote = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'var(--bg-overlay)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      transition: 'opacity var(--transition-normal)'
    }}>
      
      {/* Backdrop */}
      <div 
        style={{ flex: 1 }} 
        onClick={() => setIsCartOpen(false)} 
      />

      {/* Drawer */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        height: '100%',
        background: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-card-hover)',
        boxShadow: 'var(--glow-electric)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 101,
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-tertiary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--electric-cyan), var(--electric-blue))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#070B14'
            }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', lineHeight: 1.2 }}>Project Quote & BOQ List</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {cartCount} item{cartCount !== 1 ? 's' : ''} selected
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            style={{
              color: 'var(--text-muted)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Wholesale Status Notice Banner */}
        <div style={{
          padding: '0.75rem 1.5rem',
          background: 'rgba(0, 102, 255, 0.08)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Distributor Pricing:
          </div>
          <div className="badge badge-success" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
            ✓ Wholesale & BOQ Rates
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              margin: 'auto 0',
              padding: '2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)'
              }}>
                <ShoppingBag size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Your Quote List is Empty</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Browse our switches, lights, and fans to build your materials quotation list.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="btn btn-primary btn-sm"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    padding: '0.85rem',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-card)',
                    alignItems: 'center'
                  }}
                >
                  <div 
                    onClick={() => {
                      setIsCartOpen(false);
                      viewProductDetail(item);
                    }}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.1) 0%, transparent 70%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = item.fallbackImage;
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5 
                      onClick={() => {
                        setIsCartOpen(false);
                        viewProductDetail(item);
                      }}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '0.72rem', color: 'var(--electric-cyan)', fontWeight: 600 }}>
                      {item.series}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginTop: '0.15rem' }}>
                      Wholesale Rate on WhatsApp
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ padding: '0.25rem 0.45rem', color: 'var(--text-primary)' }}
                        title="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '22px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{ padding: '0.25rem 0.45rem', color: 'var(--text-primary)' }}
                        title="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                      title="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-tertiary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Total Items in List:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{cartCount} Units</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#10B981' }}>
                <span>Pricing Type:</span>
                <span>Wholesale & Project Rates</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', gap: '0.5rem', justifyContent: 'center' }}
            >
              <MessageSquare size={18} />
              <span>Send Quote List on WhatsApp ({distributor.phone1})</span>
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                onClick={handlePrintQuote}
                className="btn btn-outline btn-sm"
                style={{ gap: '0.35rem', justifyContent: 'center' }}
              >
                <Printer size={14} />
                <span>Print Material List</span>
              </button>
              <button
                onClick={clearCart}
                className="btn btn-outline btn-sm"
                style={{ gap: '0.35rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)', justifyContent: 'center' }}
              >
                <Trash2 size={14} />
                <span>Clear List</span>
              </button>
            </div>

            <div style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem'
            }}>
              <ShieldCheck size={14} style={{ color: 'var(--electric-cyan)' }} />
              Direct wholesale supply from Alnoor Traders (Faisalabad)
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
