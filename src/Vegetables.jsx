import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './vegStyles.css';
import { addToCart } from './store';

function Vegetables() {
  const dispatch = useDispatch();
  const vegProducts = useSelector((globalState) => globalState.products.vegetables) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Apply filter to all products, not just current page
  const filteredAllItems = vegProducts.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredAllItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAllItems.length / itemsPerPage);

  return (
    <div className="veg-container">
      <h1 className="veg-title">🌿 Fresh Vegetables 🌿</h1>

      <input
        type="text"
        placeholder="Search vegetables..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to page 1 on search
        }}
        className="veg-search"
      />

      <div className="veg-grid">
        {currentItems.length > 0 ? (
          currentItems.map((vegProduct) => (
            <div className="veg-card" key={vegProduct.id}>
              <div className="veg-img-wrapper">
                <img
                  src={vegProduct.image || "/Vegetables/Grocery Image.png"}
                  alt={vegProduct.name}
                  className="veg-image"
                  loading="lazy"
                />
              </div>
              <h3 className="veg-name">{vegProduct.name}</h3>
              <p className="veg-price">₹{vegProduct.price}</p>
              <button
                onClick={() => dispatch(addToCart(vegProduct))}
                className="veg-button"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
            No vegetables found matching "{searchQuery}".
          </p>
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

export default Vegetables;
