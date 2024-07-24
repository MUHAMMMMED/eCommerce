import React from 'react';
import { MdNotificationImportant } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Notification.css';
export default function Notification({ Id,link,name,stock_no,key} ) {
  
  return (
  

 <div className='Notif' key={key}>
<Link to={`/${link}/${Id}`}>  
<div className='Card_Notif'> 
<div className='Card_Notif_row'><span className='Notif_icon'> <MdNotificationImportant /> </span></div>
<div className='Card_Notif_row'  > <span className='Notif_text'>المخزون من   ( {name} )  قارب علي النفاذ المتباقي ( {stock_no} )</span></div>
</div></Link>

 </div>
  )
}
 

 