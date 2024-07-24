import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreatePackage({ fetchPackage }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    description: '',
    quantity: '',
    stock_alarm: '',
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
      data.append('quantity', formData.quantity);
      data.append('stock_alarm', formData.stock_alarm);

      await AxiosInstance.post(`${Config.baseURL}/api/accounting/packages/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalCreate(false);
      setFormData({
        image: null,
        name: '',
        description: '',
        quantity: '',
        stock_alarm: '',
      });
      fetchPackage();
    } catch (error) {
      console.error('Error creating package:', error);
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
              <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>اسم التغليف</label>
              <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" />
            </div>
            <div className="form-container-half">
              <label className='label_dash' htmlFor="image" style={{ paddingTop: '15px' }}>صوره التغليف</label>
              <input type="file" className='text_dash' name="image" onChange={handleChange} />
            </div>
          </div>
          <label className='label_dash' htmlFor="description" style={{ paddingTop: '15px' }}>تفاصيل التغليف</label>
          <textarea className='text_dash' name="description" value={formData.description} onChange={handleChange} placeholder="التفاصيل التغليف" />
          <div className="form-container-half" style={{ float: 'right' }}>
            <label className='label_dash' htmlFor="quantity" style={{ paddingTop: '15px' }}>الكميه المتاحه</label>
            <input type="number" className='text_dash' name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
          <div className="form-container-half" style={{ float: 'right' }}>
            <label className='label_dash' htmlFor="stock_alarm" style={{ paddingTop: '15px' }}>حد التنبيه عند نفاذ الكميه</label>
            <input type="number" className='text_dash' name="stock_alarm" value={formData.stock_alarm} onChange={handleChange} />
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
