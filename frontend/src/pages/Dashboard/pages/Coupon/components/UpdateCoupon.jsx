
import React, { useState } from 'react';
import Config from '../../../../../components/config';
 
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';

export default function UpdateCoupon({  item, fetchCoupon }) {
 
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [formData, setFormData] = useState({
      code: item.code,
      discount: item.discount,
      coupon_usage: item.coupon_usage,
      expiryDate: item.expiryDate,
 
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/products/coupon/${item.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalUpdate(false);
      fetchCoupon();
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه كود الخصم ؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/products/coupon/${item.id}/`);
        fetchCoupon();
      } catch (error) {
        console.error('Error deleting coupon:', error);
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
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>تحديث البيانات</div>

          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="code" style={{ paddingTop: '15px' }}> كود الخصم</label>
              <input type="text" className='text_dash' name="code" value={formData.code} onChange={handleChange} placeholder="كود الخصم" />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="expiryDate" style={{ paddingTop: '15px' }}>تاريخ انتهاء الكود</label>
              <input type="date" className='text_dash' name="expiryDate" value={formData.expiryDate}  onChange={handleChange} />
            </div>
          </div>

          <div className="FOrm-container_dash">

          <div className="form-container-half">
              <label className='label_dash' htmlFor="discount" style={{ paddingTop: '15px' }}>الخصم</label>
              <input type="number" className='text_dash' name="discount" value={formData.discount}  onChange={handleChange} />
            </div>
            
            <div className="form-container-half">
              <label className='label_dash' htmlFor="coupon_usage" style={{ paddingTop: '15px' }}>عدد مرات الاستخدام </label>
              <input type="text" className='text_dash' name="coupon_usage" value={formData.coupon_usage} onChange={handleChange}  />
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

