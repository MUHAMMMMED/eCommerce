import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreateSlide({ fetchData }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    top_slider_web: null,
    top_slider_mobile: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
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

    try {
      await AxiosInstance.post(`${Config.baseURL}/api/home/slide/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalCreate(false);
      setFormData({
        top_slider_web: null,
        top_slider_mobile: null
      });
      fetchData();
    } catch (error) {
      console.error('There was an error creating the slide!', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>

      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data" style={{ color: '#000' }}>
          <div className='form_title'>انشاء جديد</div>

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
