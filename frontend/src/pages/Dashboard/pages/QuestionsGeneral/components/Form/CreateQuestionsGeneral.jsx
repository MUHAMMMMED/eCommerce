import React, { useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';


export default function CreateQuestionsGeneral({ fetchData }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/home/questions/`, formData);
      setShowModalCreate(false);
      fetchData();
      setFormData({
        question: '',
        answer: '',
      });
    } catch (error) {
      console.error("Error creating questions:", error);
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


          <label className='label_dash' htmlFor="question" style={{ paddingTop: '15px' }}>  السؤال  </label>
          <textarea type="text" className='text_dash' name="question" value={formData.question} onChange={handleChange} placeholder=" السؤال  " />


          <label className='label_dash' htmlFor="answer" style={{ paddingTop: '15px' }}>  الاجابه  </label>
          <textarea type="text" className='text_dash' name="answer" value={formData.answer} onChange={handleChange} placeholder="   الاجابه  " />


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
