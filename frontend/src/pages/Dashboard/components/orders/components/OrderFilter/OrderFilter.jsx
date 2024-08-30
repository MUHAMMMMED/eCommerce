import React, { useEffect, useState } from 'react';
import { FaCartPlus } from "react-icons/fa6";
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../../../components/Loading/ErrorPage';
import Loading from '../../../../../../components/Loading/Loading';
import Config from '../../../../../../components/config';
import OrdersList from '../OrdersList/OrdersList';
import './OrderFilter.css';
import MobileList from './components/MobileList/MobileList';
import OrderStatus from './components/OrderStatus';

export default function OrderFilter() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('waiting');
  const [ordersCount, setOrdersCount] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch orders based on statusFilter and dateFilter
  const fetchOrders = async () => {
    try {

      const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/order_list/`, {
        params: {
          status: statusFilter,
          date: dateFilter  // Add date filter to params
        }
      });
      setOrders(response.data.orders); // Update state with fetched orders
      setOrdersCount(response.data.orders_count); // Update orders count
    } catch (error) {
      setError(error.response?.data?.message || " الصفحة غير موجوده");
    } finally {
      setLoading(false);
    }
  };



  // Function to fetch orders based on statusFilter and dateFilter Report
  const fetchReport = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/report/`, {
        params: {
          status: statusFilter,
          date: dateFilter  // Add date filter to params
        }
      });
      setReport(response.data);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch orders on initial load and whenever statusFilter or dateFilter changes
  useEffect(() => {
    fetchOrders();
    fetchReport();
  }, [statusFilter, dateFilter]);




  // Fetch orders on initial load and whenever statusFilter or dateFilter changes
  useEffect(() => {
    fetchOrders();
  }, [statusFilter, dateFilter]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  return (
    <>

      <OrderStatus report={report} />


      <div className='container_orders_filter'>
        <div className='orders_filter'>
          <div className='orders_text'>
            <samp className='orders_CartPlu' style={{ display: 'block', float: 'right' }}><FaCartPlus /></samp>
            <samp style={{ display: 'block' }}  >
              <span style={{ display: 'block', float: 'right' }}>الطلبات</span>
              <span style={{ color: '#9081f6', display: 'block', float: 'right' }}>({ordersCount})</span>
            </samp>   </div>




          <div className='orders_select'>
            <div className='orders_select_label'>
              <label htmlFor="dateFilter">:حدد التاريخ</label>
            </div>
            <div className='orders_select_option'>
              <select id="dateFilter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ width: '100%', textAlign: 'center' }}>

                <option value="">الكل</option>
                <option value="today">اليوم</option>
                <option value="last3days">اخر 3 ايام</option>
                <option value="thisweek">هذا الأسبوع</option>
                <option value="thismonth">هذا الشهر</option>
                <option value="last3months">اخر 3 أشهر</option>
                <option value="last6months">اخر 6 أشهر</option>
                <option value="thisyear">هذه السنة</option>
                <option value="lastyear">السنة السابقة</option>
              </select>
            </div>
          </div>

          <div className='orders_select'>
            <div className='orders_select_label'>
              <label htmlFor="status">:حدد الحاله</label>
            </div>
            <div className='orders_select_option'>
              <select id="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '100%', textAlign: 'center' }}>
                <option value="waiting">انتظار</option>
                <option value="processing">تجهيز الطلب</option>
                <option value="Shipping">تم الشحن</option>
                <option value="done">تم</option>
                <option value="cancel">الغاء</option>
              </select>
            </div>
          </div>



          <div className='filter_list_web'>
            <div className='orders_filter_list'>
              <div className='filter_list_text' style={{ width: '200px' }}> تاريخ الطلب </div>
              <div className='filter_list_text' style={{ width: '35%' }}> العميل </div>
              <div className='filter_list_text'> الدفع </div>
              <div className='filter_list_text'> المبلغ </div>
              <div className='filter_list_text'> حالة الطلب </div>
              <div className='filter_list_text'> عرض الطلب </div>
            </div>
          </div>
        </div>

        <div className='filter_list_web'>
          <div style={{ width: '100%', float: 'right' }}>
            {orders.map((order) => (
              <OrdersList key={order.id} order={order} fetchOrders={fetchOrders} />
            ))}
          </div>
        </div>

        {orders.map((order) => (
          <MobileList key={order.id} order={order} fetchOrders={fetchOrders} />
        ))}
      </div></>
  );
}












