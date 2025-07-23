import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Chocolate.css';
import { addToCart } from './store';

function Chocolate() {
  const dispatch = useDispatch();
  const chocolates = useSelector((globalstate) => globalstate.products.chocolate) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  // Filter all items first
  const filteredChocolates = chocolates.filter(choco =>
    choco.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChocolates = filteredChocolates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChocolates.length / itemsPerPage);

  return (
    <div className="chocolate-container">
      <h1 className="title">🍫 Chocolates</h1>

      <input
        type="text"
        placeholder="Search chocolates..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on new search
        }}
        className="chocolate-search"
      />

      <div className="chocolate-grid">
        {currentChocolates.length > 0 ? (
          currentChocolates.map((choco) => (
            <div className="chocolate-card" key={choco.id || choco.name}>
              <img
                src={choco.image}
                alt={choco.name}
                className="choco-image"
                loading="lazy"
              />
              <h3 className="choco-name">{choco.name}</h3>
              <p className="choco-price">₹{choco.price.toFixed(2)}</p>
              <button
                onClick={() => dispatch(addToCart(choco))}
                className="add-btn"
              >
                Add to Cart 🛒
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
            No chocolates found matching "{searchQuery}".
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

export default Chocolate;
