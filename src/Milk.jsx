import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Milk.css';
import { addToCart } from './store';

function Milk() {
  const dispatch = useDispatch();
  const milkProducts = useSelector((globalState) => globalState.products.milk) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  // Filter products based on search query (case insensitive)
  const filteredProducts = milkProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // When search is triggered, reset to page 1
  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="milk-page">
      <h1 className="milk-title">🥛 Fresh and Healthy Dairy Products</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Milk Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="milk-grid">
        {currentItems.length > 0 ? (
          currentItems.map((milkProduct) => (
            <div className="milk-card" key={milkProduct.id || milkProduct.name}>
              <img src={milkProduct.image} alt={milkProduct.name} className="milk-img" />
              <h3 className="milk-name">{milkProduct.name}</h3>
              <p className="milk-price">₹{milkProduct.price.toFixed(2)}</p>
              <button
                onClick={() => dispatch(addToCart(milkProduct))}
                className="milk-btn"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No milk products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active-page' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Milk;
