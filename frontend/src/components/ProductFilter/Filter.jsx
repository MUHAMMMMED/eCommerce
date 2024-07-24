import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ProductFilter.css';

const Filter = ({ categoryId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/category/${categoryId}/`, {
        params: { query }
      });
      setProducts(response.data.products);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className='Filter'>
        <div className='product-filter-input'>
          <div className="product-filter">
            <div className='div_input'>
              <input
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                className="s-search-input"
                placeholder="بحث عن منتج"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <div>{product.name}</div>
            <div>{product.price} {product.currency}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default  Filter;
