import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateCompany({ item, fetchCompany }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    name: item.name,
    description: item.description,
    shipping_price: item.shipping_price,
    discount_price: item.discount_price,
    work_days: item.work_days,
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
      
      await AxiosInstance.put(`${Config.baseURL}/api/orders/shipping_company/${item.id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalUpdate(false);
      fetchCompany();
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الشركه')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/orders/shipping_company/${item.id}/`);
        fetchCompany();
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data" style={{color:'#000'}}>
          <div className='form_title'>تحديث البيانات</div>
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
