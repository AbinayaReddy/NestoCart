import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './nonveg.css';
import { addToCart } from './store';

function NonVeg() {
  const dispatch = useDispatch();
  const nonVegProducts = useSelector(globalstate => globalstate.products.nonVeg) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter products by search query (case-insensitive)
  const filteredProducts = nonVegProducts.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset to first page on new search
  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="nonveg-container">
      <h1 className="nonveg-title">🍗 Fresh Non-Veg 🍗</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Non-Veg Items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="nonveg-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div className="nonveg-card" key={index}>
              <div className="card-img-wrapper">
                <img src={item.image} alt={item.name} className="card-img" />
              </div>
              <h3 className="card-title">{item.name}</h3>
              <p className="card-price">₹{item.price.toFixed(2)}</p>
              <button onClick={() => dispatch(addToCart(item))} className="card-button">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No non-veg items found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
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
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default NonVeg;
