import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonGroup.css';

export default function ButtonGroup() {
  return (
<div className='ButtonGroup'  >
  <Link to="/report">  <button  class="btn-group">التقارير</button></Link> 
  {/* <Link to="/dashboard">   <button class="btn-group" >المنتجات</button></Link>  */}
  {/* <Link to="/dashboard">   <button class="btn-group" >الفئات</button></Link>  */}
  {/* <Link to="/dashboard">   <button class="btn-group" >الطلبات</button></Link>  */}
  <Link to="/Settings">   <button class="btn-group" >الاعدادات</button></Link>  
  {/* <Link to="/report">  <button  class="btn-group">الحملات الاعلانية</button></Link>  */}
  {/* <Link to="/customer_list">  <button  class="btn-group">لعملاء</button></Link>  */}

  {/* <Link to="/expense">  <button  class="btn-group">expense</button></Link> 

 
  <Link to="/purchase">  <button  class="btn-group">purchase</button></Link> 

  <Link to="/package">  <button  class="btn-group">package</button></Link>  */}

  

</div>
  )
}
