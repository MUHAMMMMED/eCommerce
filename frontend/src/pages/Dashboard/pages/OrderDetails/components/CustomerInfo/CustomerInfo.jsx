 
import React from 'react';
import { CgMail } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { GoNote } from "react-icons/go";
import { IoMdLocate } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LiaShippingFastSolid, LiaStreetViewSolid } from "react-icons/lia";

import DeliveryCard from '../DeliveryCard/DeliveryCard';
import './CustomerInfo.css';

export default function CustomerInfo({order}) {
   
 
  return (
    <>
      <div className='Info'>
        <>
              <div className="Info-Summary">
              <div className="Info-title">بيانات  الشحن</div>

              <div className="Info-item ">              
              <div className="Info-text-right"style={{display:'block'}}> <span className="Info-icon"><FaRegUser /></span></div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>{order?.customer?.name}</span> </div>
              </div>

              <div className="Info-item">
              <div className="Info-text-right"style={{display:'block'}}><span className="Info-icon"><FiPhone /></span>  </div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>{order?.customer?.phone}</span> </div>
              </div>
              
              <div className="Info-item">
              <div className="Info-text-right"style={{display:'block'}}> <span className="Info-icon"> <CgMail/> </span></div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>{order?.customer?.email}</span></div>
              </div>
  {order && order.customer.country.name  &&
              <div className="Invoic-item">
              <div className="Info-text-right"style={{display:'block'}}><span className="Info-icon">: الدولة  <IoLocationOutline /> </span>  </div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>  
                {order?.customer?.country?.name }
                 </span> </div>
              </div>
               } 
              
              <div className="Invoic-item">
              <div className="Info-text-right"style={{display:'block'}}><span className="Info-icon">: المحافظة  <IoLocationOutline /></span> </div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>  {order?.customer?.governorate} </span> </div>
              </div>
              <div className="Invoic-item">
              <div className="Info-text-right"style={{display:'block'}}><span className="Info-icon">: المدينة <IoLocationOutline /></span> </div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}> {order?.customer?.city} </span> </div>
              </div>

              <div className="Invoic-item">
              <div className="Info-text-right"style={{display:'block'}}><span className="Info-icon">  : الحي<IoLocationOutline /></span> </div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>    {order?.customer?.neighborhood}</span> </div>
              </div>
             

              <div className="Info-item">
              <div className="Info-text-right"style={{display:'block'}}><span className="Info-icon"> : الشارع <LiaStreetViewSolid /> </span> </div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>{order?.customer?.shipping_address}  </span></div>
              </div>


              <div className="Invoic-item"style={{display:'block',textAlign:"right",color:'#9081f6'}}>بيانات الموقع</div>
              <div className="Invoic-item"style={{display:'block'}}><div className="Info-text-right"style={{display:'block'}}> <span className="Info-icon"><IoMdLocate /></span> </div>
              <div className="Info-text-left"style={{display:'block'}}> <span className="Info-amount"style={{display:'block'}}>    {order?.customer?.IP_country?.dictionary?.name}, {order?.customer?.IP_Region?.dictionary?.name} , {order?.customer?.IP_city?.dictionary?.name}</span> </div>
              </div>
              <div className="Invoic-item"style={{display:'block',textAlign:"right",color:'#9081f6'}}> ملاحظة</div>

              <div className="Info-item"style={{display:'block'}}> <div className="Info-text-right"style={{display:'block'}}><span className="Info-icon"><GoNote/></span> </div>
              <div className="Info-text-left"style={{display:'block'}}><span className="Info-amount"style={{display:'block'}}>   {order?.note} </span></div>
              </div>      
              <div className="Invoic-item" style={{display:'block',textAlign:"right",color:'#9081f6'}}>شركة الشحن</div>
 
              <DeliveryCard order={order}/>

              <div className="Invoic-item" style={{display:'block',textAlign:"right",color:'#9081f6'}}> رقم التتبع الشحن</div>
              <div className="Invoic-item"style={{display:'block'}} ></div>
              <div className="Invoic-item" style={{display:'block'}}><div className="Info-text-right" style={{display:'block', width:'30px'}}> </div>
              <div className="Info-text-left"style={{display:'block'}}> 
              <span className="Info-total-amount" style={{display:'block',font:'25px'}}>  {order?.Tracking}     </span> 
              <span style={{display:'block',textAlign:"right",color:'#9081f6',font:'35px'}}><LiaShippingFastSolid />
              </span></div>
              </div> </div>
             </>  </div> </>
  );
}
 