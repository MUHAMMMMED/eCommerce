 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../../../components/Provider/CartProvider/CartProvider';
import Config from '../../../../components/config';
import './SellProductsSlider.css';

axios.defaults.withCredentials = true;

export default function SellProductsSlider({ product }) {
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  const productId = product?.id;
  const [quantity, setQuantity] = useState({ [productId]: product?.default_option });
  const [notes, setNotes] = useState(Array(product?.default_option).fill(""));
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (productId) {
      setNotes(Array(quantity[productId]).fill(""));
    }
  }, [quantity[productId], productId]);

  const handleAddToCart = async () => {
    if (!productId) return;

    try {
      const response = await axios.post(`${Config.baseURL}/api/cart/add/`, {
        productId,
        quantity: quantity[productId],
        notes: notes,
      });

 
      setQuantity({ [productId]: 1 }); // Reset quantity to 1 after success
      setNotes('');
      fetchCart();
      setSuccessMessage("تمت إضافة المنتج إلى السلة"); // Set success message
    } catch (error) {
     }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: (prevQuantity[productId] || 1) + 1,
    }));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: prevQuantity[productId] > 1 ? prevQuantity[productId] - 1 : 1,
    }));
  };

  const handleNoteChange = (index, value) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[index] = value;
      return newNotes;
    });
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/cart');
  };

  return (
    <>
      <div className='SellProducts'>
        <QuantityControl
          quantity={quantity[productId]}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />

        <div className="Sell-Row">
          {product.note_help_top && <div className='modal-note-text'>{product.note_help_top}</div>}
          {product.is_active_note && (
            <>
              {Array.from({ length: quantity[productId] }).map((_, index) => (
                <NoteInput
                  key={index}
                  index={index}
                  value={notes[index] || ""}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  product={product} // Pass the product prop
                />
              ))}
            </>
          )}
          {product.note_help_bottom && (
            <span className="google-business-message">{product.note_help_bottom}</span>
          )}
        </div>
   
        <div className="Sell-Row-name">
          <button className='Sell-button-btn' onClick={handleAddToCart}>إضافة للسلة</button>
        </div>
        <div className="Sell-Row-price">
          <button className='Sell-button-pay' onClick={handleBuyNow}>اشتري الآن</button>
        </div>
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
      </div>
    </>
  );
}

const QuantityControl = ({ quantity, onIncrement, onDecrement }) => (
  <div className="Sell-Row">
    <div className="Sell-Row-name">الكمية</div>
    <div className="Sell-Row-price">
      <div className="Sell-Quantity">
        <div className="Sell-quantity-container">
          <div className='Sell-quantity-button' onClick={onDecrement}>-</div>
          <div className='Sell-quantity'>{quantity}</div>
          <div className='Sell-quantity-button' onClick={onIncrement}>+</div>
        </div>
      </div>
    </div>
  </div>
);

const NoteInput = ({ index, value, onChange, product }) => (
  <div className='modal-note'>
    <textarea
      name={`note${index}`}
      className='note'
      value={value}
      onChange={onChange}
      placeholder={` (${index + 1})${product?.note_help}`}
    />
  </div>
);
