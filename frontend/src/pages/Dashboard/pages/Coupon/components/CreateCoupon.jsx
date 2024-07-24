import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';


export default function CreateCoupon({ fetchCoupon }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount:0,
    coupon_usage: 0,
    expiryDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/products/coupon/`, formData);
      setShowModalCreate(false);
      fetchCoupon();
      setFormData({
        code: '',
        discount:0,
        coupon_usage: 0,
        expiryDate: '',
      });
    } catch (error) {
      console.error("Error creating Coupon:", error);
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
