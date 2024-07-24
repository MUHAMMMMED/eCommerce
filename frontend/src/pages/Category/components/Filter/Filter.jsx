import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import Cart from '../../../../components/Cart/Cart';
import Config from '../../../../components/config';
import './Filter.css';

const Filter = ({ categoryId }) => {
 
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchProducts = async (query) => {
      setLoading(true);
      try {
   
        const response = await axios.get(`${Config.baseURL}/api/products/category/${categoryId}/`, {
          params: { query }
        });
        setProducts(response.data.products);
        setCategory(response.data.categories);
  
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

  const tags = [
    { name: 'الرئيسية', link: '/' },
    { name: category?.name, link: '#' },
  ];
  return (
    <>
     <Breadcrumb tags={tags}/>

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
 

 <Cart products={products} title={''} />


      {/* </div> */}
    </>
  );
};

export default  Filter;
