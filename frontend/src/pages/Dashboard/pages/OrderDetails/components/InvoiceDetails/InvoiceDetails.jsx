
import React from 'react';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import './Invoice.css';

export default function InvoiceDetails({ order }) {
  // // Extract total, tax rate, and shipping from cart_data, ensuring they are numbers
  const total = Number(order?.total) || 0;
  const taxAmount = Number(order?.tax_amount) || 0;
  const shipping = Number(order?.shipping) || 0;
  const total_tax_shipping = taxAmount + shipping
  const order_total = (total - total_tax_shipping);

  // Calculate the final total including tax and shipping
  const finalTotal = total;


  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };


  return (
    <>
      <div className='Invoic'>
        <>
          <div className="Invoic-Summary">
            <div className="Invoic-title">تفاصيل الفاتورة</div>
            <div className="Invoic-item ">
              <div className="invoic-text-right" style={{ display: 'block' }}>  <span className="invoicTitle" style={{ display: 'block' }}> رقم الفاتوره</span> </div>
              <div className="invoic-text-left" style={{ display: 'block' }}> <span className="Invoic-amount" style={{ display: 'block' }}>{order?.invoice_number}</span></div> </div>


            <div className="Invoic-item ">
              <div className="invoic-text-right">  <span className="invoicTitle" style={{ display: 'block' }}>حالة الدفع</span> </div>
              <div className="invoic-text-left">
                <span className="Invoic-amount" style={{ color: '#9081f6', float: 'left', display: 'block' }}>{order.paid ? 'دفع' : 'لم يدفع'}</span>
                <span style={{ float: 'right', marginLeft: '5px', paddingTop: '2px', color: '#9081f6', float: 'left' }}>
                  {order.paid ? <FaRegMoneyBillAlt /> : <MdCancelPresentation />}
                </span> </div></div>
            <div className="Invoic-item ">
              <div className="invoic-text-right" style={{ display: 'block' }}>  <span className="invoicTitle" style={{ display: 'block' }}>تاريخ الإنشاء</span> </div>
              <div className="invoic-text-left" style={{ display: 'block' }}> <span className="Invoic-amount" style={{ display: 'block' }}>{formatDate(order?.created_at)}</span></div> </div>
            <div className="Invoic-item " style={{ display: 'block' }}>
              <div className="invoic-text-right" style={{ display: 'block' }}> <span className="invoicTitle" style={{ display: 'block' }}>عدد المنتجات</span></div>
              <div className="invoic-text-left" style={{ display: 'block' }}> <span className="Invoic-amount" style={{ display: 'block' }}>({order?.cart_items_count || 0})</span>  </div> </div>
            <div className="Invoic-item" style={{ display: 'block' }}>
              <div className="invoic-text-right" style={{ display: 'block' }}>  <span className="invoicTitle" style={{ display: 'block' }}>الكمية</span> </div>
              <div className="invoic-text-left" style={{ display: 'block' }}>  <span className="Invoic-amount" style={{ display: 'block' }}>({order?.cart_quantity || 0})</span> </div>
            </div>
            <div className="Invoic-item" style={{ display: 'block' }}>
              <div className="invoic-text-right" style={{ display: 'block' }}> <span className="invoicTitle" style={{ display: 'block' }}>المجموع الفرعي</span> </div>
              <div className="invoic-text-left" style={{ display: 'block' }}>
                <span className="Invoic-amount" style={{ display: 'block' }}>{order_total.toFixed(2) || 0} <span className='money_code' style={{ display: 'block' }}> SAR</span></span> </div>
            </div>
            <div className="Invoic-item">
              <div className="invoic-text-right" style={{ display: 'block' }}>
                <span className="invoicTitle" style={{ display: 'block' }}> ({order?.tax.toFixed(0)} %) الضريبه</span>  </div>
              <div className="invoic-text-left" style={{ display: 'block' }}>
                <span className="Invoic-amount" style={{ display: 'block' }}>{taxAmount.toFixed(2) || 0} <span className='money_code'> SAR</span></span>
              </div></div>
            <div className="Invoic-item" style={{ display: 'block' }}>
              <div className="invoic-text-right" style={{ display: 'block' }}><span className="invoicTitle" style={{ display: 'block' }}>رسوم التوصيل</span> </div>
              <div className="invoic-text-left" style={{ display: 'block' }}>
                <span className="Invoic-amount" style={{ display: 'block' }}>{shipping.toFixed(2) || 0} <span className='money_code'> SAR</span></span>
              </div></div>
            <div className="Invoic-item" style={{ display: 'block' }}><div className="invoic-text-right"> <span className="invoicTitle" style={{ display: 'block' }}>المجموع</span>  </div>
              <div className="invoic-text-left" style={{ display: 'block' }}>
                <span className="Invoic-total-amount" style={{ display: 'block' }}>{finalTotal.toFixed(2) || 0} <span className='money_code'> SAR</span></span></div>
            </div> </div>

        </>
      </div>
    </>
  );
}
