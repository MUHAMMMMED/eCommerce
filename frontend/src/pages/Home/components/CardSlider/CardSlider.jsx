
import React from 'react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../../components/config';
import './CardSlider.css';

export default function CardSlider({ card }) {
    return (
        <div className='Slick-card'>
            <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={window.innerWidth > 768 ? 6 : 2} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} >
                {card.map((itme) => (
                    <SwiperSlide key={itme.id}>
                        <a href={itme.link}>
                            <img className='card-slider' src={`${Config.baseURL}${itme?.image}`} alt={itme.title} /> </a>
                    </SwiperSlide>))}
            </Swiper>
        </div>
    );
};
