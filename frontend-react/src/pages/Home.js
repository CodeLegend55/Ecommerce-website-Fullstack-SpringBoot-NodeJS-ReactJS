import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to E-Shop</h1>
          <p>Discover amazing products at great prices</p>
          <Link to="/products" className="btn btn-primary btn-large">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            <Link to="/products?category=Electronics" className="category-card">
              <h3>Electronics</h3>
            </Link>
            <Link to="/products?category=Furniture" className="category-card">
              <h3>Furniture</h3>
            </Link>
            <Link to="/products?category=Accessories" className="category-card">
              <h3>Accessories</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
