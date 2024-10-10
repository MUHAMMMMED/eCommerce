import React from 'react';
// import Accordion from '../../components/Accordion/Accordion';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
// import SlideCart from '../../components/Cart/SlideCart';
// import Feedback from '../../components/Feedback/Feedback';
import MoreInfo from '../ProductDetailPage/components/MoreInfo/MoreInfo';
import './ProductDetailPageplus.css';
import Counter from './components/Counter/Counter';
import SellProductsSlider from './components/SallaProductsSlider/SallaProductsSlider';
import SwiperSlide_img from './components/SwiperSlide_img';
import star from './star.png';
export default function ProductDetailPageplus({ product }) {
  const today = new Date();
  const expirationDate = new Date(product?.expiration_date_offer);

  const tags = [
    { name: 'الرئيسية', link: '/' },
    { name: product?.category?.name, link: `/Category/${product?.category?.name}/${product?.category?.id}` },
    { name: product?.name, link: '#' },
  ];
  return (
    <>
      <Breadcrumb tags={tags} />
      <div className='sectionDetailPage'>
        <div className='DetailPageRow'>
          {product && (<div className="product_video">  <SwiperSlide_img image_product={product?.image_product} />  </div>)}

          {product.video && (
            <div className="product_video">
              <video className="video" muted autoPlay loop playsInline>
                <source src={product?.video} type="video/mp4" />

              </video> </div>
          )}

        </div>
        <div className="DetailPageRow">
          <div className="product-info">
            <div className="scroll-container">
              <p className="product_cat">{product?.subtitle}</p>
              <h1 className="product_title">{product?.name}</h1>
              <div className="product_star">
                <div style={{ float: 'right' }}>
                  {Array(product?.most_frequent_rate_number)
                    .fill(null)
                    .map((_, index) => (
                      <img
                        key={index}
                        src={star}
                        lt="star"
                      />))}
                </div>
                <div style={{ float: 'right', marginRight: '5px' }}>({product?.rate_count})</div>
              </div> </div>
            <div className="product_price">
              <div className="price_item">{product?.price1} <spen className='money_code'>{product?.currency}</spen>  </div>
              <div className="price-item_sale">{product?.discount_price1} <spen className='money_code'>{product?.currency}</spen> </div>
              {product?.stock_no <= 0 ? (
                <div className="sold_out">نفذ المخزون</div>
              ) : (
                product.discount > 0.0 ? (
                  <div className="sold_out"> {product.discount}% <samp>خصم</samp> </div>
                ) : (
                  <><br /></>
                )
              )}
              <br /><p>{product.description} </p></div>

            {product && <SellProductsSlider product={product} />}

            {today < expirationDate && (
              <div style={{ float: 'left', width: '100%', paddingTop: '15px', paddingBottom: '15px', marginTop: '5px', marginBottom: '15px' }}  >
                <h5 style={{ textAlign: 'center' }}>ينتهي العرض</h5>
                <Counter targetDate={product?.expiration_date_offer} discount={product?.discount} />
              </div>)}

            <div className="business-element-input"  >
              <MoreInfo more_info={product?.more_info} />
            </div></div></div></div>

      {/* <Accordion questions={product?.freq} /> */}
      {/* <Feedback rates={product?.rate} /> */}
      {/* <SlideCart products={product?.products} title=" منتجات ذات صله" /> */}

    </>
  )
}
