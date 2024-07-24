 

import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function CreateBestSellers({ fetchData }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/home/best/`, formData);
      setShowModalCreate(false);
      fetchData();
      setFormData({ product: '' });
    } catch (error) {
      console.error("Error creating products:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
       const response = await AxiosInstance.get(`${Config.baseURL}/api/products/product_list_dash/`);

      setProducts(response.data.products);
    } catch (error) {
      console.error("There was an error fetching the products data!", error);
    }
  };

  const handleProductChange = (e) => {
    setFormData({ ...formData, product: e.target.value });
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>
      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>انشاء جديد</div>
          
          <label htmlFor="product-select" style={{ paddingTop: '15px', textAlign: 'center', float: 'right', marginBottom: '5px' }}>
            اختر المنتج
          </label>
          <select id="product-select" onChange={handleProductChange} value={formData.product}>
            <option value="">المنتجات</option>
            {products.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          
          <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
          <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}

