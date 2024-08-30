import React from 'react';
import { Link } from 'react-router-dom';
import Config from '../config';
import './Cart.css';
import AddToCard from './components/AddToCard';
export default function Cart({products,title}) {
 
  return (
<section >
{title&&  <div className='card-container_text'>{title}</div>}
<div className="card-container ">
{products.map((product) => (
 <div className="card-div">
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
  {product?.discount >  0 ? (
  <div  className="discounted-price"> <spen className='money_code'>{product?.currency}</spen> {product?.discount_price1} </div>
   ) : (  <></>  )}
  <div  className="content-price"> <spen className='money_code'>{product?.currency}</spen>{product?.price1} </div>
  </div>
  {product&& <AddToCard product={product} />}            
 </div></div></div></div></div>
  ))}  </div></section>
 )
}
