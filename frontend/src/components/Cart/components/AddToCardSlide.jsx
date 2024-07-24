 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { MdMinimize } from "react-icons/md";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../Provider/CartProvider/CartProvider';
import Config from '../../config';
import './AddToCard.css';
axios.defaults.withCredentials = true; 

export default function AddToCardSlide({ product  }) {
  const { fetchCart } = useCart();
  const [quantity, setQuantity] = useState({ [product.id]: 1 });
  const [showBAGeModal, setShowBAGeModal] = useState(false);
  const [notes, setNotes] = useState([""]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Update notes state to match the quantity
    setNotes(Array(quantity[product.id]).fill(""));
  }, [quantity[product.id]]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`${Config.baseURL}/api/cart/add/`, {
        productId: product.id,
        quantity: quantity[product.id],
        notes: notes // Sending notes to the API
      });
 
      setShowBAGeModal(false); // Hide modal after adding to cart
      setSuccessMessage("تمت إضافة المنتج إلى السلة"); // Set success message
      fetchCart();
       setQuantity({ [product.id]: 1 });

    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  const handleIncrement = (productId) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: (prevQuantity[productId] || 1) + 1
    }));
  };

  const handleDecrement = (productId) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: prevQuantity[productId] > 1 ? prevQuantity[productId] - 1 : 1
    }));
  };

  const handleNoteChange = (index, value) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[index] = value;
      return newNotes;
    });
  };

  return (
    <>

{product?.stock_no <= 0 ? (
  <></> 
 ) : (
 <div className="content-Bag" onClick={() => setShowBAGeModal(true)}><TbShoppingBagPlus /> </div>
 )}
 {showBAGeModal && (
        <div className="Modal-Bag show">
          <div className="modal-content">
            <span className="close" onClick={() => setShowBAGeModal(false)}>&times;</span>
            <div className="modal-text">{product.name}</div>
            <div className='QUAntity'>
              <div className='QUantity-arrow'>
                <div className='QUantity-down' onClick={() => handleDecrement(product.id)}>
                  <MdMinimize />
                </div>
                <div className='QUantity-number'>{quantity[product.id]}</div>
                <div className='QUantity-up' onClick={() => handleIncrement(product.id)}>
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
            {product.is_active_note && (
             <>
              {product.note_help_top&& <span className="modal-note-text">{product.note_help_top}</span>}
              {Array.from({ length: quantity[product.id] }).map((_, index) => (
              <div key={index} className='modal-Note'>
              <textarea
                  name={`note${index}`}
                  className='Note'
                  value={notes[index] || ""}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  placeholder={` (${index + 1})${product?.note_help}`}
                  />
              </div>
            ))}</>
            )}
     
            <button className='Add_to_Cart_but' onClick={handleAddToCart}>
              إضافة إلى السلة <TbShoppingBagPlus />
            </button>
          </div>
        </div>
      )}
 <div className='content-button'>
  <Link to={`/Product/${product.name}/${product.id}`}>  
 <button className="but_bay">استعرض المنتج</button></Link>
                        </div>

 {successMessage && ( <div className="successMessage">{successMessage}</div>   )} 
         
     
    </>
    
  );
}

 