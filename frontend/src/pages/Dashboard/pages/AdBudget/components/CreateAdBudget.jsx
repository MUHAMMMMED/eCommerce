
import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';



export default function CreateAdBudget({ fetchBalance }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    month: '',
    initial_balance: 0,
    added_amount: 0,
    final_balance: 0,

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/accounting/ad_budget/`, formData);
      setShowModalCreate(false);
      fetchBalance();
      setFormData({
        name: '',
        month: '',
        initial_balance: 0,
        added_amount: 0,
        final_balance: 0,
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
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>

      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit}>
          <div className='form_title'>انشاء جديد</div>

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
              <button className="cancel-button" onClick={handleCloseModal}>الغاء</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
