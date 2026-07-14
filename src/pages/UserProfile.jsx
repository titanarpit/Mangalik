import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import './UserProfile.css'

const UserProfile = () => {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="profile-dashboard section-padding min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  // Extract user details from user metadata
  const userData = {
    firstName: user.user_metadata?.first_name || 'N/A',
    lastName: user.user_metadata?.last_name || '',
    email: user.email || '',
    mobile: user.user_metadata?.contact_no || 'N/A',
    address: user.user_metadata?.full_address 
      ? `${user.user_metadata.full_address}, ${user.user_metadata.city || ''}, ${user.user_metadata.state || ''} - ${user.user_metadata.pincode || ''}`
      : 'No address provided'
  }

  // Load real orders from localStorage matching the user's email
  const allOrders = JSON.parse(localStorage.getItem('mangalik_orders') || '[]');
  const userOrders = allOrders.filter(
    (order) => order.customer?.email?.toLowerCase() === user.email?.toLowerCase()
  );

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="profile-dashboard section-padding">
      <div className="container">
        
        <div className="dashboard-header">
          <div>
            <h1>My Account</h1>
            <p>Welcome back, {userData.firstName}!</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline logout-btn">
            Log Out
          </button>
        </div>

        <div className="dashboard-grid">
          {/* Personal Information Card */}
          <div className="dashboard-card info-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              <button className="edit-btn">Edit</button>
            </div>
            
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">{userData.firstName} {userData.lastName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Address</span>
                <span className="info-value">{userData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Mobile Number</span>
                <span className="info-value">{userData.mobile}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Shipping Address</span>
                <span className="info-value address-value">{userData.address}</span>
              </div>
            </div>
          </div>

          {/* Order History Card */}
          <div className="dashboard-card orders-card">
            <div className="card-header">
              <h2>Order History</h2>
            </div>
            
            <div className="orders-list">
              {userOrders.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', padding: '20px 0' }}>
                  No orders placed yet. Browse products to place your first order.
                </div>
              ) : (
                userOrders.map((order) => {
                  const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                  const itemsSummary = order.items.map(i => `${i.name} (${i.quantity}x)`).join(', ');
                  return (
                    <div key={order.id} className="order-item" title={itemsSummary}>
                      <div className="order-main-info">
                        <span className="order-id">{order.id}</span>
                        <span className="order-date">{order.date}</span>
                      </div>
                      <div className="order-details">
                        <span className="order-items">{itemsCount} {itemsCount === 1 ? 'item' : 'items'}</span>
                        <span className="order-total">₹{order.totalPrice.toLocaleString('en-IN')}</span>
                        <span className={`order-status status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserProfile
