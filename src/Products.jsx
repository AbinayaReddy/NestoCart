import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './products.css';
import { addToCart } from './store';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((globalState) => globalState.products) || [];

  let mergedProducts = [];
  for(let key in products){
    mergedProducts.push(...products[key]);
  }

  mergedProducts = mergedProducts.sort((a,b)=>{
    if(a.name > b.name)
        return -1;
    return 1;
  })
  

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Apply filter to all products, not just current page
  const filteredAllItems = mergedProducts.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredAllItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAllItems.length / itemsPerPage);

  return (
    <div className="products-container">
      <h1 className="products-title">All Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to page 1 on search
        }}
        className="products-search"
      />

      <div className="products-grid">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div className="products-card" key={product.id}>
              <div className="products-img-wrapper">
                <img
                  src={product.image || "/Vegetables/Grocery Image.png"}
                  alt={product.name}
                  className="products-image"
                  loading="lazy"
                />
              </div>
              <h3 className="products-name">{product.name}</h3>
              <p className="products-price">₹{product.price}</p>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="products-button"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
            No Products found matching "{searchQuery}".
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

export default Products;
