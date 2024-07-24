import React from 'react';
import Config from '../../../../../../components/config';
import './DeliveryCard.css';

export default function DeliveryCard({order}) {
  return (
<div className="DeliveryCard "> 
 <div>
 <img src={`${Config.baseURL}${order?.Shipping?.image}`}  height="35"  className="Delivery-option-icon"  alt="Delivery Option Icon"  />
 </div>
 <div className="delivery-card-content">
   <span className="card-title">  {order?.Shipping?.name}</span>
   <span className="card-text" >price :{order?.Shipping?.shipping_price ||0}  <span className='money_code'> SAR</span>  </span>
   <span className="card-text" style={{color:'rgb(144, 129, 246)'}}> discount :{order?.Shipping?.discount_price ||0} <span className='money_code'> SAR</span>  </span>
 </div>
 <div className="delivery-card-price">{order?.Shipping?.name}</div>
</div>
  )
}
 