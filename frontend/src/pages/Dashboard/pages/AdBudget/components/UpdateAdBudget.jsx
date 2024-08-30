import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateAdBudget({ item, fetchBalance }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [formData, setFormData] = useState({
    name: item.name,
    month: item.month,
    initial_balance: item.initial_balance,
    added_amount: item.added_amount,
    final_balance: item.final_balance,

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/accounting/ad_budget/${item.id}/`, formData);
      setShowModalUpdate(false);
      fetchBalance();
    } catch (error) {
      console.error("Error updating shipping balance:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الرصيد؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/accounting/ad_budget/${item.id}/`);
        fetchBalance();
      } catch (error) {
        console.error("Error deleting shipping balance:", error);
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
          <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data" style={{ color: '#000' }}>
            <div className='form_title'>تحديث البيانات</div>


            <div className="FOrm-container_dash">
              <div className="form-container-half"  >
                <label className='label_dash' htmlFor="month">التاريخ</label>
                <input type="date" className='text_dash' name="month" value={formData.month} onChange={handleChange} />
              </div>
              <div className="form-container-half">
                <label className='label_dash' htmlFor="name"> الاسم</label>
                <input type="name" className='text_dash' name="name" value={formData.name} onChange={handleChange} />
              </div>


            </div>
            <div className="FOrm-container_dash">

              <div className="form-container-half">
                <label className='label_dash' htmlFor="initial_balance">رصيد اول المده</label>
                <input type="number" className='text_dash' name="initial_balance" value={formData.initial_balance} onChange={handleChange} />
              </div>

              <div className="form-container-half">
                <label className='label_dash' htmlFor="added_amount">رصيد مضاف</label>
                <input type="number" className='text_dash' name="added_amount" value={formData.added_amount} onChange={handleChange} />
              </div>

              <div className="form-container-half">
                <label className='label_dash' htmlFor="amount">رصيد اخر المده</label>
                <input type="number" className='text_dash' name="final_balance" value={formData.final_balance} onChange={handleChange} />
              </div>
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
