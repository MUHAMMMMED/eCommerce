 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../../../components/Provider/CartProvider/CartProvider';
import Config from '../../../../components/config';
import './SellProductsCart.css';
axios.defaults.withCredentials = true;  

function SellProductsCart({ product }) {
  const navigate = useNavigate();
  const { fetchCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(product?.default_option);  
  const [notes, setNotes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const productsList = [
    { id: 1, name: product?.name, quantity: product?.quantity1, price: product?.price1 ,discount_price: product?.discount_price1, currency: product?.currency, img: `${Config.baseURL}${product?.image_side_one}` },
    { id: 2, name: product?.name, quantity: product?.quantity2, price: product?.price2 ,discount_price: product?.discount_price2, currency: product?.currency, img: `${Config.baseURL}${product?.image_side_one}` },
    { id: 3, name: product?.name, quantity: product?.quantity3, price: product?.price3 ,discount_price: product?.discount_price3, currency: product?.currency, img: `${Config.baseURL}${product?.image_side_one}` },
    { id: 4, name: product?.name, quantity: product?.quantity4, price: product?.price4 ,discount_price: product?.discount_price4, currency: product?.currency, img: `${Config.baseURL}${product?.image_side_one}` },
    { id: 5, name: product?.name, quantity: product?.quantity5, price: product?.price5 ,discount_price: product?.discount_price5, currency: product?.currency, img: `${Config.baseURL}${product?.image_side_one}` },
   ];

  useEffect(() => {
    if (selectedProduct) {
      const product = productsList.find(p => p.id === selectedProduct);
      if (product) {
        setNotes(Array(product.quantity).fill(""));
      }
    }
  }, [selectedProduct]);

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId === selectedProduct ? 1 : productId);
  };

  const handleNoteChange = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const handleAddToCart = async () => {
    try {
      const selectedProductData = productsList.find(product => product.id === selectedProduct);
      const response = await axios.post(`${Config.baseURL}/api/cart/add/`, {
        productId: product.id,
        quantity: selectedProductData.quantity,
        notes: notes
      });
      setSuccessMessage("تمت إضافة المنتج إلى السلة"); // Set success message
      // Reset selected product and notes after adding to cart
      setSelectedProduct(1); // Set default selected product to the first one
      fetchCart();
      setNotes(Array(productsList[0].quantity).fill("")); // Set notes for default selected product
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/cart');
  };

  return (
    <>
      <div>
        {productsList.map((product) => (
          <div
            className='option'
            key={product.id}
            onClick={() => handleSelectProduct(product.id)}
            style={{
              border: selectedProduct === product.id ? '2px solid #9081f6' : '1px solid black',
              backgroundColor: selectedProduct === product.id ? 'lightblue' : 'white',
              padding: '10px', margin: '5px', cursor: 'pointer' }} >
          
            <div className='new-option'>
            <div className='option_price' style={{display:'block'}}>
            <div className="first-price" style={{display:'block'}}> <span style={{display:'block'}} >{product?.currency}</span> <span style={{display:'block'}}>{product?.price}</span></div>
            <div className="second-price"> {product?.currency}{product?.discount_price} </div>
            </div>
            <div className='option_title'>{product?.quantity} - {product?.name} </div>
            <div className='option_img'> <img className='IMG' src={product?.img} alt="Product" /></div>
            <div className='option_checked'>
            {selectedProduct === product.id ? <span className="checked"></span> : <span className="unchecked"></span>}
           </div> </div> </div>
          ))}</div>
      {product.note_help_top&& <span className="google-business-top"style={{display:'block',textAlign:'center'}}>{product.note_help_top}</span>}
      {product.is_active_note && (
        <>
          {selectedProduct && productsList[selectedProduct - 1] && (
            <>
              <div>
                {Array.from({ length: productsList[selectedProduct - 1].quantity }).map((_, index) => (
                  <div key={index} className='modal-note'>
                    <textarea
                      name={`note${index}`}
                      className='note'
                      value={notes[index] || ""}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      placeholder={` (${index + 1})${product?.note_help}`}  />  
                      </div> ))}
                      </div>
              {product.note_help_bottom&& 
              <span className="google-business-message"style={{display:'block',width:'100%',textAlign:'center'}}>  {product.note_help_bottom}  </span>}
              </> )}
             </>  )}
               <div className="new-form-atc" onClick={handleAddToCart}>أضف إلى السلة</div>
               <div className="div-payment-button" >
               <button className="payment-button" type="button" onClick={handleBuyNow}> اشتري الآن </button>
               </div> <div  className="div-new-form-atc">
               <button className="new-form-atc" type="button" style={{background:'#000',color:'#fff'}} onClick={handleBuyNow}> اشتري الآن </button>
               </div>
               {successMessage && (<div className="successMessage" style={{display:'block',textAlign:'center'}}>{successMessage}</div>  )}
          
      
  </>
  );
}
export default SellProductsCart;
