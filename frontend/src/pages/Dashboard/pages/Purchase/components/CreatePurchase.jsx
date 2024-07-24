import React, { useState } from 'react';
import AxiosInstance from '../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../components/config';

export default function CreatePurchase({ fetchPurchase }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: 0,
    cost: 0,
    amount: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/accounting/purchases/`, formData);
      setShowModalCreate(false);
      fetchPurchase();
      setFormData({
        product_name: '',
        quantity: 0,
        cost: 0,
        amount: 0,
      });
    } catch (error) {
      console.error("Error creating purchase:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>

      {showModalCreate && (
        <div className="modal_dash show_dash">
          <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='form_title'>انشاء جديد</div>

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
      )}
    </>
  );
}
