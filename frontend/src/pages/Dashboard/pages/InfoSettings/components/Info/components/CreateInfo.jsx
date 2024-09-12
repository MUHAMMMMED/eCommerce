
import React, { useState } from 'react';
import AxiosInstance from '../../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../../components/config';

export default function CreateInfo({ fetchBalance }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    FaviconIco: null,
    logo: null,
    title: '',
    Whatsapp: '',
    snapchat: '',
    instagram: '',
    facebook: '',
    Twitter: '',
    pixel_id: '',
    offer_message: '',
    StripeFee: '',
    TikTok: '',
    email: '',


  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();


    if (formData.FaviconIco) {
      form.append('FaviconIco', formData.FaviconIco);
    }
    if (formData.logo) {
      form.append('logo', formData.logo);
    }


    try {
      await AxiosInstance.post(`${Config.baseURL}/api/home/info/`, formData);
      setShowModalCreate(false);
      fetchBalance();
      setFormData({
        FaviconIco: null,
        logo: null,
        title: '',
        Whatsapp: '',
        snapchat: '',
        instagram: '',
        facebook: '',
        Twitter: '',
        pixel_id: '',
        offer_message: '',
        StripeFee: '',
        TikTok: '',
        email: '',
      });
    } catch (error) {
      console.error("Error submitting the form!", error);
      // Optionally, add user feedback here
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };



  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className='card_but_button'>انشاء</button>
      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit}>
          <div className='form_title'>انشاء جديد</div>

          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="title">اسم الموقع</label>
              <input type="text" className='text_dash' name="title" value={formData.amount} onChange={handleChange} />
            </div>

            <div className="form-container-half"  >
              <label className='label_dash' htmlFor="FaviconIco">الصوره المصغره</label>
              <input type="file" className='text_dash' name="FaviconIco" value={formData.FaviconIco} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="logo"> اللوجو</label>
              <input type="file" className='text_dash' name="logo" value={formData.logo} onChange={handleChange} />
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
              <label className='label_dash' htmlFor="facebook"> فيس بوك</label>
              <input type="text" className='text_dash' name="facebook" value={formData.facebook} onChange={handleChange} />
            </div>
            <div className="form-container-half">
              <label className='label_dash' htmlFor="instagram"> انستجرام</label>
              <input type="text" className='text_dash' name="instagram" value={formData.instagram} onChange={handleChange} />
            </div>


          </div>
          <div className="FOrm-container_dash">

            <div className="form-container-half"  >
              <label className='label_dash' htmlFor="snapchat">   اسناب شات</label>
              <input type="text" className='text_dash' name="snapchat" value={formData.snapchat} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="Twitter"> تويتر</label>
              <input type="text" className='text_dash' name="Twitter" value={formData.Twitter} onChange={handleChange} />
            </div>

          </div>
          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="Whatsapp">   واتساب</label>
              <input type="number" className='text_dash' name="Whatsapp" value={formData.Whatsapp} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="StripeFee">  عمولة سترايب</label>
              <input type="number" className='text_dash' name="StripeFee" value={formData.StripeFee} onChange={handleChange} />
            </div>

          </div>

          <div style={{ marginBottom: '10px' }}  >
            <label className='label_dash' htmlFor="pixel_id">  بكسل جوجل</label>
            <input type="text" className='text_dash' name="pixel_id" value={formData.pixel_id} onChange={handleChange} />
          </div>
          <div style={{ paddingBottom: '10px' }}  >
            <label className='label_dash' htmlFor="offer_message"> الرساله التروجيه</label>
            <textarea type="text" className='text_dash' name="offer_message" value={formData.offer_message} onChange={handleChange} />
          </div>

          <br /> <br />
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
    </>
  );
}
