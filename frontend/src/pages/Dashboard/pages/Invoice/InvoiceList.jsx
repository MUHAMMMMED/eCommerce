import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import Config from '../../../../components/config';
// import './InvoiceList.css';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Invoice from './components/Invoice/Invoice';

const InvoiceList = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
            navigate('/login');
        }
    }, [navigate]);

    const [data, setData] = useState([]);
    const [count, setCount] = useState('');
    const [createdAtStart, setCreatedAtStart] = useState('');
    const [createdAtEnd, setCreatedAtEnd] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async (params = {}) => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/invoice/`, { params });
            setData(response.data.orders);
            setCount(response.data.orders_count);
 
        } catch (error) {
            setError(error.response?.data?.message || " الصفحة غير موجوده");
          } finally {
            setLoading(false);
          }
        };

    const handleSearch = () => {
        const params = {};
        if (createdAtStart) params.createdAtStart = createdAtStart;
        if (createdAtEnd) params.createdAtEnd = createdAtEnd;
        if (invoiceNumber) params.invoice_number = invoiceNumber;

        fetchBalance(params);
    };
    if (loading) {
        return <Loading />;
      }
      
      if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
      }

    return (
        <div className='container_order_details'>
            <div className='details_head'>
                <Link to="/Settings">
                    <div className='details_head_ArrowBack'>
                        <IoIosArrowBack />
                    </div>
                </Link>
            </div>
            <div className='details_head'>
                <div className='details_head_h4'> الفواتير</div>
            </div>
            <div className="customer-list">
                <div className="filters">
                    <input
                        style={{ height: '44px' }}
                        type="text"
                        placeholder="رقم الفاتورة"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                    <input
                        style={{ height: '44px' }}
                        type="date"
                        placeholder="تاريخ البدء"
                        value={createdAtStart}
                        onChange={(e) => setCreatedAtStart(e.target.value)}
                    />
                    <input
                        style={{ height: '44px' }}
                        type="date"
                        placeholder="تاريخ الانتهاء"
                        value={createdAtEnd}
                        onChange={(e) => setCreatedAtEnd(e.target.value)}
                    />
                    <button style={{ height: '44px' }} onClick={handleSearch}>بحث</button>
                </div>
                <div className="filters">
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}>
                    </div>
                    <div style={{ width: '50%', float: 'right' }}>
                        <span style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>
                         عدد الفواتير ({count})
                        </span>
                    </div>
                </div>

                {data.map(order => (
                    <Invoice key={order.id} order={order} />
                ))}

            </div>
        </div>
    );
};

export default InvoiceList;
 