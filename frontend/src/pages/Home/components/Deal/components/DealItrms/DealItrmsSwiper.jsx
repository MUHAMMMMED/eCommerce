
import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../../../../components/config';
import './DealItrms.css';
import CounterSwiper from './components/Counter/CounterSwiper';

export default function DealItrmsSwiper({deal}) {
   
    
return (
      
 <Swiper
 modules={[Autoplay]}
spaceBetween={30}
slidesPerView={window.innerWidth > 768 ? 3 : 1}
loop={true}
autoplay={{ delay: 1000, disableOnInteraction: false }}
>
             

{deal && deal.length > 0 && deal.map(dealItem => (
  <SwiperSlide key={dealItem.id} >
 
   
<div className='DealItrm_swiper'>
<div className='DealItrm-row'>  <img className='DealItrm-row-img' 

src={dealItem.product?.image_side_one ? `${Config.baseURL}${dealItem.product.image_side_one}` : 'default_image'} 
 alt={dealItem.product?.name || 'Product Image'} />

 

</div>  
 
<div className='DealItrm-row'>
  {dealItem.product && dealItem.product.discount > 0.0 ? (
    <div className='DealItrm-detail-off'>  <span className='DealItrm-detail-off-span'> {dealItem.product.discount}% خصم    </span>  </div>
  ) : (
 <><br /> </>  )}



<div className='DealItrm-sup_titel'> {dealItem.title}</div>
<div className='DealItrm-titel'> {dealItem.product?.name}</div>


 <div className='DealItrm-timer'>
 <CounterSwiper targetDate={dealItem.product?.expiration_date_offer}/>    </div>
 <div className='DealItrm-detail-B'>
<div className='DealItrm-detail-but'>
<Link to={`/Product/${dealItem.product?.name}/${dealItem.product?.id}`}>      <button className='DealItrm-detail-but-button'>استعرض المنتج</button>   </Link>
            
 </div> </div></div> </div>
  
 
 </SwiperSlide>))}


{/* 

 {deal && deal.length > 0 && deal.map(dealItem => (
<div className='DealItrm' key={dealItem.id}>
<div className='DealItrm-row'>
<img className='DealItrm-row-img' src={dealItem.product?.image_side_one ? `${Config.baseURL}${dealItem.product.image_side_one}` : 'default_image_path.jpg'} 
 alt={dealItem.product?.name || 'Product Image'} /> </div>  
         
<div className='DealItrm-row'>
  {dealItem.product && dealItem.product.discount > 0.0 ? (
    <div className='DealItrm-detail-off'>  <span className='DealItrm-detail-off-span'> {dealItem.product.discount}% خصم    </span>  </div>
  ) : (
 <><br /> </>  )}
 <div className='DealItrm-sup_titel'> {dealItem.title}</div>
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
} */}









{/* 
 <SwiperSlide key={2}>
   
   <div className='DealItrm'>
   <div className='DealItrm-row'>  <img className='DealItrm-row-img'   src='https://cdn.salla.sa/KjRqOb/MHxEfwjYY2MgbjU5M1iMFSpE4irTNZZXl3ovuhXX.jpg'/></div>  
   <div className='DealItrm-row'>  
   <div className='DealItrm-detail-off'> <span className='DealItrm-detail-off-span'>40 %   OFF</span> </div>  
    <div className='DealItrm-titel'> Deal of the day</div>
    <div className='DealItrm-timer'>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>DAYS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>HOURS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>MINUTES</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>SECS</div>
    </div> </div>
     
    <div className='DealItrm-detail-B'> 
    <div className='DealItrm-detail-but'> <button className='DealItrm-detail-but-button'>استعرض المنتج</button>   </div>  
    </div> 
      
    </div> </div> 
    </SwiperSlide>



    <SwiperSlide key={3}>
   
   <div className='DealItrm'>
   <div className='DealItrm-row'>  <img className='DealItrm-row-img'   src='https://cdn.salla.sa/KjRqOb/MHxEfwjYY2MgbjU5M1iMFSpE4irTNZZXl3ovuhXX.jpg'/></div>  
   <div className='DealItrm-row'>  
   <div className='DealItrm-detail-off'> <span className='DealItrm-detail-off-span'>40 %   OFF</span> </div>  
    <div className='DealItrm-titel'> Deal of the day</div>
    <div className='DealItrm-timer'>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>DAYS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>HOURS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>MINUTES</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>SECS</div>
    </div> </div>
     
    <div className='DealItrm-detail-B'> 
    <div className='DealItrm-detail-but'> <button className='DealItrm-detail-but-button'>استعرض المنتج</button>   </div>  
    </div> 
      
    </div> </div> 
    </SwiperSlide>


    <SwiperSlide key={4}>
   
   <div className='DealItrm'>
   <div className='DealItrm-row'>  <img className='DealItrm-row-img'   src='https://cdn.salla.sa/KjRqOb/MHxEfwjYY2MgbjU5M1iMFSpE4irTNZZXl3ovuhXX.jpg'/></div>  
   <div className='DealItrm-row'>  
   <div className='DealItrm-detail-off'> <span className='DealItrm-detail-off-span'>40 %   OFF</span> </div>  
    <div className='DealItrm-titel'> Deal of the day</div>
    <div className='DealItrm-timer'>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>DAYS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>HOURS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>MINUTES</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>SECS</div>
    </div> </div>
     
    <div className='DealItrm-detail-B'> 
    <div className='DealItrm-detail-but'> <button className='DealItrm-detail-but-button'>استعرض المنتج</button>   </div>  
    </div> 
      
    </div> </div> 
    </SwiperSlide>


    <SwiperSlide key={5}>
   
   <div className='DealItrm'>
   <div className='DealItrm-row'>  <img className='DealItrm-row-img'   src='https://cdn.salla.sa/KjRqOb/MHxEfwjYY2MgbjU5M1iMFSpE4irTNZZXl3ovuhXX.jpg'/></div>  
   <div className='DealItrm-row'>  
   <div className='DealItrm-detail-off'> <span className='DealItrm-detail-off-span'>40 %   OFF</span> </div>  
    <div className='DealItrm-titel'> Deal of the day</div>
    <div className='DealItrm-timer'>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>DAYS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>HOURS</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>MINUTES</div>
    </div>
    
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>0</div>
    <div className='DealItrm-timer-row-text'>SECS</div>
    </div> </div>
     
    <div className='DealItrm-detail-B'> 
    <div className='DealItrm-detail-but'> <button className='DealItrm-detail-but-button'>استعرض المنتج</button>   </div>  
    </div> 
      
    </div> </div> 
    </SwiperSlide>
    */}



            
            </Swiper>
       
    );
};





 