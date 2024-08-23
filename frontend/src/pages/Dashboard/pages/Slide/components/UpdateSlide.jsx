import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateSlide({ item, fetchData }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    top_slider_web: null,
    top_slider_mobile: null,
    is_active: item.is_active,
  });

  const handleChange = (e) => {
    const { name, type, checked, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    if (formData.top_slider_web) {
      form.append('top_slider_web', formData.top_slider_web);
    }
    if (formData.top_slider_mobile) {
      form.append('top_slider_mobile', formData.top_slider_mobile);
    }
    form.append('is_active', formData.is_active);

    try {
      await AxiosInstance.put(`${Config.baseURL}/api/home/slide/${item.id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalUpdate(false);
      fetchData();
    } catch (error) {
      console.error('There was an error updating the slide!', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الصور؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/home/slide/${item.id}/`);
        fetchData();
      } catch (error) {
        console.error('There was an error deleting the slide!', error);
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
              <label className='label_dash' htmlFor="top_slider_web">صوره الويب</label>
              <input type="file" className='file_dash' name="top_slider_web" onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="top_slider_mobile">صوره الموبيل</label>
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
            <div style={{ width: '78%' }}>
              <button className="button-form" type="submit">حفظ</button>
            </div>
            <div style={{ width: '20%' }}>
              <button className="cancel-button" type="button" onClick={handleCloseModal}>الغاء</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}