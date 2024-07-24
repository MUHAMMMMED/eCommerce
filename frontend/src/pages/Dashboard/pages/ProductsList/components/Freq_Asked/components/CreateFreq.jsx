
import React, { useState } from 'react';
import AxiosInstance from '../../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../../components/config';

export default function CreateFreq({ ProductId, fetchProduct }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    product: ProductId,
    question: '', 
    answer: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/products/faqs/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalCreate(false);
      setFormData({
        product: ProductId,
        question: '', 
        answer: '' 
      });
      fetchProduct();
    } catch (error) {
      console.error('There was an error creating the question!', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} style={{background:' #9081f6',color:'#fff',padding:'2px 6px'}}>اضافه</button> 

      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate"  encType="multipart/form-data">
          <div className='form_title'>اضافه جديد</div>
          <input type="text" className='text_dash' name="question" value={formData.question} onChange={handleChange} placeholder="السؤال" />
          <textarea className='text_dash' name="answer" value={formData.answer} onChange={handleChange} placeholder="الاجابه" />
          <br/><br/>
          <div className="FOrm-container_dash">
            <div style={{ width: '78%' }}><button className="button-form" onClick={handleSubmit}>حفظ</button></div>
            <div style={{ width: '20%' }}><button type="button" className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
