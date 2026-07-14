import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocalProducts, saveLocalProducts, poojaProducts } from '../../data/products';
import './Dashboard.css';

// Fallback high-quality images if assets fail
const FALLBACK_INCENSE = 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=400&q=80';
const FALLBACK_DIYA = 'https://images.unsplash.com/photo-1605141014167-9c98ba9c77ef?auto=format&fit=crop&w=400&q=80';

const Dashboard = () => {
  // Navigation / Tab state
  const [activeView, setActiveView] = useState('orders'); // 'orders' | 'products'

  // Orders State
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Products State
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Pooja Samagri',
    price: '',
    unit: '',
    desc: '',
  });
  const [uploadedImages, setUploadedImages] = useState([]); // array of Base64 strings

  // Seed default orders if localStorage is empty
  const getDemoOrders = () => {
    const defaultOrders = [
      {
        id: 'ORD-98214',
        date: '14 Jul 2026, 10:30 AM',
        items: [
          {
            productId: 1,
            name: 'Premium Sandalwood Agarbatti',
            price: 250,
            quantity: 2,
            img: poojaProducts[0]?.img || FALLBACK_INCENSE
          }
        ],
        totalPrice: 500,
        customer: {
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          phone: '+91 98765 43210',
          address: '402, Shiv Shakti Apartments, Link Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400053'
        },
        status: 'Pending'
      },
      {
        id: 'ORD-98103',
        date: '13 Jul 2026, 04:15 PM',
        items: [
          {
            productId: 2,
            name: 'Sacred Brass Akhand Diya',
            price: 450,
            quantity: 1,
            img: poojaProducts[1]?.img || FALLBACK_DIYA
          }
        ],
        totalPrice: 450,
        customer: {
          name: 'Priya Patel',
          email: 'priya.patel@example.com',
          phone: '+91 87654 32109',
          address: 'A-24, Shanti Nagar, SG Highway',
          city: 'Ahmedabad',
          state: 'Gujarat',
          pincode: '380015'
        },
        status: 'Processing'
      },
      {
        id: 'ORD-97592',
        date: '11 Jul 2026, 11:00 AM',
        items: [
          {
            productId: 3,
            name: 'Complete Pooja Thali Set',
            price: 850,
            quantity: 1,
            img: poojaProducts[2]?.img || FALLBACK_DIYA
          }
        ],
        totalPrice: 850,
        customer: {
          name: 'Amit Verma',
          email: 'amit.verma@example.com',
          phone: '+91 76543 21098',
          address: 'Flat 102, Green Glen Layout, Outer Ring Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560103'
        },
        status: 'Delivered'
      }
    ];
    return defaultOrders;
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const loadOrders = () => {
    const stored = localStorage.getItem('mangalik_orders');
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing orders from localstorage:', e);
        const demo = getDemoOrders();
        localStorage.setItem('mangalik_orders', JSON.stringify(demo));
        setOrders(demo);
      }
    } else {
      const demo = getDemoOrders();
      localStorage.setItem('mangalik_orders', JSON.stringify(demo));
      setOrders(demo);
    }
  };

  const loadProducts = () => {
    setProducts(getLocalProducts());
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        const u = { ...order, status: newStatus };
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(u);
        }
        return u;
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('mangalik_orders', JSON.stringify(updated));
  };

  const acceptOrder = (orderId) => {
    updateOrderStatus(orderId, 'Processing');
  };

  const deleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      const updated = orders.filter(order => order.id !== orderId);
      setOrders(updated);
      localStorage.setItem('mangalik_orders', JSON.stringify(updated));
      setSelectedOrder(null);
    }
  };

  const resetDatabase = () => {
    if (window.confirm('Reset all orders to default seed data? This will clear custom customer orders.')) {
      const demo = getDemoOrders();
      localStorage.setItem('mangalik_orders', JSON.stringify(demo));
      setOrders(demo);
      setSelectedOrder(null);
    }
  };

  // Image Upload handler
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (uploadedImages.length + files.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }

    files.forEach(file => {
      if (file.size > 1024 * 1024) { // 1MB limit for localStorage quota performance
        alert(`Image "${file.name}" is too large. Please upload images under 1MB to optimize performance.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Add Product handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.desc) {
      alert('Please fill in all required product fields');
      return;
    }

    // Set high quality placeholder images based on category
    const defaultImage = newProduct.category === 'Pooja Samagri' ? FALLBACK_INCENSE : FALLBACK_DIYA;
    
    // Choose uploaded images, fallback to default category images
    const finalImages = uploadedImages.length > 0 ? uploadedImages : [defaultImage];

    const addedItem = {
      id: Date.now(),
      name: newProduct.name,
      desc: newProduct.desc,
      category: newProduct.category,
      img: finalImages[0],
      images: finalImages,
      price: `₹${parseFloat(newProduct.price).toFixed(2)}`,
      unit: newProduct.unit || '1 unit',
      rating: 5.0,
      reviews: 1,
      brand: 'MANGLIK',
      features: [newProduct.desc]
    };

    const updatedList = [...products, addedItem];
    setProducts(updatedList);
    saveLocalProducts(updatedList);

    // Reset Form
    setNewProduct({
      name: '',
      category: 'Pooja Samagri',
      price: '',
      unit: '',
      desc: '',
    });
    setUploadedImages([]);

    alert('Product added successfully to ' + newProduct.category + '!');
  };

  // Remove Product handler
  const handleRemoveProduct = (productId) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      const updatedList = products.filter(p => p.id !== productId);
      setProducts(updatedList);
      saveLocalProducts(updatedList);
    }
  };

  // Calculations for Stats
  const activeOrders = orders.filter(o => o.status !== 'Cancelled');
  const totalRevenue = activeOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const completedCount = orders.filter(o => o.status === 'Delivered').length;

  // Filter and Search logic
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    const term = searchQuery.toLowerCase().trim();
    if (!term) return matchesStatus;

    const matchesId = order.id.toLowerCase().includes(term);
    const matchesCustomer = order.customer.name.toLowerCase().includes(term) || 
                            order.customer.email.toLowerCase().includes(term) ||
                            order.customer.phone.includes(term);
    const matchesProduct = order.items.some(item => item.name.toLowerCase().includes(term));

    return matchesStatus && (matchesId || matchesCustomer || matchesProduct);
  });

  return (
    <div className="admin-dashboard-container" style={{ marginTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
      {/* Custom Admin Navbar */}
      <div className="admin-navbar">
        <div className="admin-nav-container">
          <div className="admin-logo-text">
            <span>MANGLIK</span>
            <span className="admin-logo-badge">Owner Panel</span>
          </div>
          
          <div className="admin-nav-links">
            <button 
              className={`admin-nav-tab ${activeView === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveView('orders')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Orders Management
              {pendingCount > 0 && <span style={{ marginLeft: '6px', background: '#ef4444', color: 'white', borderRadius: '50%', padding: '2px 7px', fontSize: '0.75rem', fontWeight: 'bold' }}>{pendingCount}</span>}
            </button>
            <button 
              className={`admin-nav-tab ${activeView === 'products' ? 'active' : ''}`}
              onClick={() => setActiveView('products')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              Products Management
            </button>
          </div>

          <Link to="/" className="admin-nav-website">
            Exit Admin Panel →
          </Link>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '30px' }}>
        {activeView === 'orders' ? (
          /* ================= ORDERS VIEW ================= */
          <>
            {/* Header */}
            <div className="admin-header">
              <div className="admin-header-title">
                <h1>Customer Orders</h1>
                <p>Track customer purchases and update order statuses.</p>
              </div>
              <div className="admin-header-actions">
                <button className="admin-btn admin-btn-secondary" onClick={resetDatabase}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                  </svg>
                  Reset Seed Data
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-icon revenue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <h3>Total Sales</h3>
                  <p>₹{totalRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon orders">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <h3>Orders Count</h3>
                  <p>{orders.length}</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon pending">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <h3>Pending Fulfill</h3>
                  <p>{pendingCount}</p>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon completed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <h3>Delivered</h3>
                  <p>{completedCount}</p>
                </div>
              </div>
            </div>

            {/* Controls Section */}
            <div className="admin-controls">
              <div className="admin-search-wrapper">
                <svg className="admin-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  className="admin-search-input" 
                  placeholder="Search by ID, customer name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-filter-tabs">
                {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                  <button 
                    key={status}
                    className={`admin-filter-btn ${statusFilter === status ? 'active' : ''}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="admin-table-wrapper">
              {filteredOrders.length === 0 ? (
                <div className="admin-empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <h3>No orders found</h3>
                  <p>There are no orders that match your current filters.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Customer Details</th>
                      <th>Items Placed</th>
                      <th>Total Amount</th>
                      <th>Fulfillment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const itemsSummary = order.items.map(i => `${i.name} (${i.quantity}x)`).join(', ');
                      return (
                        <tr key={order.id} onClick={() => setSelectedOrder(order)}>
                          <td className="order-id-cell">{order.id}</td>
                          <td>{order.date}</td>
                          <td>
                            <div className="customer-cell">
                              <span className="customer-name">{order.customer.name}</span>
                              <span className="customer-email">{order.customer.email}</span>
                            </div>
                          </td>
                          <td className="items-cell" title={itemsSummary}>{itemsSummary}</td>
                          <td style={{ fontWeight: '700' }}>₹{order.totalPrice.toLocaleString('en-IN')}</td>
                          <td>
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            {order.status === 'Pending' ? (
                              <button 
                                className="accept-order-btn"
                                onClick={() => acceptOrder(order.id)}
                              >
                                Accept Order
                              </button>
                            ) : (
                              <select
                                className="status-select"
                                style={{ padding: '6px 10px', fontSize: '0.85rem', width: 'auto' }}
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          /* ================= PRODUCTS VIEW ================= */
          <>
            <div className="admin-header">
              <div className="admin-header-title">
                <h1>Products Database</h1>
                <p>Add new products to the categories or remove existing ones.</p>
              </div>
            </div>

            <div className="products-mgmt-section">
              {/* Product List Grid */}
              <div className="products-mgmt-card">
                <h2>All Listed Products ({products.length})</h2>
                {products.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                    No products listed. Add some using the panel on the right.
                  </div>
                ) : (
                  <div className="admin-products-grid">
                    {products.map((product) => (
                      <div key={product.id} className="product-admin-card">
                        <button 
                          className="delete-product-btn"
                          title="Remove product from website"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          ✕
                        </button>
                        <img src={product.img} alt={product.name} className="product-admin-card-img" />
                        <div className="product-admin-card-body">
                          <h3>{product.name}</h3>
                          <div className="product-admin-card-meta">
                            <span className="product-admin-card-price">{product.price}</span>
                            <span className="product-admin-card-cat">{product.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Product Sidebar */}
              <div className="products-mgmt-card">
                <h2>Add New Product</h2>
                <form className="add-product-form" onSubmit={handleAddProduct}>
                  <div>
                    <label>Product Name *</label>
                    <input 
                      type="text" 
                      className="add-product-input"
                      placeholder="e.g. Pure Gangajal Water"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label>Category *</label>
                    <select 
                      className="add-product-select"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                      <option value="Pooja Samagri">Pooja Samagri</option>
                      <option value="Items">Items</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label>Price (₹) *</label>
                      <input 
                        type="number" 
                        className="add-product-input"
                        placeholder="e.g. 150"
                        required
                        min="1"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Unit/Quantity *</label>
                      <input 
                        type="text" 
                        className="add-product-input"
                        placeholder="e.g. 250ml or 1 piece"
                        required
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label>Description *</label>
                    <textarea 
                      className="add-product-textarea"
                      placeholder="Enter detailed description of features, benefits, and ingredients..."
                      required
                      value={newProduct.desc}
                      onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                    />
                  </div>

                  {/* Image Upload Input */}
                  <div>
                    <label>Product Images (Upload up to 4)</label>
                    <input 
                      type="file" 
                      className="add-product-input"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      style={{ padding: '8px' }}
                    />
                    <small style={{ color: 'var(--admin-text-muted)', display: 'block', marginTop: '4px' }}>
                      Add up to 4 images. Maximum size 1MB each.
                    </small>
                    
                    {uploadedImages.length > 0 && (
                      <div className="image-previews-container">
                        {uploadedImages.map((imgSrc, idx) => (
                          <div key={idx} className="image-preview-wrapper">
                            <button 
                              type="button" 
                              className="remove-image-badge"
                              onClick={() => removeUploadedImage(idx)}
                            >
                              ✕
                            </button>
                            <img src={imgSrc} alt={`Preview ${idx + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="admin-btn admin-btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                  >
                    Add Product to Shop
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* Selected Order Details Drawer Overlay */}
        {selectedOrder && (
          <div className="admin-drawer-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="admin-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="admin-drawer-header">
                <h2>Order Details</h2>
                <button className="close-drawer-btn" onClick={() => setSelectedOrder(null)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="admin-drawer-body">
                {/* General */}
                <div>
                  <div className="drawer-section-title">Overview</div>
                  <div className="drawer-detail-grid">
                    <div>
                      <div className="drawer-detail-label">Order ID</div>
                      <div className="drawer-detail-value order-id-cell">{selectedOrder.id}</div>
                    </div>
                    <div>
                      <div className="drawer-detail-label">Date &amp; Time</div>
                      <div className="drawer-detail-value">{selectedOrder.date}</div>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <div className="drawer-section-title">Customer Information</div>
                  <div className="drawer-detail-grid">
                    <div className="drawer-detail-item full-width">
                      <div className="drawer-detail-label">Full Name</div>
                      <div className="drawer-detail-value">{selectedOrder.customer.name}</div>
                    </div>
                    <div>
                      <div className="drawer-detail-label">Email Address</div>
                      <div className="drawer-detail-value" style={{ wordBreak: 'break-all' }}>{selectedOrder.customer.email}</div>
                    </div>
                    <div>
                      <div className="drawer-detail-label">Phone Number</div>
                      <div className="drawer-detail-value">{selectedOrder.customer.phone}</div>
                    </div>
                    <div className="drawer-detail-item full-width">
                      <div className="drawer-detail-label">Shipping Address</div>
                      <div className="drawer-detail-value" style={{ lineHeight: '1.4' }}>
                        {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Placed */}
                <div>
                  <div className="drawer-section-title">Items Placed</div>
                  <div className="drawer-items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="drawer-item-row">
                        {item.img && <img src={item.img} alt={item.name} className="drawer-item-img" />}
                        <div className="drawer-item-info">
                          <div className="drawer-item-name">{item.name}</div>
                          <div className="drawer-item-meta">Qty: {item.quantity} × ₹{item.price}</div>
                        </div>
                        <div className="drawer-item-price">₹{item.price * item.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="drawer-total-box">
                  <span className="drawer-total-label">Grand Total</span>
                  <span className="drawer-total-value">₹{selectedOrder.totalPrice.toLocaleString('en-IN')}</span>
                </div>

                {/* Status Update */}
                <div className="status-update-box">
                  <div className="drawer-section-title">Fulfillment Status</div>
                  {selectedOrder.status === 'Pending' ? (
                    <button 
                      className="admin-btn admin-btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => acceptOrder(selectedOrder.id)}
                    >
                      Accept Order
                    </button>
                  ) : (
                    <select 
                      className="status-select"
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="admin-drawer-footer">
                <button className="admin-btn admin-btn-danger" onClick={() => deleteOrder(selectedOrder.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Delete Order
                </button>
                <button className="admin-btn admin-btn-secondary" onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
