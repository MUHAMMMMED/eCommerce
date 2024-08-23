import React from 'react';
import { Link } from 'react-router-dom';
import Config from '../../../../components/config';
import './Deal.css';
import Counter from './components/Counter/Counter';
import DealItrmsSwiper from './components/DealItrms/DealItrmsSwiper';

export default function Deal({data}) {
  return (
<div className='deal'>  
<div className='deal-top'>
<div className='deal-top-row'>
{data&& data?.one_deal.product?.image_side_one&&
<img className='deal-top-row-img'  src={`${Config.baseURL}${data?.one_deal.product?.image_side_one}`}    />
}
</div>

<div className='deal-top-row'>
<div className='deal-top-row-detail'>
 <div className='detail-sup_titel'> {data.one_deal?.title}</div>
 <div className='detail-titel'>   {data.one_deal?.product?.name}</div>
 <div className='detail-timer'>
<Counter targetDate= {data.one_deal?.product?.expiration_date_offer}/>
</div>

<div className='detail-B'> 
<div className='detail-but'>  
{data.one_deal.product && data.one_deal.product.discount > 0.0 ? (
<div className='detail-but-off'> 
 <div className='off-number'>{data.one_deal.product.discount}%</div>   خصم</div>   
 ) : (
 <> <br/> </>  )}
  <Link to={`/Product/${data.one_deal?.product?.name}/${data.one_deal?.product?.id}`}>  
   <button className='detail-but-button'>استعرض المنتج</button>  </Link> </div>  
</div></div></div></div>
{/* <div className='Deal-ROW'> <DealItrms deal={data.deal}/></div> */}
<div className='Deal-ROW-Swiper'>
   <DealItrmsSwiper deal={data.deal}/>
   </div>
  </div>
  )
}
