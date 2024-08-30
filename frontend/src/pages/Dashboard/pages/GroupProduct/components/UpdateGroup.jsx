import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateGroup({ item, fetchData }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title,
    price: item.price,
    link: item.link,
    big_image: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/home/group/${item.id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModalUpdate(false);
      fetchData();
    } catch (error) {
      console.error('There was an error updating the group!', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه المنتجات؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/home/group/${item.id}/`);
        fetchData();
      } catch (error) {
        console.error('There was an error deleting the group!', error);
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

      {showModalUpdate && (
        <div className="modal_dash show_dash">
          <form
            className="modal-content_dash animate"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{ color: '#000' }}
          >
            <div className='form_title'>تحديث البيانات</div>

            <div className="FOrm-container_dash">
              <div className="form-container-half">
                <label className='label_dash' htmlFor="title">العنوان</label>
                <input
                  type="text"
                  className='text_dash'
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="العنوان"
                />
              </div>

              <div className="form-container-half">
                <label className='label_dash' htmlFor="price">السعر</label>
                <input
                  type="text"
                  className='text_dash'
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="السعر"
                />
              </div>
            </div>

            <div className="FOrm-container_dash">
              {['big_image', 'image1', 'image2', 'image3'].map((name, index) => (
                <div key={name} className="form-container-half">
                  <label className='label_dash' htmlFor={name}>{`الصوره ${index === 0 ? 'الرئيسيه' : `(${index})`}`}</label>
                  <input
                    type="file"
                    className='file_dash'
                    name={name}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>


            <label className='label_dash' htmlFor="link">الرابط</label>
            <input
              type="text"
              className='text_dash'
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="الرابط"
            />


            <br /><br />
            <div className="FOrm-container_dash">
              <div style={{ width: '78%' }}>
                <button className="button-form" type="submit">حفظ</button>
              </div>
              <div style={{ width: '20%' }}>
                <button className="cancel-button" onClick={handleCloseModal}>الغاء</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
