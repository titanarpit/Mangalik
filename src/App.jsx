import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import ShippingReturn from './pages/ShippingReturn'
import ProfileAuth from './pages/ProfileAuth'
import UserProfile from './pages/UserProfile'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProfileAuth />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/shipping-return" element={<ShippingReturn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App