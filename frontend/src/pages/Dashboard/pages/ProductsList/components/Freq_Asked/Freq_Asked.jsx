import React from 'react';
import './Freq_Asked.css';
import CreateFreq from './components/CreateFreq';
import UpdateFreq from './components/UpdateFreq';

export default function Freq_Asked({freq, ProductId,fetchProduct }) {
  return (
<div className='product-form-row1'>
<div className='product-form'>
<div style={{marginBottom:'5px' ,fontWeight:'700' ,float:'right',width:'20%'}}>الأسئلة المتكررة
</div>

<CreateFreq  ProductId={ProductId}fetchProduct={fetchProduct} />

{freq.map((item) => (
<div className='product-Freq' key={item.id}> 
<div className='Freq-div-text' >
<div className='Freq-text'   style={{padding:'5px' }}>{item?.question} </div>
<div className='Freq-text'style={{padding:'5px',paddingBottom:'5px'}}  >{item?.answer}</div>
</div>
<div className='Info-but'> <UpdateFreq item={item} fetchProduct={fetchProduct}/> </div>
</div> ))}</div> </div>
 )
}
