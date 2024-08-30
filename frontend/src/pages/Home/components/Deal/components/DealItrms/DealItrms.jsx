import React from 'react';
import { Link } from 'react-router-dom';
import Config from '../../../../../../components/config';
import './DealItrms.css';
import Counter from './components/Counter/Counter';

export default function DealItrms({ deal }) {
  return (
    <>
{deal && deal.length > 0 && deal.map(dealItem => (
<div className='DealItrm' key={dealItem.id}>
<div className='DealItrm-row'>
<img className='DealItrm-row-img' src={dealItem.product?.image_side_one ? `${Config.baseURL}${dealItem.product.image_side_one}` : 'default_image_path.jpg'} 
 alt={dealItem.product?.name || 'Product Image'} /> </div>  
         
<div className='DealItrm-row'style={{display:'block'}}>
  {dealItem.product && dealItem.product.discount > 0.0 ? (
    <div className='DealItrm-detail-off'style={{display:'block'}}>  <span className='DealItrm-detail-off-span'style={{display:'block'}}> {dealItem.product.discount}% خصم    </span>  </div>
  ) : (
 <><br /> </>  )}
 {/* <div className='DealItrm-sup_titel'> {dealItem.title}</div> */}
<div className='DealItrm-titel'> {dealItem.product?.name}</div>
 <div className='DealItrm-timer'>
<Counter targetDate={dealItem.product?.expiration_date_offer}/>    </div>
 <div className='DealItrm-detail-B'>
<div className='DealItrm-detail-but'>
<Link to={`/Product/${dealItem.product?.name}/${dealItem.product?.id}`}>      <button className='DealItrm-detail-but-button'>استعرض المنتج</button>   </Link>
            
 </div> </div></div> </div>
))}
    </>
  );
}
