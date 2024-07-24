import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function UpdatePurchase({ item, fetchPurchase }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: 0,
    cost: 0,
    amount: 0,
  });

  useEffect(() => {
    if (showModalUpdate) {
      setFormData({
        product_name: item.product_name,
        quantity: item.quantity,
        cost: item.cost,
        amount: item.amount,
      });
    }
  }, [showModalUpdate, item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/accounting/purchases/${item.id}/`, formData);
      setShowModalUpdate(false);
      fetchPurchase();
    } catch (error) {
      console.error("Error updating purchase:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه العملية الشرائية؟')) {
      try {
        await axios.delete(`${Config.baseURL}/api/accounting/purchases/${item.id}/`);
        fetchPurchase();
      } catch (error) {
        console.error("Error deleting purchase:", error);
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

      <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>تحديث البيانات</div>

          <div className="FOrm-container_dash">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label_dash' htmlFor="product_name">اسم المنتج</label>
              <input
                type="text"
                className='text_dash'
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                placeholder="اسم المنتج"
              />
            </div>

            <div className="form-container-half" style={{ width: '30%' }}>
              <label className='label_dash' htmlFor="quantity">الكميه</label>
              <input
                type="number"
                className='text_dash'
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-container-half" style={{ width: '30%' }}>
              <label className='label_dash' htmlFor="cost">التكلفه للقطعه</label>
              <input
                type="number"
                className='text_dash'
                name="cost"
                value={formData.cost}
                onChange={handleChange}
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
    </>
  );
}
