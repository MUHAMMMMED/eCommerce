import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdateShippingBalance({ item, fetchBalance }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [companyData, setCompanyData] = useState([]);

  const [formData, setFormData] = useState({
    shipping: item.shipping.id,
    initial_balance: item.initial_balance,
    added_amount:item.added_amount,
    final_balance: item.final_balance,
    date: item.date,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/orders/shipping_balance/${item.id}/`, formData);
      setShowModalUpdate(false);
      fetchBalance();
    } catch (error) {
      console.error("Error updating shipping balance:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الرصيد؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/orders/shipping_balance/${item.id}/`);
        fetchBalance();
      } catch (error) {
        console.error("Error deleting shipping balance:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
  };

  const fetchCompany = useCallback(async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping_company_list/`);
      setCompanyData(response.data.company);
    } catch (error) {
      console.error("Error fetching the company data!", error);
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
                <label htmlFor="category-select" style={{ paddingBottom: '15px', float: 'right' }}>شركات الشحن</label>
                <select id="category-select" style={{ border: '1px solid #9081f6',marginTop:'3px' }} onChange={handleCompanyChange} value={formData.shipping}>
                  <option value="">اختر شركات الشحن</option>
                  {companyData.map((company) => (
                    <option key={company.id} value={company.id}>{company.name}</option>
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
                <label className='label_dash' htmlFor="initial_balance">رصيد أول المده</label>
                <input type="number" className='text_dash' name="initial_balance" value={formData.initial_balance} onChange={handleChange} />
              </div>

              <div className="form-container-half">
              <label className='label_dash' htmlFor="added_amount">رصيد مضاف</label>
              <input type="number" className='text_dash' name="added_amount" value={formData.added_amount} onChange={handleChange} />
            </div>
       


              <div className="form-container-half">
                <label className='label_dash' htmlFor="final_balance">رصيد آخر المده</label>
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
