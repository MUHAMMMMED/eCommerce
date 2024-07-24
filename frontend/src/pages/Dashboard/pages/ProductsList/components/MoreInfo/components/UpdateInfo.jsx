
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import AxiosInstance from '../../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../../components/config';

export default function UpdateInfo({ item, fetchProduct }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    product: item.product,
    name: item.name || '',
    description: item.description || '',
    home_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('product', formData.product);
    form.append('name', formData.name);
    if (formData.description) {
      form.append('description', formData.description);
    }
    if (formData.image) {
      form.append('image', formData.image);
    }
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/products/more_info/${item.id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalUpdate(false);
      fetchProduct();
    } catch (error) {
      console.error('There was an error updating the Info!', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه المعلومات؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/products/more_info/${item.id}/`);
        fetchProduct();
      } catch (error) {
        console.error('There was an error deleting the Info!', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
    setFormData({
      product: item.product,
      name: item.name || '',
      description: item.description || '',
      home_image: null,
    });
  };

  return (
    <>
      <div style={{ float: 'right', width: '20px' }} onClick={() => setShowModalUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'right', width: '20px', marginRight: '20px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`}>
        <div className="modal-content_dash animate" encType="multipart/form-data">
          <div className='form_title'>تعديل البيانات</div>

          <input type="text" className='text_dash' style={{ width: '100%' }} name="name" value={formData.name} onChange={handleChange} placeholder="العنوان" />
          <input type="text" className='text_dash' style={{ width: '100%' }} name="description" value={formData.description} onChange={handleChange} placeholder="التفاصيل" />

          <div className="form-container-half">
            <input type="file" className='file_dash' name="image" onChange={handleChange} />
          </div>

          <br /><br />
          <div className="FOrm-container_dash">
            <div style={{ width: '78%' }}>
              <button className="button-form" onClick={handleSubmitInfo}>حفظ</button>
            </div>
            <div style={{ width: '20%' }}>
              <button className="cancel-button" onClick={handleCloseModal}>الغاء</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
