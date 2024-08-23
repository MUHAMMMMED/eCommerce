 
import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../../components/config';
import './CategoryCard.css';
 
export default function CategoryCard({Category}) {
   
 return (
 <div className='categoryCard'>
<Swiper
modules={[Autoplay]}
spaceBetween={0}
slidesPerView={window.innerWidth > 768 ? 6 : 3}
loop={true}
autoplay={{ delay: 5000, disableOnInteraction: false }} > 
                     
 {Category.map((itme ) => (
 <SwiperSlide key={itme.id} style={{padding:'5px'}}>
<div className='categoryCard-list'>
<Link to={`/Category/${itme.name}/${itme.id}`}>  
<div className='Card-list-row'>
<img className='list-row-img' src={`${Config.baseURL}${itme?.home_image}`}  alt={itme.name} />
</div>
<div className='list-row-detail-titel'> {itme.name}</div> 

</Link>
</div></SwiperSlide>))}
 </Swiper>
  </div>
    );
};
 



 


 