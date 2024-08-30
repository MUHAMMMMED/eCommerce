import React from 'react';
import { ImWhatsapp } from "react-icons/im";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useCart } from '../Provider/CartProvider/CartProvider';
import './FloatButton.css';

export default function FloatButton({ info }) {
  const { cartCount } = useCart();

  return (
    <>
      {info?.Whatsapp &&
        <a className="float-button" target="_blank" href={`https://wa.me/${info.Whatsapp}`}>
          <ImWhatsapp />  <span style={{ marginRight: '10px' }}>كيف يمكنني مساعدتك؟</span>  </a>}

      <Link className="button-card" to="/cart">
        <button className="checkout-button">
          <RiShoppingBagLine />
          {!cartCount ? (<></>) : (<span className="cart-count">{cartCount}</span>)}
        </button>
      </Link>
    </>
  );
}




