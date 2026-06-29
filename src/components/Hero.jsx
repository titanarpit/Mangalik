import React, { useState, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'
import img1 from '../assets/images/Jerkeis/Home Page/Hero 1.png'
import img2 from '../assets/images/Jerkeis/Home Page/Hero 2.png'
import img4 from '../assets/images/herosection/4.png'
import img5 from '../assets/images/herosection/5.png'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = [img1, img2, img4, img5]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="hero section-padding">
      <div className="container flex items-center justify-between">
        <div className="hero-content">
          <h1>Love Them Back with <span>Every Bite.</span></h1>
          <p>Just because your best buddy deserves better<br/>than "kibble."<br/>Give their tail-wag, their purr, and their play all the power of 100% natural nutrition.</p>
          <div className="hero-btns">
            <HashLink smooth to="/#categories" className="btn btn-primary">Shop Now</HashLink>
            <HashLink smooth to="/#why-us" className="btn btn-outline">Learn More</HashLink>
          </div>
        </div>
        <div className="hero-image">
          <div className="carousel-container">
            {images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Pet Slide ${index + 1}`} 
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ mixBlendMode: 'multiply' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
