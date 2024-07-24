import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreateGroup({ fetchData }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    link: '',
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
      await AxiosInstance.post(`${Config.baseURL}/api/home/group/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModalCreate(false);
      setFormData({
        title: '',
        price: '',
        link: '',
        big_image: null,
        image1: null,
        image2: null,
        image3: null,
      });
      fetchData();
    } catch (error) {
      console.error('There was an error creating the group!', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>

      {showModalCreate && (
        <div className="modal_dash show_dash">
          <form
            className="modal-content_dash animate"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{ color: '#000' }}
          >
            <div className='form_title'>انشاء جديد</div>

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
        

            <br/><br/>
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
