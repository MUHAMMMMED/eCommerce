
import axios from 'axios'; // Import axios
import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { MdMinimize } from "react-icons/md";
import Config from '../../../../components/config';
axios.defaults.withCredentials = true; // Ensuring cookies are sent with requests

export default function Quantity({ itemId, quantity, fetchCart }) {

  const handleQuantityChangeUp = () => {
    axios.put(`${Config.baseURL}/api/cart/update_quantity/${itemId}/`, {
      itemId: itemId,
      quantity: quantity + 1,
    })
      .then(response => {
        fetchCart(); // Update the cart after successful request
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
      });
  };

  const handleQuantityChangeDown = () => {
    if (quantity > 1) {
      axios.put(`${Config.baseURL}/api/cart/update_quantity/${itemId}/`, {
        itemId: itemId,
        quantity: quantity - 1, // Decrease quantity
      })
        .then(response => {
          fetchCart(); // Update the cart after successful request
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
        });
    } else {
      console.error('Minimum quantity reached');
    }
  };

  return (
    <div className='cartProductQuantity'>
      <div className='Quantity'>الكمية</div>
      <div className='Quantity'>
        <div className='Quantity-number'>{quantity}</div>
        <div className='Quantity-SlArrow'>
          <div className='Quantity-SlArrow-Down' onClick={handleQuantityChangeDown}><MdMinimize /></div>
          <div className='Quantity-SlArrow-Up' onClick={handleQuantityChangeUp}><AiOutlinePlus /></div>
        </div>
      </div>
    </div>
  );
}
