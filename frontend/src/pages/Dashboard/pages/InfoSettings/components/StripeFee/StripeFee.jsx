import React from 'react';
import { LiaStripe } from "react-icons/lia";

export default function StripeFee() {
  return (
    <>

      <div className='Info_card'>
        <div className='Info_card_space'>
          <div className='Info_card_icon'><LiaStripe /></div>
          <div className='Info_card_text'>    عمولة سترايب</div>
          <div className='Info_card_but'>
            <button className='card_but_button'>تعديل</button>


          </div></div>  </div>

    </>
  )
}
