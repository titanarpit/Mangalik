import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLocalProducts } from '../data/products'
import { useAuth } from '../lib/AuthContext'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const products = getLocalProducts()
  const product = [...products].find(p => p.id === parseInt(id))
  
  const [activeImage, setActiveImage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showBuyCard, setShowBuyCard] = useState(false)

  // Parse price from product data (e.g. '₹250.00' -> 250)
  const price = product ? parseInt(product.price.replace(/[^\d]/g, '')) || 299 : 299;

  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Pre-fill if user is logged in
  useEffect(() => {
    if (user && showCheckout) {
      setFormData({
        name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim(),
        email: user.email || '',
        phone: user.user_metadata?.contact_no || '',
        address: user.user_metadata?.full_address || '',
        city: user.user_metadata?.city || '',
        state: user.user_metadata?.state || '',
        pincode: user.user_metadata?.pincode || ''
      });
    }
  }, [user, showCheckout]);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      items: [
        {
          productId: product.id,
          name: product.name,
          price: price,
          quantity: quantity,
          img: product.img
        }
      ],
      totalPrice: price * quantity,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      status: 'Pending'
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('mangalik_orders') || '[]');
    existingOrders.unshift(newOrder);
    localStorage.setItem('mangalik_orders', JSON.stringify(existingOrders));

    setOrderId(newOrderId);
    setOrderPlaced(true);
  };

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
          <Link to="/#products" onClick={() => window.scrollTo(0, 0)} style={{textDecoration: 'underline', color: 'inherit', cursor: 'pointer'}}>Products</Link>
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
            
            {/* Conditional Buy Action */}
            {!showBuyCard ? (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '25px'}}>
                <button className="btn btn-primary" onClick={() => setShowBuyCard(true)} style={{backgroundColor: '#ffa41c', color: '#0f1111', width: '200px', borderRadius: '100px', border: '1px solid #ff8f00', boxShadow: '0 2px 5px rgba(213,217,217,.5)', padding: '12px 24px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease'}}>
                  Buy Now
                </button>
              </div>
            ) : (
              <div className="buy-card">
                <div className="buy-card-price">
                  ₹{price * quantity}
                </div>
                <div className="buy-card-controls">
                  <div className="quantity-selector">
                    <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span className="qty-value">{quantity}</span>
                    <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="btn btn-primary pay-now-btn" onClick={() => setShowCheckout(true)}>
                  Pay Now
                </button>
              </div>
            )}
            
            <div className="product-details-content" style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '30px' }}>
              
              <div className="product-section">
                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Product Description</h3>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-muted, #555)' }}>
                  {product.desc}
                </p>
              </div>

              <div className="product-section" style={{ marginBottom: '-5px' }}>
                <p style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  Unit: <span style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>{product.unit}</span>
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
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Usage Guide</h3>
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

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="checkout-modal-overlay" onClick={() => { if (!orderPlaced) setShowCheckout(false); }}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <h2>{orderPlaced ? 'Order Placed!' : 'Complete Your Order'}</h2>
              {!orderPlaced && (
                <button className="checkout-close-btn" onClick={() => setShowCheckout(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            <div className="checkout-modal-body">
              {orderPlaced ? (
                <div className="success-card">
                  <div className="success-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="success-title">Thank You!</h3>
                  <p className="success-text">
                    Your order has been placed successfully. The owner has been notified and will fulfill it shortly.
                  </p>
                  <div className="order-id-box">{orderId}</div>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => {
                      setShowCheckout(false);
                      setOrderPlaced(false);
                      setShowBuyCard(false);
                      setQuantity(1);
                    }}
                    style={{ width: '100%', borderRadius: '100px', padding: '12px' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="checkout-section-title">Order Summary</div>
                  <div className="checkout-order-summary">
                    <div>
                      <div className="checkout-summary-name">{product.name}</div>
                      <div className="checkout-summary-qty">Quantity: {quantity} × ₹{price}</div>
                    </div>
                    <div className="checkout-summary-total">₹{price * quantity}</div>
                  </div>

                  <div className="checkout-section-title">Delivery &amp; Customer Information</div>
                  <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                    <div className="checkout-form-group">
                      <label htmlFor="checkout-name">Full Name</label>
                      <input 
                        type="text" 
                        id="checkout-name" 
                        className="checkout-input"
                        placeholder="e.g. Rahul Sharma"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group-row">
                      <div className="checkout-form-group">
                        <label htmlFor="checkout-email">Email Address</label>
                        <input 
                          type="email" 
                          id="checkout-email" 
                          className="checkout-input"
                          placeholder="name@example.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="checkout-form-group">
                        <label htmlFor="checkout-phone">Phone Number</label>
                        <input 
                          type="tel" 
                          id="checkout-phone" 
                          className="checkout-input"
                          placeholder="10-digit mobile"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="checkout-form-group">
                      <label htmlFor="checkout-address">Shipping Address</label>
                      <input 
                        type="text" 
                        id="checkout-address" 
                        className="checkout-input"
                        placeholder="Flat/House no, building, street/area"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div className="form-group-row-3">
                      <div className="checkout-form-group">
                        <label htmlFor="checkout-city">City</label>
                        <input 
                          type="text" 
                          id="checkout-city" 
                          className="checkout-input"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div className="checkout-form-group">
                        <label htmlFor="checkout-state">State</label>
                        <input 
                          type="text" 
                          id="checkout-state" 
                          className="checkout-input"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>
                      <div className="checkout-form-group">
                        <label htmlFor="checkout-pincode">Pincode</label>
                        <input 
                          type="text" 
                          id="checkout-pincode" 
                          className="checkout-input"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        />
                      </div>
                    </div>

                    <button type="submit" className="checkout-submit-btn">
                      Place Order (₹{price * quantity})
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
