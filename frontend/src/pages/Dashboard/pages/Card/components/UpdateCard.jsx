import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateCard({ item, fetchData }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title,
    link: item.link,
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
      await AxiosInstance.put(`${Config.baseURL}/api/home/card/${item.id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalUpdate(false);
      fetchData();
    } catch (error) {
      console.error('There was an error updating the card!', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الكرت ؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/home/card/${item.id}/`);
        fetchData();
      } catch (error) {
        console.error('There was an error deleting the card!', error);
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
