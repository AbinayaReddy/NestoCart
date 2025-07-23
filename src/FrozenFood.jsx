import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './frozen.css';

function FrozenFood() {
  const frozenProducts = useSelector((globalState) => globalState.products.frozenFood) || [];
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  // Filter frozenProducts based on searchQuery (case-insensitive)
  const filteredProducts = frozenProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // When search changes, reset to page 1
  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <section className="frozenfood-section">
      <header className="frozenfood-header">
        <h1>❄️ Premium Frozen Food </h1>
      </header>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Frozen Food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="frozenfood-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <article className="frozenfood-card" key={item.id}>
              <img src={item.image} alt={item.name} className="frozenfood-card-img" />
              <h3 className="frozenfood-card-title">{item.name}</h3>
              <p className="frozenfood-card-price">₹{item.price.toFixed(2)}</p>
              <button
                className="frozenfood-add-btn"
                onClick={() => dispatch(addToCart(item))}
              >
                🛒 Add to Cart
              </button>
            </article>
          ))
        ) : (
          <p>No frozen food items found.</p>
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
    </section>
  );
}

export default FrozenFood;
