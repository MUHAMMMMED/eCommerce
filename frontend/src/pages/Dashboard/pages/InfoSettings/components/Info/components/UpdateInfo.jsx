

import React, { useState } from 'react';
import AxiosInstance from '../../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../../components/config';

export default function UpdateInfo({ item }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [formData, setFormData] = useState({
    FaviconIco: null,
    logo: null,
    title: item.title,
    Whatsapp: item.Whatsapp,
    snapchat: item.snapchat,
    instagram: item.instagram,
    Twitter: item.Twitter,
    pixel_id: item.pixel_id,
    offer_message: item.offer_message,
    StripeFee: item.StripeFee,
    facebook: item.facebook,
    TikTok: item.TikTok,
    email: item.email,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
    });

    try {
      await AxiosInstance.put(`${Config.baseURL}/api/home/info/${item.id}/`, data);
      setShowModalUpdate(false);
    } catch (error) {
      console.error('Error updating info:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalUpdate(true)} className='card_but_button'>تعديل</button>

      {showModalUpdate && (
        <div className="modal_dash show_dash">
          <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='form_title'>تحديث البيانات</div>
            <div className="FOrm-container_dash">
              <div className="form-container-half">
                <label className='label_dash' htmlFor="title">اسم الموقع</label>
                <input
                  type="text"
                  className='text_dash'
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-container-half">
                <label className='label_dash' htmlFor="FaviconIco">الصوره المصغره</label>
                <input
                  type="file"
                  className='text_dash'
                  name="FaviconIco"
                  onChange={handleChange}
                />
              </div>

              <div className="form-container-half">
                <label className='label_dash' htmlFor="logo">اللوجو</label>
                <input
                  type="file"
                  className='text_dash'
                  name="logo"
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="FOrm-container_dash">

              <div className="form-container-half">
                <label className='label_dash' htmlFor="email">   البريد الإلكتروني   </label>
                <input type="text" className='text_dash' name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-container-half">
                <label className='label_dash' htmlFor="TikTok"> تيك توك</label>
                <input type="text" className='text_dash' name="TikTok" value={formData.TikTok} onChange={handleChange} />
              </div>

            </div>



            <div className="FOrm-container_dash">
              <div className="form-container-half">
                <label className='label_dash' htmlFor="facebook">فيس بوك</label>
                <input
                  type="text"
                  className='text_dash'
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                />
              </div>
              <div className="form-container-half">
                <label className='label_dash' htmlFor="instagram">انستجرام</label>
                <input
                  type="text"
                  className='text_dash'
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="FOrm-container_dash">
              <div className="form-container-half">
                <label className='label_dash' htmlFor="snapchat">اسناب شات</label>
                <input
                  type="text"
                  className='text_dash'
                  name="snapchat"
                  value={formData.snapchat}
                  onChange={handleChange}
                />
              </div>

              <div className="form-container-half">
                <label className='label_dash' htmlFor="Twitter">تويتر</label>
                <input
                  type="text"
                  className='text_dash'
                  name="Twitter"
                  value={formData.Twitter}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="FOrm-container_dash">
              <div className="form-container-half">
                <label className='label_dash' htmlFor="Whatsapp">واتساب</label>
                <input
                  type="number"
                  className='text_dash'
                  name="Whatsapp"
                  value={formData.Whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-container-half">
                <label className='label_dash' htmlFor="StripeFee">عمولة سترايب</label>
                <input
                  type="number"
                  className='text_dash'
                  name="StripeFee"
                  value={formData.StripeFee}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label className='label_dash' htmlFor="pixel_id">بكسل جوجل</label>
              <input
                type="text"
                className='text_dash'
                name="pixel_id"
                value={formData.pixel_id}
                onChange={handleChange}
              />
            </div>

            <div style={{ paddingBottom: '10px' }}>
              <label className='label_dash' htmlFor="offer_message">الرسالة الترويجية</label>
              <textarea
                className='text_dash'
                name="offer_message"
                value={formData.offer_message}
                onChange={handleChange}
              />
            </div>

            <div className="FOrm-container_dash">
              <div style={{ width: '78%' }}>
                <button className="button-form" type="submit">حفظ</button>
              </div>
              <div style={{ width: '20%' }}>
                <button type="button" className="cancel-button" onClick={handleCloseModal}>الغاء</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
