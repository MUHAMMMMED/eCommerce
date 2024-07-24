 
import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay'; // Import autoplay styles
import { Autoplay } from 'swiper/modules'; // Import the autoplay module
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../components/config';

const SwiperSlide_img = ({image_product}) => {
 

  return (
<>
    {image_product&&
    <div className='Image_Slick'>
      <Swiper
        modules={[Autoplay]} // Add the autoplay module here
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        style={{ width: '100%' }} // Ensure Swiper fills the width of its parent container
      >
        {image_product.map((item) => (
          <SwiperSlide key={item.id}>
           { item&&
            <img className='Product_img'  src={`${Config.baseURL}${item?.image}`} alt={`Image ${item?.name }`}   />}
  
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  }
</>
  );
};

export default SwiperSlide_img;
