import React from 'react';
import Config from '../../../../../../components/config';
import './DeliveryCard.css';

export default function DeliveryCard({ order }) {
  return (
    <div className="DeliveryCard ">
      <div>
        <img src={`${Config.baseURL}${order?.Shipping?.image}`} height="35" className="Delivery-option-icon" alt="Delivery Option Icon" />
      </div>
      <div className="delivery-card-content">
        <span className="delivery-card-title">  {order?.Shipping?.name}</span>
        <span className="delivery-card-price" >price :{order?.Shipping?.shipping_price || 0}  <span className='money_code'> ريال</span>  </span>
        <span className="delivery-card-price" style={{ color: 'rgb(144, 129, 246)' }}> discount :{order?.Shipping?.discount_price || 0} <span className='money_code'> ريال</span>  </span>
      </div>
    </div>
  )
}
