import React, { useState, useEffect } from 'react'
import comparisonImg from '../assets/images/Jerkeis/Home Page/Differentiation.png'

const cardData = [
  {
    id: 1,
    title: 'Human-Grade Quality You Can Trust',
    content: "Our treats cannot be compromised on any level, especially when it comes to the core of the ingredients used. Unlike most pet food producers, we do not use leftover materials considered pet-grade. Our treats only include human-grade meat sources, ensuring your pet gets a protein-rich reward that is safe for consumption. The treat will never cease being an actual treat because it will always be made of premium quality ingredients."
  },
  {
    id: 2,
    title: 'Designed for a Longer, Better Chew',
    content: 'While the majority of dental sticks currently available are highly soluble, we strive to create a more durable product that will give dogs enough time to enjoy their meal. Thanks to our unique manufacturing methods, our dental sticks offer a flexible structure and high-resistance qualities that will encourage your dog to chew it for longer periods.'
  },
  {
    id: 3,
    title: 'Odor-Neutral for a Fresh Home',
    content: "When it comes to the smell, we know how important it is for you. Therefore, we managed to develop a special preparation method that makes all our products neutral in odor. That means you can enjoy your pet's company wherever you go without the need to worry about leaving a strong smell behind."
  }
]

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % cardData.length)
      }, 5000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovered])

  return (
    <section id="why-us" className="why-choose-us section-padding">
      <div className="container">
        <div className="text-center" style={{marginBottom: '60px'}}>
          <h2 style={{fontSize: '3rem', marginBottom: '15px'}}>What makes <span style={{color: 'var(--primary)'}}>us</span> different?</h2>
        </div>

        <div className="wcu-layout">
          <div className="wcu-cards-wrapper">
            <div 
              className="wcu-cards-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Invisible dummy card to force container height dynamically based on longest text + stack offset */}
              <div className="wcu-card" style={{ position: 'relative', visibility: 'hidden', zIndex: -1, marginBottom: '50px' }}>
                <h3>{cardData[0].title}</h3>
                <p>{cardData[0].content}</p>
              </div>

              {cardData.map((card, index) => {
                const diff = (index - activeIndex + cardData.length) % cardData.length
                
                const cardStyle = {
                  filter: diff === 0 ? 'none' : `blur(${diff * 1}px)`,
                  opacity: diff === 0 ? 1 : 0.95 - diff * 0.05,
                  cursor: 'pointer'
                }

                return (
                  <div 
                    key={card.id} 
                    className={`wcu-card card-slot-${diff}`} 
                    style={cardStyle} 
                    onClick={() => setActiveIndex(index)}
                  >
                    <h3>{card.title}</h3>
                    <p>{card.content}</p>
                  </div>
                )
              })}
            </div>
            
            {/* Navigation Dots - Now outside the card container */}
            <div className="wcu-dots">
              {cardData.map((_, index) => (
                <div 
                  key={index} 
                  className={`wcu-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="wcu-image">
            <img src={comparisonImg} alt="Comparison" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
