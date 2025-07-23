import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import Grocery   from '../public/Vegetables/Grocery Image.png'

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-text">
          <h1>Welcome to NestoCart</h1>
          <p className="brand-tagline">NestoCart – Everything You Need, Right to Your Nest.</p>
          <Link to="/products" className="shop-now-button">Shop Now</Link>
        </div>
        <img 
          src={Grocery}
          alt="Vegetables Grocery" 
          className="hero-image" 
        />
      </section>

      {/* Search Bar */}
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </section>

      {/* Category Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <Link to="/category/vegetables" className="category-card cat-veg">Vegetables</Link>
          <Link to="/category/frozenfood" className="category-card cat-frozen">Frozen Food</Link>
          <Link to="/category/nonveg" className="category-card cat-nonveg">Non-Veg</Link>
          <Link to="/category/milk" className="category-card cat-milk">Milk</Link>
          <Link to="/category/chocolate" className="category-card cat-choco">Chocolates</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
