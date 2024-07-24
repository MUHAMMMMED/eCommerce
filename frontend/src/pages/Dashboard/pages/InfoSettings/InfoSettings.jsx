import React, { useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import './InfoSettings.css';
import Info from './components/Info/Info';
export default function InfoSettings() {
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (!userExists) {
      navigate('/login');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

  return (
    <div className='container_order_details'>
      <div className='details_head'>
        <Link to="/Settings">
          <div className='details_head_ArrowBack'><IoIosArrowBack /></div>
        </Link>
      </div>
      
      <div className='details_head'>
        <div className='details_head_h4'> </div>
      </div>
 <div className='InfoSet'>
<Info/>
  </div></div>

  );
} 