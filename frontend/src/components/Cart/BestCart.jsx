
import Config from '../config';
import './Cart.css';
import AddToCard from './components/AddToCard';
export default function BestCart({Items,title}) {
 
  return (
<section >
{title&&  <div className='card-container_text'>{title}</div>}
<div className="card-container ">
{Items.map((item) => (
 <div className="card-div">
 <div className="card">
 <div className="containerImg">
{item.product?.stock_no <= 0 ? (
<div className="Out_stock"  > <span style={{textAlign:'center'}} >المخزن نفذ</span> </div> 
 ) : (  <></>  )}
 <img src={`${Config.baseURL}${item.product?.image_side_one}`} alt={item.product?.name} class="image"/> 
  <div className="overlay">
  {item.product?.stock_no <= 0 ? (
<div className="Out_stock"  > <span style={{textAlign:'center'}} >المخزن نفذ</span> </div> 
 ) : (  <></>  )}
  <img src={`${Config.baseURL}${item.product?.image_side_two}`} alt={item.product?.name} class="image"/>
</div></div>
  <div className="Container">
  <div className="single_product_text" >
  <h4 style={{textAlign:'right'}} >{item.product?.name}</h4>
  <div className='single_product-content' >
  <div  className="div-price">
  {item.product?.stock_no > 0 ? (
<div  className="discounted-price"><spen className='money_code'>{item.product?.currency}</spen>{item.product?.discount_price1} </div>
 ) : (  <></>  )}
  <div  className="content-price"> <spen className='money_code'>{item.product?.currency}</spen>{item.product?.price1} </div>
  </div>
  {item.product&& <AddToCard product={item.product} />}            
   </div>  </div>   </div></div></div>
  ))}  </div></section>
 )
}
