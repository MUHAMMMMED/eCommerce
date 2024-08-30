
import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreateExpense({ fetchExpense }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/accounting/expenses/`, formData);
      setShowModalCreate(false);
      fetchExpense();
      setFormData({
        description: '',
        amount: 0
      });
    } catch (error) {

    }
  };


  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>


      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>


      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data" >
          <div className='form_title'>    انشاء جديد</div>

          <div className="FOrm-container_dash">

            <div className="form-container-half" style={{ width: '70%' }} >
              <label className='label_dash' htmlFor="description" >توضيح</label>
              <input type="text" className='text_dash' name="description" value={formData.title} onChange={handleChange} placeholder="description" />
            </div>

            <div className="form-container-half" style={{ width: '30%' }} >
              <label className='label_dash' htmlFor="description">المبلغ</label>
              <input type="number" className='text_dash' name="amount" value={formData.title} onChange={handleChange} />
            </div>

          </div>
          <br /><br />
          {/* Form buttons */}
          <div className="FOrm-container_dash">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
