
import React from 'react';
import { BsTextareaResize } from "react-icons/bs";
import './CartList.css';

export default function CartList({ order }) {
  return (
    <div className='cart_list'>
      {order && order?.items.map((item) => (
        <div className='cart_list_row' key={item?.id}>
          <div className='list_row_img'>
            <samp className='row_img-icon'> <BsTextareaResize /></samp>
            {/* <img src={`${Config.baseURL}${item?.product?.image_side_one}`} alt={item?.name} style={{width:'100%', borderRadius: '0px 8px 8px 0px'}} /> */}
          </div>
          <div className='list_row_text'>{item?.dictionary?.name}</div>
          <div className='list_row_quantity'>
            <div>الكمية</div>
            <div>{item?.quantity}</div>
          </div>
          {item?.notes?.map((noteItem, index) => (
            <div className='cart_list_note' key={index} style={{ display: 'block' }}
              onClick={() => {
                if (noteItem?.note) {
                  navigator.clipboard.writeText(noteItem.note)
                    .then(() => {
                      alert(`تم نسخ: ${noteItem.note.length > 50 ? noteItem.note.substring(0, 50) + '...' : noteItem.note}`);
                    })
                    .catch(err => {
                      console.error('فشل في نسخ النص: ', err);
                    });
                }
              }}
            >
              <span className='list_note_number' style={{ display: 'block' }}>{index + 1}</span>
              <span className='list_note_text' style={{ display: 'block' }}>
                {noteItem.note.length > 50 ? noteItem.note.substring(0, 50) + '...' : noteItem.note}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}