import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Cart from '../Cart/Cart';
import Config from '../config';
import './ProductFilter.css';

const ProductFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Config.baseURL}/api/products/products/`, {
        params: { query, category: selectedCategory }
      });
      setProducts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/api/products/categories_list/`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("There was an error fetching the categories data!", error);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const tags = [
    { name: 'الرئيسية', link: '/' },
    { name: 'المنتجات', link: '#' },
  ];

  return (
    <>
      <Breadcrumb tags={tags} />
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

        <div className='product-filter-select'>
          <div className="product-filter">
            <div className='div_select'>
              <label htmlFor="category-select">فلتر</label>
              <select id="category-select" onChange={handleFilterChange}>
                <option value="">جميع الفئات</option>
                {categories?.map((category) => (
                  <option key={category} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Cart products={products} title={''} />
      )}
    </>
  );
};

export default ProductFilter;
