import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function UpdateQuestionsGeneral({ item, fetchData }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    question: item.question,
    answer: item.answer,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/home/questions/${item.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalUpdate(false);
      fetchData();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه السؤال؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/home/questions/${item.id}/`);
        fetchData();
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '36px', marginRight: '17px' }} onClick={() => setShowModalUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '36px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      {showModalUpdate && (
        <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`} style={{ color: '#000' }}>
          <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='form_title'>تحديث البيانات</div>
            <label className='label_dash' htmlFor="question" style={{ paddingTop: '15px' }}>السؤال</label>
            <textarea
              className='text_dash'
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="السؤال"
            />
            <label className='label_dash' htmlFor="answer" style={{ paddingTop: '15px' }}>الاجابه</label>
            <textarea
              className='text_dash'
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="الاجابه"
            />
            <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
              <div style={{ width: '78%' }}>
                <button className="button-form" type="submit">حفظ</button>
              </div>
              <div style={{ width: '20%' }}>
                <button className="cancel-button" onClick={handleCloseModal} type="button">الغاء</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
