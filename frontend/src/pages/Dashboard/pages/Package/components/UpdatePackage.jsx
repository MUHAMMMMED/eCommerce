import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdatePackage({ item, fetchPackage }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    stock_alarm: item.stock_alarm,
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

      await AxiosInstance.put(`${Config.baseURL}/api/accounting/packages/${item.id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalUpdate(false);
      fetchPackage();
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه التغليف؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/accounting/packages/${item.id}/`);
        fetchPackage();
      } catch (error) {
        console.error('Error deleting package:', error);
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
