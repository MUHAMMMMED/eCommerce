import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { FaUserTie } from "react-icons/fa6";
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  AuthorThumb, AuthorThumbImg, AuthorThumbSpen, Feedbackcontainer,
  RatingBar, RatingStar,
  Singletestimonial,
  TestimonialContentName, TestimonialContentP,
  TestimonialWrapper
} from './styles';

export default function Feedback({ rates = [] }) {
  return (
    <Feedbackcontainer>
      <TestimonialWrapper>
        <Swiper
          spaceBetween={window.innerWidth > 768 ? 5 : 0}
          slidesPerView={window.innerWidth > 768 ? 5 : 2}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}>

          {Array.isArray(rates) && rates.map((item) => (
            <SwiperSlide key={item.id}>
              <Singletestimonial>
                <AuthorThumb>
                  <AuthorThumbImg >  <FaUserTie /></AuthorThumbImg>
                  <AuthorThumbSpen><FaQuoteLeft /></AuthorThumbSpen> </AuthorThumb>
                <RatingStar>
                  <RatingBar style={{ display: 'block' }}>
                    {Array.from({ length: item.rate_number }, (_, index) => (
                      <FaStar key={index} />))}
                  </RatingBar>
                </RatingStar>
                <TestimonialContentP>
                  <p>{item.message}</p>
                  <TestimonialContentName>{item.name}</TestimonialContentName>
                </TestimonialContentP></Singletestimonial></SwiperSlide>))}
        </Swiper>  </TestimonialWrapper> </Feedbackcontainer>
  );
}
