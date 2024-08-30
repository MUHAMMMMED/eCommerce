import React from 'react';
import Config from '../../../../../../components/config';
import './MoreInfo.css';
import CreateInfo from './components/CreateInfo';
import UpdateInfo from './components/UpdateInfo';

export default function MoreInfo({ more_info, ProductId, fetchProduct }) {



  return (
    <div className='product-form-row2'>
      <div className='product-form'>
        <div style={{ marginBottom: '5px', fontWeight: '700', float: 'right', width: '20%' }}>معلومات اخري
        </div>
        <CreateInfo ProductId={ProductId} fetchProduct={fetchProduct} />

        {more_info.map((item) => (
          <div className='product-Info' key={item.id}>
            <div className='Info-div'>
              <img class="Info-div_img" src={`${Config.baseURL}${item?.image}`} alt='image' /></div>
            <div className='Info-div-text'>
              <div className='Info-text' style={{ fontWeight: '700' }}>{item?.name} </div>
              <div className='Info-text'>{item?.description}</div></div>
            <div className='Info-but'>  <UpdateInfo item={item} fetchProduct={fetchProduct} /> </div>
          </div>))}

      </div></div>
  )
}
