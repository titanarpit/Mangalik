import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dogProducts, catProducts } from '../data/products'

import amazonImg from '../assets/images/marketplace/amazon.png'
import blinkitImg from '../assets/images/marketplace/blinkit.png'
import flipkartImg from '../assets/images/marketplace/flipkart.png'
import zeptoImg from '../assets/images/marketplace/zepto.png'

const ProductDetail = () => {
  const { id } = useParams()
  const product = [...dogProducts, ...catProducts].find(p => p.id === parseInt(id))
  
  const [activeImage, setActiveImage] = useState(null)
  const [showMarketplacePopup, setShowMarketplacePopup] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (product) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const formatTextWithBoldPrefix = (text) => {
    if (typeof text !== 'string') return text;
    const colonIndex = text.indexOf(':');
    if (colonIndex !== -1) {
      const prefix = text.substring(0, colonIndex + 1);
      const suffix = text.substring(colonIndex + 1);
      return (
        <>
          <strong style={{ color: 'var(--text-color, #333)' }}>{prefix}</strong>
          <span style={{ color: 'var(--text-muted, #555)' }}>{suffix}</span>
        </>
      );
    }
    return <span style={{ color: 'var(--text-muted, #555)' }}>{text}</span>;
  };

  useEffect(() => {
    if (!product || product.images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage((prev) => {
        const currentIndex = product.images.indexOf(prev)
        const nextIndex = (currentIndex + 1) % product.images.length
        return product.images[nextIndex]
      })
    }, 2000) // Change image every 2 seconds

    return () => clearInterval(timer)
  }, [product, activeImage])

  if (!product) {
    return (
      <div className="section-padding text-center">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary" style={{marginTop: '20px'}}>Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="product-detail-container section-padding">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb" style={{marginBottom: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative', zIndex: 50}}>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{textDecoration: 'underline', color: 'inherit', cursor: 'pointer'}}>Home</Link> &gt; {' '}
          {dogProducts.some(p => p.id === product.id) ? (
            <Link to="/dog-food" onClick={() => window.scrollTo(0, 0)} style={{textDecoration: 'underline', color: 'inherit', cursor: 'pointer'}}>Dog Food</Link>
          ) : (
            <Link to="/cat-food" onClick={() => window.scrollTo(0, 0)} style={{textDecoration: 'underline', color: 'inherit', cursor: 'pointer'}}>Cat Food</Link>
          )}{' '}
          &gt; <span style={{color: 'var(--secondary)'}}>{product.name}</span>
        </div>

        <div className="product-detail-layout">
          {/* Left Side: Sticky Gallery & Main Image */}
          <div className="product-left-sticky">
            <div className="product-gallery-thumbnails">
              {product.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-wrapper ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="product-main-image">
              <div className="main-image-wrapper">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                />
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="product-info-section">
            <h1 className="product-title" style={{marginBottom: '20px', fontSize: 'clamp(1.5rem, 5.6vw, 3.15rem)'}}>{product.name}</h1>
            
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '25px'}}>
              <button className="btn btn-primary" onClick={() => setShowMarketplacePopup(true)} style={{backgroundColor: '#ffa41c', color: '#0f1111', width: '200px', borderRadius: '100px', border: '1px solid #ff8f00', boxShadow: '0 2px 5px rgba(213,217,217,.5)', padding: '12px 24px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease'}}>Buy Now</button>
              <p style={{fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center', width: '200px'}}>Click on Buy Now to get Prices</p>
            </div>
            
            <div className="product-details-content" style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '30px' }}>
              
              <div className="product-section">
                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Product Description</h3>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-muted, #555)' }}>
                  {product.desc}
                </p>
              </div>

              <div className="product-section" style={{ marginBottom: '-5px' }}>
                <p style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  Net Weight: <span style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>{dogProducts.find(p => p.id === product.id) ? '100g' : '70g'}</span>
                </p>
              </div>

              {product.features && (
                <div className="product-section">
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>About This Item</h3>
                  <ul style={{ paddingLeft: '20px', fontSize: '1.05rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{formatTextWithBoldPrefix(feature)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.ingredients && (
                <div className="product-section">
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Ingredients</h3>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-muted, #555)' }}>{product.ingredients}</p>
                </div>
              )}

              {product.nutritionalFacts && (
                <div className="product-section">
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Nutritional Facts (Per 100g)</h3>
                  <ul style={{ paddingLeft: '20px', fontSize: '1.05rem', lineHeight: '1.6', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                    {product.nutritionalFacts.map((fact, idx) => (
                      <li key={idx}>{formatTextWithBoldPrefix(fact)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.feedingGuide && (
                <div className="product-section">
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>{dogProducts.find(p => p.id === product.id) ? 'Feeding Guide (Daily)' : 'Feeding Guidelines'}</h3>
                  <ul style={{ paddingLeft: '20px', fontSize: '1.05rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {product.feedingGuide.map((guide, idx) => (
                      <li key={idx}>{formatTextWithBoldPrefix(guide)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Pop-up Modal */}
      {showMarketplacePopup && (
        <div className="marketplace-modal-overlay" onClick={() => setShowMarketplacePopup(false)}>
          <div className="marketplace-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowMarketplacePopup(false)}>×</button>
            <h3>Choose a store to buy from</h3>
            <div className="marketplace-options">
              <a href="#" className="marketplace-btn"><img src={amazonImg} alt="Amazon" /></a>
              <a href="#" className="marketplace-btn"><img src={blinkitImg} alt="Blinkit" /></a>
              <a href="#" className="marketplace-btn"><img src={flipkartImg} alt="Flipkart" /></a>
              <a href="#" className="marketplace-btn"><img src={zeptoImg} alt="Zepto" /></a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
