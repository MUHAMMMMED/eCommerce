import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function UpdateRate({ item, fetchData }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: item.name,
    product: item.product ? item.product.id : '',  // Ensure it’s an integer or an empty string
    message: item.message,
    rate_number: item.rate_number,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    const selectedProductId = parseInt(e.target.value, 10);
    setFormData({ ...formData, product: selectedProductId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('product', formData.product);  // This should now be an integer
    data.append('message', formData.message);
    data.append('rate_number', formData.rate_number);
    
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/products/rate/${item.id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalUpdate(false);
      fetchData();
    } catch (error) {
      console.error('Error updating Rate:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه التقييم؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/products/rate/${item.id}/`);
        fetchData();
      } catch (error) {
        console.error('Error deleting Rate:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/products/product_list_dash/`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("There was an error fetching the product data!", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div style={{ float: 'left', width: '35px', marginRight: '17px' }} onClick={() => setShowModalUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '35px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>تحديث البيانات</div>
          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>الاسم</label>
              <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" />
            </div>
            <div className="form-container-half" style={{ marginTop: '10px' }}>
              <label htmlFor="product-select" style={{ paddingTop: '15px', textAlign: 'center', float: 'right', marginBottom: '5px' }}>اختر المنتج</label>
              <select id="product-select" name="product" value={formData.product || ''} onChange={handleProductChange}>
                <option value="">المنتجات</option>
                {products.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>

          <label className='label_dash' htmlFor="message" style={{ paddingTop: '15px' }}>التعليق</label>
          <textarea className='text_dash' name="message" value={formData.message} onChange={handleChange} placeholder="التعليق" />

          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="rate_number" style={{ paddingTop: '15px' }}>عدد النجوم (1 : 5)</label>
              <input type="number" min="1" max="5" className='text_dash' name="rate_number" value={formData.rate_number} onChange={handleChange} />
            </div>
          </div>
          <br /><br />
          <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
            <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}