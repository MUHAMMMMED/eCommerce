

import React, { useState } from 'react';
import AxiosInstance from '../../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../../components/config';

export default function CreateInfo({ ProductId, fetchProduct }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    product: ProductId,
    name: '',
    description: '',
    image: null,
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
    form.append('description', formData.description);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      await AxiosInstance.post(`${Config.baseURL}/api/products/more_info/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalCreate(false);
      setFormData({
        product: ProductId,
        name: '',
        description: '',
        image: null,
      });
      fetchProduct();
    } catch (error) {
      console.error('There was an error creating the MoreInfo!', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} style={{ background: '#9081f6', color: '#fff', padding: '2px 6px' }}>
        إضافة
      </button>

      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <div className="modal-content_dash animate" encType="multipart/form-data">
          <div className='form_title'>اضافه جديد</div>
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
