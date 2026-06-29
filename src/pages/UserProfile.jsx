import React from 'react'
import './UserProfile.css'

const UserProfile = () => {
  // Mock User Data
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobile: '+1 234 567 8900',
    address: '123 Manglik Street, Apt 4B, New York, NY 10001'
  }

  // Mock Order History
  const orders = [
    {
      id: 'ORD-84729',
      date: 'Oct 15, 2026',
      total: '$120.50',
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD-84612',
      date: 'Sep 28, 2026',
      total: '$45.00',
      status: 'Processing',
      items: 1
    },
    {
      id: 'ORD-83999',
      date: 'Aug 10, 2026',
      total: '$210.00',
      status: 'Delivered',
      items: 5
    }
  ]

  const handleLogout = () => {
    // Mock logout action
    window.location.href = '/'
  }

  return (
    <div className="profile-dashboard section-padding">
      <div className="container">
        
        <div className="dashboard-header">
          <div>
            <h1>My Account</h1>
            <p>Welcome back, {user.firstName}!</p>
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
                <span className="info-value">{user.firstName} {user.lastName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Address</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Mobile Number</span>
                <span className="info-value">{user.mobile}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Shipping Address</span>
                <span className="info-value address-value">{user.address}</span>
              </div>
            </div>
          </div>

          {/* Order History Card */}
          <div className="dashboard-card orders-card">
            <div className="card-header">
              <h2>Order History</h2>
            </div>
            
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-main-info">
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-items">{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                    <span className="order-total">{order.total}</span>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserProfile
