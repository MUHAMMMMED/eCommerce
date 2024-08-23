import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../config';
import './Cart.css';
import AddToCardSlide from './components/AddToCardSlide';

export default function SlideCart({ products,title }) {
 
 
  return (
    <section>
      {title && <div className='card-container_text'>{title}</div>}
      <div className="card-container">
        <Swiper
          spaceBetween={5}
          slidesPerView={window.innerWidth > 768 ? 4 : 2}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
  {products.map((product) => (
 <SwiperSlide key={product.id}>
   <div className="card-div-Slide">
   <div className="card">
   <Link to={`/Product/${product?.name}/${product.id}`}>  
   <div className="containerImg">
  {product?.stock_no <= 0 ? (
  <div className="Out_stock"  > <span style={{textAlign:'center',display:'block'}} >المخزن نفذ</span> </div> 
   ) : (  <></>  )}
   <img src={`${Config.baseURL}${product?.image_side_one}`} alt={product?.name} class="image"/> 
    <div className="overlay">
    {product?.stock_no <= 0 ? (
  <div className="Out_stock"  > <span style={{textAlign:'center',display:'block'}} >المخزن نفذ</span> </div> 
   ) : (  <></>  )}
    <img src={`${Config.baseURL}${product?.image_side_two}`} alt={product?.name} class="image"/>
  </div></div></Link>

    <div className="Container">
    <div className="single_product_text" >
    <h4 style={{textAlign:'right'}} >{product?.name}</h4>
    <div className='single_product-content' >
    <div  className="div-price">
    {product?.discount > 0 ? (
  <div  className="discounted-price"> {product?.currency}{product?.discount_price1} </div>
   ) : (  <></>  )}
    <div  className="content-price"> {product?.currency}{product?.price1} </div>
    </div>
  {product&&
 <AddToCardSlide product={product} />}
  </div>
   </div> </div> </div> </div>
   </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

 