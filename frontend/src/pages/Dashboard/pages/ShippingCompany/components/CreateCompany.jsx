import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreateCompany({ fetchCompany }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    description: '',
    shipping_price: 0,
    discount_price: 0,
    work_days: '',
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (formData.image) {
        data.append('image', formData.image);
      }
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('shipping_price', formData.shipping_price);
      data.append('discount_price', formData.discount_price);
      data.append('work_days', formData.work_days);

      await AxiosInstance.post(`${Config.baseURL}/api/orders/shipping_company/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalCreate(false);
      setFormData({
        image: null,
        name: '',
        description: '',
        shipping_price: 0,
        discount_price: 0,
        work_days: '',
      });
      fetchCompany();
    } catch (error) {
      console.error('Error creating  Company:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>
      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>انشاء جديد</div>
          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>اسم الشركه</label>
              <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" />
            </div>
            <div className="form-container-half">
              <label className='label_dash' htmlFor="image" style={{ paddingTop: '15px', textAlign: 'center' }}>لوجو الشركه</label>
              <input type="file" className='text_dash' name="image" onChange={handleChange} />
            </div>
          </div>
          <div className="FOrm-container_dash">
            <div className="form-container-half" style={{ float: 'right' }}>
              <label className='label_dash' htmlFor="work_days" style={{ paddingTop: '15px', textAlign: 'center' }}>ايام العمل</label>
              <input type="text" className='text_dash' name="work_days" value={formData.work_days} onChange={handleChange} placeholder="ايام العمل" />
            </div>
            <div className="form-container-half" style={{ float: 'right' }}>
              <label className='label_dash' htmlFor="shipping_price" style={{ paddingTop: '15px', textAlign: 'center' }}>سعر الشحن</label>
              <input type="number" className='text_dash' name="shipping_price" value={formData.shipping_price} onChange={handleChange} />
            </div>
            <div className="form-container-half" style={{ float: 'right' }}>
              <label className='label_dash' htmlFor="discount_price" style={{ paddingTop: '15px', textAlign: 'center' }}>سعر الخصم</label>
              <input type="number" className='text_dash' name="discount_price" value={formData.discount_price} onChange={handleChange} />
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
