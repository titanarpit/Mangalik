import React from 'react'
import makeInIndiaImg from '../assets/images/make-in-india.png'

const features = [
  { id: 1, title: '100% Organic', desc: 'No artificial preservatives or synthetic additives.', icon: '🌿' },
  { id: 2, title: 'Vet Approved', desc: 'Formulated by leading pet nutritionists and vets.', icon: '🩺' },
  { id: 3, title: 'Grain Free', desc: 'Easy on digestion and perfect for sensitive pets.', icon: '🌾' },
  { id: 4, title: 'Make in India', desc: 'Proudly Indian for every Indian pet lover.', icon: <img src={makeInIndiaImg} alt="Make in India" style={{width: '90px', height: 'auto', objectFit: 'contain'}} /> },
]

const Features = () => {
  return (
    <section id="features" className="features-section section-padding">
      <div className="container">
        <div className="text-center">
          <h2 style={{fontSize: '2.5rem', marginBottom: '15px'}}>Why Choose <span style={{color: 'var(--primary)'}}>Us?</span></h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto'}}>We are committed to providing the highest quality nutrition for your beloved pets.</p>
        </div>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p style={{color: 'var(--text-muted)'}}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
