import React from 'react'
import defaultAvatar from '../assets/images/reviewers/default-avatar.svg'

const reviews = [
  { id: 1, name: 'Aarav Sharma', rating: 5, review: 'My Golden Retriever loves the Natural Grain-Free food. Highly recommended!', img: defaultAvatar },
  { id: 2, name: 'Isha Patel', rating: 5, review: 'The Cat food is amazing. My cat is much more active now.', img: defaultAvatar },
  { id: 3, name: 'Vikram Singh', rating: 4, review: 'Great quality products. The delivery was also very fast.', img: defaultAvatar },
  { id: 4, name: 'Ananya Reddy', rating: 5, review: 'I finally found food that my picky eater actually enjoys. Thank you Jerkeis!', img: defaultAvatar },
]

const Reviews = () => {
  return (
    <section className="reviews-section section-padding">
      <div className="container">
        <div className="text-center">
          <h2 style={{fontSize: '3rem', marginBottom: '15px'}}>What our <span className="highlight" style={{color: 'var(--primary)'}}>Customers Say</span></h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '50px'}}>Real stories from happy pet parents across India.</p>
        </div>
        
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-img">
                  <img src={review.img} alt={review.name} />
                </div>
                <div className="review-info">
                  <h4>{review.name}</h4>
                  <div className="stars">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} style={{ color: '#FFD700' }}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-text">"{review.review}"</p>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a href="https://forms.gle/gL3dw7eMtgKND6b18" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Submit a Review</a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
