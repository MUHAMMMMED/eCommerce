import React from 'react'
import Config from '../../../../components/config'

export default function SmallCard({quantity,image}) {
  return (
    <div className="product-card-col ">
    <div className="product-card  ">
    <img  src={`${Config.baseURL}${image}`} className="card-img-top  "/>
    <span className="card-badge" style={{display:'block'}}>{quantity}</span></div>
    </div>
  )
}
 