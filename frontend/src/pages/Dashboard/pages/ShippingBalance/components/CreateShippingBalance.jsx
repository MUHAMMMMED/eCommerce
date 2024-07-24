
import React, { useCallback, useEffect, useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreateShippingBalance({ fetchBalance }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [formData, setFormData] = useState({
    shipping: '',
    initial_balance: 0,
    final_balance: 0,
    added_amount: 0,
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/orders/shipping_balance/`, formData);
      setShowModalCreate(false);
      fetchBalance();
      setFormData({
        shipping: '',
        initial_balance: 0,
        final_balance: 0,
        added_amount: 0,
        date: '',
      });
    } catch (error) {
      console.error("Error submitting the form!", error);
      // Optionally, add user feedback here
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  const fetchCompany = useCallback(async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping_company_list/`);
      setCompanyData(response.data.company);
    } catch (error) {
      console.error("There was an error fetching the company data!", error);
      // Optionally, add user feedback here
    }
  }, []);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const handleCompanyChange = (e) => {
    setFormData({
      ...formData,
      shipping: e.target.value,
    });
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>

      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit}>
          <div className='form_title'>انشاء جديد</div>

          <div className="FOrm-container_dash">
            <div className="form-container-half" style={{ width: '70%' }}>
              <label htmlFor="category-select" style={{ paddingBottom: '15px', float: 'right' }}>شركات الشحن</label>
              <select id="category-select" style={{ border: '1px solid #9081f6' }} onChange={handleCompanyChange} value={formData.shipping}>
                <option value="">اختر شركات الشحن</option>
                {companyData.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="form-container-half" style={{ width: '30%' }}>
              <label className='label_dash' htmlFor="date">التاريخ</label>
              <input type="date" className='text_dash' name="date" value={formData.date} onChange={handleChange} />
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
              <label className='label_dash' htmlFor="final_balance">رصيد اخر المده</label>
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
