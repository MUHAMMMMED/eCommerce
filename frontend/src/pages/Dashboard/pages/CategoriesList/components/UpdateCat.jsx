import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateCat({ item, fetchcategories }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    is_active: item.is_active,
    name: item.name || '',
    home_image: null,
    top_slider_web: null,
    top_slider_mobile: null
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('is_active', formData.is_active);
    form.append('name', formData.name);

    if (formData.home_image) {
      form.append('home_image', formData.home_image);
    }
    if (formData.top_slider_web) {
      form.append('top_slider_web', formData.top_slider_web);
    }
    if (formData.top_slider_mobile) {
      form.append('top_slider_mobile', formData.top_slider_mobile);
    }

    try {
      await AxiosInstance.put(`${Config.baseURL}/api/products/categories/${item.id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalUpdate(false);
      fetchcategories();
    } catch (error) {
      console.error('There was an error updating the category!', error);
    }
  };

  const handleDelete = async () => {
    // Display confirmation dialog before deleting
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الفئة؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/products/categories/${item.id}/`);
        fetchcategories();
      } catch (error) {
        console.error('There was an error deleting the category!', error);
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
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data" style={{ color: '#000' }}>
          <div className='form_title'>تحديث البيانات</div>

          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="name">اسم الفئه</label>
              <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="home_image">صوره الصفحه الرئيسيه</label>
              <input type="file" className='file_dash' name="home_image" onChange={handleChange} />
            </div>
          </div>

          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="top_slider_web">صوره الويب غلاف الفئه</label>
              <input type="file" className='file_dash' name="top_slider_web" onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="top_slider_mobile">صوره الموبيل غلاف الفئه</label>
              <input type="file" className='file_dash' name="top_slider_mobile" onChange={handleChange} />
            </div>
          </div>

          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="is_active">نشط</label>
              <label className="switch">
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <br /><br />
          <div className="FOrm-container_dash">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
