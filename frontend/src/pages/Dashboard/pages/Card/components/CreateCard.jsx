import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreateCard({ fetchData }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('link', formData.link);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      await AxiosInstance.post(`${Config.baseURL}/api/home/card/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalCreate(false);
      setFormData({
        title: '',
        link: '',
        image: null
      });
      fetchData();
    } catch (error) {
      console.error('There was an error creating the Card!', error);
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
              <label className='label_dash' htmlFor="title">الاسم</label>
              <input type="text" className='text_dash' name="title" value={formData.title} onChange={handleChange} placeholder="الاسم" />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="image">صوره</label>
              <input type="file" className='file_dash' name="image" onChange={handleChange} />
            </div>
          </div>


          <label className='label_dash' htmlFor="link">الرابط</label>
          <input type="text" className='text_dash' name="link" value={formData.link} onChange={handleChange} placeholder="الرابط" />


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
