import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../../components/config';
import './ImageSlider.css';

const ImageSlider = ({ slide }) => {

  return (
    <div className='Image_Slick'>
      <Swiper modules={[Autoplay]} spaceBetween={0} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} style={{ width: '100%' }} >
        {slide.map((image, index) => (
          <SwiperSlide key={index} className='slickSlideImg-web'>
            <div className='slickSlide_web' >
              <img className='slickSlideImg' src={`${Config.baseURL}${image.top_slider_web}`} alt={`Image ${index + 1}`} style={{ width: '100%' }} /></div>
            <div className='slickSlide_mobile'>
              <img className='slickSlideImg' src={`${Config.baseURL}${image.top_slider_mobile}`} alt={`Image ${index + 1}`} style={{ width: '100%' }} /></div>
          </SwiperSlide>))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
