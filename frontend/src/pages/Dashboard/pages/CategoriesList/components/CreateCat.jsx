import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreateCat({ fetchCategories }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    is_active: true,
    name: '',
    home_image: null,
    top_slider_web: null,
    top_slider_mobile: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
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
      await AxiosInstance.post(`${Config.baseURL}/api/products/categories/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalCreate(false);
      setFormData({
        is_active: true,
        name: '',
        home_image: null,
        top_slider_web: null,
        top_slider_mobile: null
      });
      fetchCategories();
    } catch (error) {
      console.error('There was an error creating the category!', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button> 

      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data" style={{color:'#000'}}>
          <div className='form_title'>انشاء جديد</div>

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

          <br/><br/>
          <div className="FOrm-container_dash">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
