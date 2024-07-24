import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function CreateRate({ fetchData }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    product: '',
    message: '',
    rate_number: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setFormData({ ...formData, product: selectedProduct });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/products/rate/`, formData);
      setShowModalCreate(false);
      fetchData();
      setFormData({
        name: '',
        product: '',
        message: '',
        rate_number: 0,
      });
    } catch (error) {
      console.error("Error creating Rate:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
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
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>
      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>انشاء جديد</div>
          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>الاسم</label>
              <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" />
            </div>
            <div className="form-container-half" style={{ marginTop: '10px' }}>
              <label htmlFor="product-select" style={{ paddingTop: '15px', textAlign: 'center', float: 'right', marginBottom: '5px' }}>اختر المنتج</label>
              <select id="product-select" name="product" value={formData.product} onChange={handleProductChange}>
                <option value="">المنتجات</option>
                {products.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
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
