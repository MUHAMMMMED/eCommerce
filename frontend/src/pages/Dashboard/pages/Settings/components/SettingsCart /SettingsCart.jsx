import React from 'react';
import { Link } from 'react-router-dom';
import './SettingsCart.css';

export default function SettingsCart({ name, icon, link }) { // Destructured props here
  return (
    <div className='Set_cart_list'>
      <div className='Set_cart_list_row'>
        <div className='Set_list_row_Fa'>{icon}</div>
        <div className='Set_list_row_text'>{name}</div>
        <div className='Set_list_row_but'>
          <Link to={link}>
            <button className='list_row_but'>فتح</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
