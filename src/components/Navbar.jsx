import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    closeMobileMenu()
    
    if (location.pathname !== '/') {
      navigate('/#' + targetId)
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
        window.history.pushState(null, '', '/#' + targetId)
      }
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="logo" onClick={() => { closeMobileMenu(); window.scrollTo(0, 0); }}>
          <img src={logo} alt="AGRANEX Logo" width={154} />
        </Link>
        
        <div className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => { closeMobileMenu(); window.scrollTo(0, 0); }}>Home</Link></li>
          <li><a href="/#categories" onClick={(e) => handleNavClick(e, 'categories')}>Products</a></li>
          <li><a href="/#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
          <li><a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
        </ul>
        
        <div className="nav-btns">
          <a href="/#categories" className="btn btn-primary" onClick={(e) => handleNavClick(e, 'categories')}>Shop Now</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar