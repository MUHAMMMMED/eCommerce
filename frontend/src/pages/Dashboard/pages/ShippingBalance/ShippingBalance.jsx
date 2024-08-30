import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './ShippingBalance.css';
import CreateShippingBalance from './components/CreateShippingBalance';
import UpdateShippingBalance from './components/UpdateShippingBalance';

const ShippingBalance = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
            navigate('/login');
        }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect




    const [data, setData] = useState([]);
    const [count, setCount] = useState('');
    const [total_amount, setTotal_amount] = useState('');
    const [company, setCompany] = useState([]);
    const [createdAtStart, setCreatedAtStart] = useState('');
    const [createdAtEnd, setCreatedAtEnd] = useState('');
    const [shippingId, setShippingId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchBalance();
        fetchCompany();
    }, []);

    const fetchBalance = async (params = {}) => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping_balance/`, { params });
            setData(response.data.shipping_balance);
            setCount(response.data.balance_count);
            setTotal_amount(response.data.total_amount);

        } catch (error) {
            setError(error.response?.data?.message || " الصفحة غير موجوده");
        } finally {
            setLoading(false);
        }
    };

    const fetchCompany = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping_company_list/`);
            setCompany(response.data.company);
        } catch (error) {
            console.error("Error fetching the company data!", error);
        }
    };

    const handleSearch = () => {
        const params = {};
        if (createdAtStart) params.createdAtStart = createdAtStart;
        if (createdAtEnd) params.createdAtEnd = createdAtEnd;
        if (shippingId) params.shipping = shippingId;

        fetchBalance(params);
    };

    const handleCompanyChange = (e) => {
        setShippingId(e.target.value);
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
                <div className='details_head_h4' > ({count}) رصيد شركات الشحن</div>
            </div>
            <div className="customer-list">
                <div className="filters"  >

                    <input
                        style={{ height: '44px' }}
                        type="date"
                        placeholder="Created At Start"
                        value={createdAtStart}
                        onChange={(e) => setCreatedAtStart(e.target.value)}
                    />

                    <input
                        style={{ height: '44px' }}
                        type="date"
                        placeholder="Created At End"
                        value={createdAtEnd}
                        onChange={(e) => setCreatedAtEnd(e.target.value)}
                    />

                    <select id="shipping-select" style={{ width: '20%', height: '44px', border: '1px solid #9081f6' }} onChange={handleCompanyChange} value={shippingId}>
                        <option value="">شركات الشحن</option>
                        {company.map((com) => (
                            <option key={com.id} value={com.id}>{com.name}</option>
                        ))}
                    </select>

                    <button style={{ height: '44px' }} onClick={handleSearch}>بحث</button>
                </div>
                <div className="filters">
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}>
                        <CreateShippingBalance fetchBalance={fetchBalance} />
                    </div>
                    <div style={{ width: '50%', float: 'right' }}>
                        <span style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>
                            اجمالي الرصيد : {total_amount}
                        </span>
                    </div>
                </div>
                <table> <thead>
                    <tr>
                        <th>تاريخ</th>
                        <th>اسم الشركة</th>
                        <th>رصيد أول المدة</th>
                        <th>رصيد مضاف</th>
                        <th>رصيد آخر المدة</th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.shipping.name}</td>
                                <td>{item.initial_balance}</td>
                                <td>{item.added_amount}</td>
                                <td>{item.final_balance}</td>
                                <td style={{ width: '180px' }}>
                                    <UpdateShippingBalance item={item} fetchBalance={fetchBalance} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShippingBalance;
