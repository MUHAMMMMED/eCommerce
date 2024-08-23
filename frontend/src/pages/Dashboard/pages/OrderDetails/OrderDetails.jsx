import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './OrderDetails.css';
import CartList from './components/CartList/CartList';
import CustomerInfo from './components/CustomerInfo/CustomerInfo';
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails';
import Select from './components/Select/Select';

export default function OrderDetails() {
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (!userExists) {
      navigate('/login');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const {id:orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
      const fetchOrder = async () => {
        try {
          if (!orderId) return;  
          const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/order-detail/${orderId}/`);
          setOrder(response.data);
 
        } catch (error) {
          setError(error.response?.data?.message || " الصفحة غير موجوده");
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrder();
    }, [orderId]);
  
    if (loading) {
      return <Loading />;
    }
    
    if (error) {
      return <ErrorPage head="Error Occurred" error={error} />;
    }
 
  return (
 <div className='container_order_details'>

<div className='details_head'> 
 <Link to="/dashboard"> <div className='details_head_ArrowBack'><IoIosArrowBack /></div></Link> </div>
<div className='details_head'>
<div className='details_head_h4'> 

<div className='orders_text'>
<samp style={{display:'block' }}  >
<span style={{  display:'block', float:'right'   }}> تفاصيل الطالب</span> 
<span style={{ color: '#9081f6',display:'block',float:'right' }}>({order.id})</span>
 </samp>   </div></div></div>

<CartList order={order}/>
<InvoiceDetails order={order}/>
<CustomerInfo order={order}/>
<Select order={order}/>
 
 </div>
   )
}
