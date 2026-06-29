import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dogProducts } from '../data/products'

const DogFood = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-container section-padding">
      <div className="container">
        <div className="text-center" style={{marginBottom: '60px'}}>
          <h1 style={{fontSize: '3.5rem', marginBottom: '20px'}}>Premium <span className="highlight" style={{color: 'var(--primary)'}}>Dog Food</span></h1>
          <p style={{color: 'var(--text-muted)', fontSize: '1.2rem'}}>Discover the best nutrition tailored for your dog's needs.</p>
        </div>
        
        <div className="products-grid">
          {dogProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card dog-product-card" style={{textDecoration: 'none', color: 'inherit'}}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <button className="btn btn-primary" style={{marginTop: '20px', width: '100%'}}>Buy now</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DogFood
