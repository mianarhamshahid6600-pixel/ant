import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, MessageSquare, Phone, CheckCircle2, ChevronRight, 
  Sparkles, Zap, Flame, Award, RefreshCw, Layers, ArrowLeft,
  Share2, FileText, Check, Star, Building2, PackageCheck
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { 
    selectedProduct, 
    products, 
    navigateTo, 
    viewProductDetail, 
    addToCart, 
    getWhatsAppProductUrl, 
    distributor 
  } = useStore();

  // If no product is selected, fallback to the first product
  const product = selectedProduct || products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Gallery image fallback list
  const galleryImages = [
    product.image || product.fallbackImage,
    product.fallbackImage || product.image,
    '/images/products/art-black.png',
    '/images/products/art-white.png'
  ].filter(Boolean);

  const currentImage = galleryImages[activeImageIndex] || product.image || product.fallbackImage;

  // Find related products in the same category or series
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

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* Breadcrumb Navigation Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.85rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <button 
              onClick={() => navigateTo('home')}
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00D2FF'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Home
            </button>
            <ChevronRight size={13} />
            <button 
              onClick={() => navigateTo('shop')}
              style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00D2FF'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Shop
            </button>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--electric-cyan)', fontWeight: 600 }}>{product.name}</span>
          </nav>

          <button 
            onClick={() => navigateTo('shop')}
            className="btn btn-outline btn-sm"
            style={{ gap: '0.35rem', fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}
          >
            <ArrowLeft size={13} />
            <span>Back to All Products</span>
          </button>

        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(340px, 1.25fr)',
          gap: '2.5rem',
          alignItems: 'start'
        }} className="product-detail-grid">
          
          {/* LEFT: Premium High-Definition Image Gallery */}
          <div>
            <div 
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '380px',
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.12) 0%, var(--bg-card) 85%)',
                border: '1px solid var(--border-card-hover)',
                overflow: 'hidden'
              }}
            >
              {/* Prime Authenticity Hologram Badge */}
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
                  <span className="badge badge-electric" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                aria-label="Share product"
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
                  maxWidth: '85%',
                  maxHeight: '280px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 15px 30px rgba(0, 102, 255, 0.35))',
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
                    background: activeImageIndex === idx ? 'rgba(0, 102, 255, 0.2)' : 'var(--bg-card)',
                    border: activeImageIndex === idx ? '2px solid var(--electric-cyan)' : '1px solid var(--border-card)',
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

            {/* Quick Guarantees Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginTop: '1.25rem'
            }}>
              <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                <ShieldCheck size={18} style={{ color: '#10B981', flexShrink: 0 }} />
                <span>10-Year Replacement Guarantee</span>
              </div>
              <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                <PackageCheck size={18} style={{ color: 'var(--electric-cyan)', flexShrink: 0 }} />
                <span>Original Distributor Box Pack</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Details & WhatsApp Inquiries */}
          <div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span className="badge badge-prime" style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem' }}>
                {product.series || 'Prime Master Series'}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={13} />
                In Stock at Faisalabad Warehouse
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', lineHeight: 1.25, color: 'var(--text-primary)' }}>
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.6rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#F59E0B' }}>
                <Star size={14} fill="#F59E0B" />
                <strong style={{ color: 'var(--text-primary)' }}>{product.rating || '4.9'}</strong>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {product.reviewsCount || 86} Verified Project Contractors
              </span>
            </div>

            {/* Distributor Wholesale Notice Banner */}
            <div style={{
              marginTop: '1.25rem',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.12) 0%, rgba(0, 210, 255, 0.08) 100%)',
              border: '1px solid rgba(0, 210, 255, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--electric-cyan)', fontWeight: 800 }}>
                    Distributor Pricing Status
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.15rem' }}>
                    Wholesale & Contractor Rates Available
                  </div>
                </div>

                <div className="badge badge-success" style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                  ⚡ Same-Day Quote
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.45 }}>
                Direct official distributor supply from <strong>Alnoor Traders</strong>. Get special discounts for home constructions, plazas, and bulk carton orders.
              </p>
            </div>

            {/* Description */}
            <p style={{ marginTop: '1.25rem', fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {product.description}
            </p>

            {/* Quantity Selector & Direct WhatsApp Action Row */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)'
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Required Quantity:
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
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      fontSize: '1.1rem',
                      fontWeight: 700
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '42px', textAlign: 'center', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    aria-label="Increase quantity"
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      fontSize: '1.1rem',
                      fontWeight: 700
                    }}
                  >
                    +
                  </button>
                </div>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  (Units / Pieces)
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                
                {/* 1. Direct WhatsApp Inquiry Button */}
                <a
                  href={getWhatsAppProductUrl(product, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}
                >
                  <MessageSquare size={20} />
                  <span>Contact on WhatsApp for Price ({distributor.phone1})</span>
                </a>

                {/* 2. Add to Quote / BOQ List */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="btn btn-electric"
                    style={{ gap: '0.4rem', justifyContent: 'center' }}
                  >
                    <span>Add to BOQ Quote List</span>
                  </button>

                  <a
                    href={`tel:${distributor.phone1}`}
                    className="btn btn-outline"
                    style={{ gap: '0.4rem', justifyContent: 'center' }}
                  >
                    <Phone size={15} />
                    <span>Call Sales Desk</span>
                  </a>
                </div>

              </div>

            </div>

            {/* Quick Feature Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '0.75rem',
              marginTop: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Zap size={15} style={{ color: 'var(--electric-cyan)' }} />
                <span>Pure Silver Contacts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Flame size={15} style={{ color: '#EF4444' }} />
                <span>Flame Retardant PC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Building2 size={15} style={{ color: '#10B981' }} />
                <span>Bulk Project Supply</span>
              </div>
            </div>

          </div>

        </div>

        {/* Specifications & Technical Details Tabs Section */}
        <div style={{ marginTop: '3.5rem' }}>
          
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            borderBottom: '1px solid var(--border-card)',
            paddingBottom: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={() => setActiveTab('specs')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: activeTab === 'specs' ? '#FFFFFF' : 'var(--text-secondary)',
                background: activeTab === 'specs' ? 'var(--badge-bg)' : 'transparent',
                border: activeTab === 'specs' ? '1px solid var(--border-card-hover)' : '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              Technical Specifications
            </button>

            <button
              onClick={() => setActiveTab('features')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: activeTab === 'features' ? '#FFFFFF' : 'var(--text-secondary)',
                background: activeTab === 'features' ? 'var(--badge-bg)' : 'transparent',
                border: activeTab === 'features' ? '1px solid var(--border-card-hover)' : '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              Key Features & Highlights
            </button>

            <button
              onClick={() => setActiveTab('distributor')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: activeTab === 'distributor' ? '#FFFFFF' : 'var(--text-secondary)',
                background: activeTab === 'distributor' ? 'var(--badge-bg)' : 'transparent',
                border: activeTab === 'distributor' ? '1px solid var(--border-card-hover)' : '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              Distributor Verification & Supply
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
                  <strong style={{ color: 'var(--electric-cyan)', textAlign: 'right' }}>Alnoor Traders (Faisalabad)</strong>
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
                  <strong style={{ color: '#10B981', textAlign: 'right' }}>10-Year Replacement Support</strong>
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
                  'High conductivity pure copper and brass terminals',
                  'UV-treated poly-carbonate casing resists yellowing and discoloration',
                  'Ergonomic smooth tactile switch clicks with silver alloy contacts',
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
                  <div style={{ fontWeight: 700, color: 'var(--electric-cyan)', marginTop: '0.2rem', fontSize: '0.85rem' }}>0314 6600174</div>
                </div>
                <div style={{ padding: '0.85rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Wholesale Desk</div>
                  <div style={{ fontWeight: 700, color: 'var(--electric-cyan)', marginTop: '0.2rem', fontSize: '0.85rem' }}>0324 6600174</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Related Prime Series Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span className="badge badge-prime" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', marginBottom: '0.35rem' }}>
                  Matching Products
                </span>
                <h2 style={{ fontSize: '1.45rem' }}>
                  More from <span className="text-electric-blue">Prime Lighting</span>
                </h2>
              </div>

              <button 
                onClick={() => navigateTo('shop')}
                className="btn btn-outline btn-sm"
                style={{ gap: '0.35rem' }}
              >
                <span>View Full Catalog</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '1.15rem'
            }}>
              {relatedProducts.map(rel => (
                <div 
                  key={rel.id}
                  className="product-card"
                  onClick={() => viewProductDetail(rel)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-image-wrapper" style={{ height: '160px', padding: '1rem' }}>
                    <img 
                      src={rel.image || rel.fallbackImage}
                      alt={rel.name}
                      style={{ maxHeight: '120px', maxWidth: '85%', objectFit: 'contain' }}
                      onError={(e) => {
                        if (rel.fallbackImage) e.target.src = rel.fallbackImage;
                      }}
                    />
                  </div>

                  <div className="product-card-body" style={{ padding: '0.95rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--electric-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {rel.series}
                    </div>
                    <h3 style={{ fontSize: '0.9rem', margin: '0.25rem 0 0.5rem', lineHeight: 1.35 }} className="line-clamp-2">
                      {rel.name}
                    </h3>

                    <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginBottom: '0.4rem' }}>
                        Wholesale Rate on Request
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            viewProductDetail(rel);
                          }}
                          className="btn btn-electric btn-sm"
                          style={{ flex: 1, fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                        >
                          View Details
                        </button>
                        
                        <a
                          href={getWhatsAppProductUrl(rel, 1)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-whatsapp btn-sm"
                          aria-label="WhatsApp price inquiry"
                          style={{ padding: '0.35rem 0.55rem' }}
                        >
                          <MessageSquare size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 850px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
      `}</style>

    </div>
  );
};
