import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateExpense({ item, fetchExpense }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    description:item.description|| '',
    amount:item.amount|| 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/accounting/expenses/${item.id}/`, formData);
      setShowModalUpdate(false);
      fetchExpense();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه المصروف؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/accounting/expenses/${item.id}/`);
        fetchExpense();
      } catch (error) {
        console.error("Error deleting expense:", error);
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
          <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='form_title'>تحديث البيانات</div>

            <div className="FOrm-container_dash">
              <div className="form-container-half" style={{ width: '70%' }}>
                <label className='label_dash' htmlFor="description">توضيح</label>
                <input
                  type="text"
                  className='text_dash'
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="description"
                />
              </div>

              <div className="form-container-half" style={{ width: '30%' }}>
                <label className='label_dash' htmlFor="amount">المبلغ</label>
                <input
                  type="number"
                  className='text_dash'
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br /><br />

            <div className="FOrm-container_dash">
              <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
              <div style={{ width: '20%' }}><button className="cancel-button" type="button" onClick={handleCloseModal}>الغاء</button></div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
