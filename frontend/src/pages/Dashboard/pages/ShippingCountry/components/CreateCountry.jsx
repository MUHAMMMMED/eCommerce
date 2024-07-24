import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';


export default function CreateCountry({ fetchCountry }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tax:0,
 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/orders/shipping_country/`, formData);
      setShowModalCreate(false);
      fetchCountry();
      setFormData({
        name: '',
        tax:0,
 
      });
    } catch (error) {
      console.error("Error creating Country:", error);
    }
  };

 

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>
      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>انشاء جديد</div>

          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>  اسم الدوله  </label>
              <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="  اسم الدوله " />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="tax" style={{ paddingTop: '15px' }}>الضريبه</label>
              <input type="number" className='text_dash' name="tax" value={formData.tax}  onChange={handleChange} />
            </div>
          </div>

       
       
         
          <br /><br />
          <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
            <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
