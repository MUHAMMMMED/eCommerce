import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonGroup.css';

export default function ButtonGroup() {
  return (
    <div className='ButtonGroup'  >
      <Link to="/report">  <button class="btn-group">التقارير</button></Link>
      <Link to="/Settings">   <button class="btn-group" >الاعدادات</button></Link>



    </div>
  )
}
