
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import { RiShoppingBagLine } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from '../Authentication/AxiosInstance';
import OfferMessage from '../OfferMessage/OfferMessage';
import { useCart } from '../Provider/CartProvider/CartProvider';
import Config from '../config';
import './Header.css';
import SideNav from './components/SideNav/SideNav';

export default function Header() {
  const { cartCount } = useCart();
  const [info, setInfo] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    axios.get(`${Config.baseURL}/api/home/info-list/`)
      .then(response => {
        setInfo(response.data);
      })

  }, []);


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const refresh = JSON.parse(localStorage.getItem('refresh_token'));

  const handleLogout = async () => {
    try {
      const res = await AxiosInstance.post('/logout/', { refresh_token: refresh });
      if (res.status === 204) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user'); // Remove user data
        AxiosInstance.defaults.headers.common['Authorization'] = ''; // Clear token from AxiosInstance
        navigate('/login');
        toast.warn('Logout successful');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <>
      <OfferMessage info={info} />
      <div className='web'>
        <header className="header">
          <div className="header-right">
            {info?.logo &&
              <div className="logo">
                <Link to="/">
                  <img src={`${Config.baseURL}${info?.logo}`} alt="Logo" />

                </Link>
              </div>}

            <div className="nav-text">
              <nav className="nav-menu">
                <ul>
                  <li><Link to="/">الرئيسية</Link></li>
                  <li><Link to="/All_Products">المنتجات</Link></li>
                  <li><Link to="/Categories">الفئات</Link></li>
                  <li><Link to="/offrs">العروض</Link></li>
                  <li><Link to="/order_tracking">تتبع طلبك</Link></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="header-left">
            {user ? (
              <>
                <Link onClick={handleLogout}>   <span className='cart-togg'><CiLogout /></span> </Link>
                <Link to="/dashboard">  <span className='cart-togg'><TbLayoutDashboard /></span> </Link>
              </>

            ) : (
              <>
                <Link to="/cart"> <div className="cart-icon">
                  <span className='ShoppingBag'><RiShoppingBagLine /> </span>
                  {!cartCount ? (<></>) : (<span>{cartCount}</span>)}</div> </Link>
                <Link to="/login"> <span className='cart-togg'><HiOutlineUser /></span>  </Link>
              </>)}
          </div> </header> </div>

      <div className='mbile'>
        <header className="header">
          <div className="header-right">
            <div className="logo">
              <Link to="/"> <img src={`${Config.baseURL}${info?.logo}`} alt="Logo" />   </Link>
            </div></div>
          <div className="header-left">
            <Link to="/cart">
              <div className="cart-icon">
                <span className='ShoppingBag'><RiShoppingBagLine /> </span>
                {!cartCount ? (<></>) : (<span>{cartCount}</span>)}
              </div> </Link>
            <span className='cart-togg' onClick={toggleSidebar}><AiOutlineMenu /></span>
          </div>
          <SideNav showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        </header></div>

    </>
  );
}

