
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import AxiosInstance from '../../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../../components/config';

export default function UpdateFreq({ item, ProductId, fetchProduct }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    product: ProductId,
    question: item.question || '',
    answer: item.answer || '',
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
      await AxiosInstance.put(`${Config.baseURL}/api/products/faqs/${item.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModalUpdate(false);
      fetchProduct();
    } catch (error) {
      console.error('There was an error updating the FAQs!', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه السؤال؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/products/faqs/${item.id}/`);
        fetchProduct();
      } catch (error) {
        console.error('There was an error deleting the FAQ!', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'right', width: '20px' }} onClick={() => setShowModalUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'right', width: '20px', marginRight: '20px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" encType="multipart/form-data">
          <div className='form_title'>تعديل البيانات</div>

          <input type="text" className='text_dash' name="question" value={formData.question} onChange={handleChange} placeholder="السؤال" />
          <textarea className='text_dash' name="answer" value={formData.answer} onChange={handleChange} placeholder="الاجابه" />
          <br /><br />
          <div className="FOrm-container_dash">
            <div style={{ width: '78%' }}><button className="button-form" onClick={handleSubmit} >حفظ</button></div>
            <div style={{ width: '20%' }}><button type="button" className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
