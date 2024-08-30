import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Config from '../../config';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/api/cart/cart/`);
      setCartCount(response.data.cart_items_count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
