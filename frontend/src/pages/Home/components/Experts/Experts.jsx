import React from 'react';
import Config from '../../../../components/config';
import './Experts.css';

export default function Experts({group_product,name,title}) {
  return (
<>
<div className='experts-container_text'>{title}</div>
<div className='experts'>
{group_product.map(itme => (
<div className='experts-card'>
<div className='experts-card-top'><img className='experts-card-top-img'
src={`${Config.baseURL}${itme?.big_image}`}  /></div>
<div className='experts-card-bottom'><div className='flex-container'>
<div className='space-div'><img className='experts-card-bottom-img'
src={`${Config.baseURL}${itme?.image1}`}  /></div>
<div className='space-div'><img className='experts-card-bottom-img'
src={`${Config.baseURL}${itme?.image2}`}  /></div>
<div className='space-div'><img className='experts-card-bottom-img'
src={`${Config.baseURL}${itme?.image3}`}  /></div>
</div></div><div className='experts-card-titel'>  {itme?.title}</div>
<div className='flex-container'> 
<div className='experts-but'> 
<a href={itme.link}>  
<button class="experts-but-button"> {name} </button> </a> </div> 
<div className="experts-card-price">  {itme?.price}  </div></div> </div> 

))}
</div></>
  )
}
