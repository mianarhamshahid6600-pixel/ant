import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, MessageSquare, Phone, CheckCircle2, ChevronRight, 
  Sparkles, Zap, Flame, Award, ArrowLeft,
  Share2, Check, Star, Building2, PackageCheck, Truck, Clock, Eye, ShoppingBag
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { 
    selectedProduct, 
    products, 
    categories,
    navigateTo, 
    viewProductDetail, 
    addToCart, 
    distributor 
  } = useStore();

  // If no product is selected, fallback to the first product
  const product = selectedProduct || products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Matte Black');
  const [copied, setCopied] = useState(false);

  // Available colors/finishes
  const availableColors = [
    { name: 'Matte Black', hex: '#1A1D20', border: '#334155' },
    { name: 'Pure White', hex: '#F8FAFC', border: '#CBD5E1' },
    { name: 'Slate Grey', hex: '#475569', border: '#64748B' },
    { name: 'Rose Gold', hex: '#B76E79', border: '#D4909B' }
  ];

  // Gallery images
  const galleryImages = [
    product.image || product.fallbackImage,
    product.fallbackImage || product.image,
    '/images/products/art-black.png',
    '/images/products/lg-series.png'
  ].filter(Boolean);

  const currentImage = galleryImages[activeImageIndex] || product.image || product.fallbackImage;

  // Find category name
  const categoryObj = categories.find(c => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.name : 'Products';

  // Related products in the same category or series
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.series === product.series))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate customized WhatsApp Order URL with selected finish and quantity
  const getCustomWhatsAppUrl = () => {
    const text = `*ORDER & INQUIRY - ALNOOR TRADERS*\n\n` +
      `*Product:* ${product.name}\n` +
      `*Series:* ${product.series || 'Prime Lighting'}\n` +
      `*Finish/Color:* ${selectedColor}\n` +
      `*Quantity:* ${quantity} Units\n` +
      `*Wholesale Inquiry:* Please send best wholesale discount rates.\n\n` +
      `_From Alnoor Traders Web Catalog_`;

    return `https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* Breadcrumb Navigation Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.75rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <button 
              onClick={() => navigateTo('home')}
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Home
            </button>
            <ChevronRight size={13} />
            <button 
              onClick={() => navigateTo('shop', product.category)}
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {categoryName}
            </button>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>{product.name}</span>
          </nav>

          <button 
            onClick={() => navigateTo('shop', product.category)}
            className="btn btn-outline btn-sm"
            style={{ gap: '0.35rem', fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}
          >
            <ArrowLeft size={13} />
            <span>Back to {categoryName}</span>
          </button>

        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="container" style={{ marginTop: '2rem' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(340px, 1.2fr)',
          gap: '2.75rem',
          alignItems: 'start'
        }} className="product-detail-grid">
          
          {/* ================= LEFT: WORLD-CLASS PRODUCT GALLERY ================= */}
          <div>
            
            {/* Main Stage Image Card */}
            <div 
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 2rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '390px',
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 85, 255, 0.12) 0%, var(--bg-card) 85%)',
                border: '1px solid var(--border-card-hover)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-elevated)'
              }}
            >
              {/* Badges Over Stage */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                <span className="badge badge-prime" style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                  <Award size={12} />
                  100% Genuine Prime Stock
                </span>
                {product.badge && (
                  <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                aria-label="Share product"
                title="Copy Product Link"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 2,
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: copied ? '#10B981' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
              </button>

              {/* Main Product Image */}
              <img 
                src={currentImage}
                alt={product.name}
                style={{
                  maxWidth: '86%',
                  maxHeight: '290px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 18px 35px rgba(0, 85, 255, 0.35))',
                  transition: 'transform 0.4s ease'
                }}
                onError={(e) => {
                  if (product.fallbackImage && e.target.src !== product.fallbackImage) {
                    e.target.src = product.fallbackImage;
                  }
                }}
              />
            </div>

            {/* Gallery Thumbnails */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              marginTop: '1rem',
              justifyContent: 'center'
            }}>
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: 'var(--radius-md)',
                    padding: '6px',
                    background: activeImageIndex === idx ? 'var(--badge-bg)' : 'var(--bg-card)',
                    border: activeImageIndex === idx ? '2px solid var(--text-accent)' : '1px solid var(--border-card)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <img 
                    src={img} 
                    alt={`Preview ${idx + 1}`} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  />
                </button>
              ))}
            </div>

            {/* Guarantees Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginTop: '1.25rem'
            }}>
              <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem' }}>
                <ShieldCheck size={20} style={{ color: '#10B981', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>10-Year Warranty</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Direct Store Replacement</div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem' }}>
                <Truck size={20} style={{ color: 'var(--text-accent)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Fast Dispatch</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Faisalabad Warehouse</div>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT: PRODUCT DETAILS & ACTIONS ================= */}
          <div>
            
            {/* Series & In-Stock Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span className="badge badge-prime" style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem' }}>
                {product.series || 'Prime Master Series'}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={13} />
                In Stock at Alnoor Warehouse
              </span>
            </div>

            {/* Product Title */}
            <h1 style={{ fontSize: 'clamp(1.6rem, 2.7vw, 2.2rem)', lineHeight: 1.25, color: 'var(--text-primary)', fontWeight: 800 }}>
              {product.name}
            </h1>

            {/* Rating & Verified Contractors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.6rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#F59E0B' }}>
                <Star size={15} fill="#F59E0B" />
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{product.rating || '4.9'}</strong>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {product.reviewsCount || 68} Verified Contractors & Homeowners
              </span>
            </div>

            {/* Distributor Wholesale Pricing Status Box */}
            <div style={{
              marginTop: '1.25rem',
              padding: '1.15rem 1.35rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--badge-bg)',
              border: '1px solid var(--border-card)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-accent)', fontWeight: 800 }}>
                    Official Distributor Supply
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                    Direct Wholesale Rates Available
                  </div>
                </div>

                <div className="badge badge-success" style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                  ⚡ Instant WhatsApp Quote
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.45rem', lineHeight: 1.5 }}>
                Direct factory supply from <strong>Alnoor Traders</strong>. Special project discounts for contractors, plazas, and bulk house orders.
              </p>
            </div>

            {/* Color / Finish Selector */}
            <div style={{ marginTop: '1.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Color / Finish: <span style={{ color: 'var(--text-accent)' }}>{selectedColor}</span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedColor === color.name ? 'var(--badge-bg)' : 'var(--bg-tertiary)',
                      border: selectedColor === color.name ? '2px solid var(--text-accent)' : '1px solid var(--border-subtle)',
                      color: selectedColor === color.name ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: selectedColor === color.name ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: color.hex,
                      border: `1px solid ${color.border}`
                    }} />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <p style={{ marginTop: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons Card */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.35rem',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)',
              boxShadow: 'var(--shadow-card)'
            }}>
              
              {/* Quantity Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Quantity:
                </span>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                    style={{
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '46px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    aria-label="Increase quantity"
                    style={{
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  (Units)
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                
                {/* 1. Primary Direct WhatsApp Action */}
                <a
                  href={getCustomWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.5rem',
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    gap: '0.5rem',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
                  }}
                >
                  <MessageSquare size={20} />
                  <span>Order on WhatsApp ({distributor.phone1})</span>
                </a>

                {/* 2. Add to Cart & Call Direct Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="btn btn-electric"
                    style={{ gap: '0.4rem', justifyContent: 'center', padding: '0.75rem 1rem' }}
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>

                  <a
                    href={`tel:${distributor.phone1}`}
                    className="btn btn-outline"
                    style={{ gap: '0.4rem', justifyContent: 'center', padding: '0.75rem 1rem' }}
                  >
                    <Phone size={16} />
                    <span>Call Us</span>
                  </a>
                </div>

              </div>

            </div>

            {/* Quick Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '0.75rem',
              marginTop: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Zap size={15} style={{ color: 'var(--text-accent)' }} />
                <span>Pure Silver Contacts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Flame size={15} style={{ color: '#EF4444' }} />
                <span>Flame Retardant PC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Building2 size={15} style={{ color: '#10B981' }} />
                <span>Bulk Supply Ready</span>
              </div>
            </div>

          </div>

        </div>

        {/* Specifications & Details Tabs Section */}
        <div style={{ marginTop: '3.5rem' }}>
          
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            borderBottom: '1px solid var(--border-card)',
            paddingBottom: '0.5rem',
            marginBottom: '1.5rem',
            overflowX: 'auto'
          }}>
            <button
              onClick={() => setActiveTab('specs')}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: activeTab === 'specs' ? 'var(--text-accent)' : 'var(--text-secondary)',
                background: activeTab === 'specs' ? 'var(--badge-bg)' : 'transparent',
                border: activeTab === 'specs' ? '1px solid var(--border-card-hover)' : '1px solid transparent',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              Specifications
            </button>

            <button
              onClick={() => setActiveTab('features')}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: activeTab === 'features' ? 'var(--text-accent)' : 'var(--text-secondary)',
                background: activeTab === 'features' ? 'var(--badge-bg)' : 'transparent',
                border: activeTab === 'features' ? '1px solid var(--border-card-hover)' : '1px solid transparent',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              Features & Highlights
            </button>

            <button
              onClick={() => setActiveTab('distributor')}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: activeTab === 'distributor' ? 'var(--text-accent)' : 'var(--text-secondary)',
                background: activeTab === 'distributor' ? 'var(--badge-bg)' : 'transparent',
                border: activeTab === 'distributor' ? '1px solid var(--border-card-hover)' : '1px solid transparent',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              Distributor Guarantee
            </button>
          </div>

          {/* Tab 1: Technical Specs Table */}
          {activeTab === 'specs' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Official Prime Lighting Product Specifications
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '0.85rem'
              }}>
                {product.specs && Object.entries(product.specs).map(([key, val], idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{key}</span>
                    <strong style={{ color: 'var(--text-primary)', textAlign: 'right' }}>{val}</strong>
                  </div>
                ))}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Distributor</span>
                  <strong style={{ color: 'var(--text-accent)', textAlign: 'right' }}>Alnoor Traders (Faisalabad)</strong>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Warranty</span>
                  <strong style={{ color: '#10B981', textAlign: 'right' }}>10-Year Replacement Guarantee</strong>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Key Features */}
          {activeTab === 'features' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Engineered for Durability, Safety & Modern Aesthetics
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}>
                {(product.features || [
                  'High conductivity pure copper and brass internal terminals',
                  'UV-treated flame retardant polycarbonate casing prevents discoloration',
                  'Ergonomic smooth tactile switch clicks with pure silver contacts',
                  'Standard Pakistani electrical back-box compatibility'
                ]).map((feat, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      gap: '0.6rem',
                      fontSize: '0.88rem'
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Distributor Verification */}
          {activeTab === 'distributor' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Official Prime Traders Distribution Guarantee
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '750px' }}>
                All switches, LED panels, dimmers, and breakers sold by <strong>Alnoor Traders</strong> are sourced directly from the authorized manufacturing lines of <strong>Prime Lighting</strong>. We guarantee 100% genuine products with complete batch serial verification.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1.25rem'
              }}>
                <div style={{ padding: '0.85rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Wholesale Warehouse</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem', fontSize: '0.85rem' }}>Bawana Bazar, Faisalabad</div>
                </div>
                <div style={{ padding: '0.85rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Direct Line</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-accent)', marginTop: '0.2rem', fontSize: '0.85rem' }}>0314 6600174</div>
                </div>
                <div style={{ padding: '0.85rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Wholesale Desk</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-accent)', marginTop: '0.2rem', fontSize: '0.85rem' }}>0324 6600174</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Matching & Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span className="badge badge-prime" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', marginBottom: '0.35rem' }}>
                  Matching Products
                </span>
                <h2 style={{ fontSize: '1.45rem' }}>
                  More in <span className="text-electric-blue">{categoryName}</span>
                </h2>
              </div>

              <button 
                onClick={() => navigateTo('shop', product.category)}
                className="btn btn-outline btn-sm"
                style={{ gap: '0.35rem' }}
              >
                <span>View Full Category</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid-products">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="glass-card product-card"
                  style={{ cursor: 'pointer', border: '1px solid var(--border-card)' }}
                  onClick={() => viewProductDetail(rel)}
                >
                  <div className="product-image-wrap">
                    <img 
                      src={rel.image} 
                      alt={rel.name} 
                      className="product-image"
                      onError={(e) => {
                        if (rel.fallbackImage && e.target.src !== rel.fallbackImage) {
                          e.target.src = rel.fallbackImage;
                        }
                      }}
                    />
                  </div>
                  <div className="product-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-prime" style={{ fontSize: '0.65rem', padding: '0.12rem 0.4rem' }}>
                        {rel.series || 'Prime'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', color: '#F59E0B', fontSize: '0.75rem' }}>
                        <Star size={11} fill="#F59E0B" />
                        <span>{rel.rating || '4.9'}</span>
                      </div>
                    </div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                      {rel.name}
                    </h4>
                    <div style={{ marginTop: 'auto', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-accent)', fontWeight: 700 }}>
                        Wholesale Rate
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
