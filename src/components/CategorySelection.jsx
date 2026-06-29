import React from 'react'
import { Link } from 'react-router-dom'
import dogImg from '../assets/dog_category.png'
import catImg from '../assets/cat_category.png'

const CategorySelection = () => {
  return (
    <section id="categories" className="category-selection section-padding">
      <div className="container">
        <div className="text-center">
          <h2 className="selection-title">
            Shop by <span className="highlight">Category</span>
          </h2>
        </div>
        <div className="category-grid">
          <Link to="/dog-food" className="category-card">
            <div className="category-image-wrapper">
              <img src={dogImg} alt="Dogs" />
            </div>
            <h3>Dogs</h3>
          </Link>
          <Link to="/cat-food" className="category-card">
            <div className="category-image-wrapper">
              <img src={catImg} alt="Cats" />
            </div>
            <h3>Cats</h3>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategorySelection
