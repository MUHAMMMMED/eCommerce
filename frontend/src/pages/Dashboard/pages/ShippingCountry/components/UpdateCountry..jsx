
import React, { useState } from 'react';
import Config from '../../../../../components/config';

import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import AddCompany from './Company/AddCompany';
import Delete from './Company/Delete';

export default function UpdateCountry({ item, fetchCountry }) {

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    tax: item.tax,

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/orders/shipping_country/${item.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModalUpdate(false);
      fetchCountry();
    } catch (error) {
      console.error('Error updating Country:', error);
    }
  };



  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه  الدوله   ؟')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/orders/shipping_country/${item.id}/`);
        fetchCountry();
      } catch (error) {
        console.error('Error deleting Country:', error);
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

      <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`} style={{ color: '#000' }}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>تحديث البيانات</div>
          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>  اسم الدوله  </label>
              <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="  اسم الدوله " />
            </div>

            <div className="form-container-half">
              <label className='label_dash' htmlFor="tax" style={{ paddingTop: '15px' }}>الضريبه</label>
              <input type="number" className='text_dash' name="tax" value={formData.tax} onChange={handleChange} />
            </div>
          </div>



          <AddCompany itemId={item.id} fetchCountry={fetchCountry} />


          {item.Shipping.map(ship => (
            <div key={item.id} style={{ width: '100%', float: 'right' }}>
              <span style={{ float: 'right' }}>
                <Delete itemId={item.id} companyId={ship.id} fetchCountry={fetchCountry} />
              </span>
              <span style={{
                width: '90%',
                float: 'right',
                marginTop: '5px',
                paddingTop: '10px',
                marginRight: '8px',
                textAlign: 'right',
                fontWeight: '700'
              }}>
                {ship.name}
              </span>
            </div>
          ))}





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
