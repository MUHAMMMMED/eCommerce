
import React from 'react';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { Link } from 'react-router-dom';
import SelectStatus from '../OrderFilter/components/SelectStatus/SelectStatus';
import './OrdersList.css';

export default function OrdersList({ order, fetchOrders }) {
  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <div className='orders_list'>
          <div className='orders_div_list'>
          <div className='orders_list_text' style={{width:'200px' }}>{formatDate(order?.created_at)}</div>
          <div className='orders_list_text' style={{width:'35%'}}>
          {order.new ?  <span style={{padding: '2px 10px',background: '#fff',border: '1px solid #9081f6',
          borderRadius: '3px',marginTop: '3px',marginLeft:"10px", fontSize:'13px'}}>جديد</span>:<></>}
          {order?.customer?.name} </div>
          <div className='orders_list_text' style={{ color: '#9081f6', float: 'right' }}>
          <span>{order.paid ? 'دفع' : 'لم يدفع'}</span>
          <span style={{ float: 'right', marginLeft: '5px', paddingTop: '2px' }}>
          {order.paid ? <FaRegMoneyBillAlt /> : <MdCancelPresentation />}
          </span> </div>
          <div className='orders_list_text'>{order.total}</div>
          <SelectStatus orderId={order.id} initialStatus={order.status} fetchOrders={fetchOrders} />
          <div className='orders_list_text'>
          <Link to={`/order/${order.id}`}> <button className='orders_list_but'>عرض التفاصيل</button> </Link>
          </div> </div> </div>
     
  );
}
