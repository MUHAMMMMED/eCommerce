import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Purchase.css';
import CreatePurchase from './components/CreatePurchase';
import UpdatePurchase from './components/UpdatePurchase';

const Purchase = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
            navigate('/login');
        }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const [purchase, setPurchase] = useState([]);
    const [purchase_count, setPurchase_count] = useState('');
    const [total_amount, setTotal_amount] = useState('');
    const [createdAtStart, setCreatedAtStart] = useState('');
    const [createdAtEnd, setCreatedAtEnd] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchPurchase();
    }, []);

    const fetchPurchase = async (params = {}) => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/accounting/purchase/`, { params });
            setPurchase(response.data.purchase);
            setPurchase_count(response.data.purchase_count);
            setTotal_amount(response.data.total_amount);

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

        setPurchase(params);
    };
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }

    return (
        <div className='container_order_details'>

            <div className='details_head'>  <Link to="/Settings"> <div className='details_head_ArrowBack'><IoIosArrowBack /></div></Link> </div>

            <div className='details_head'>
                <div className='details_head_h4'> ({purchase_count})  المشتريات  </div>
            </div>
            <div className="customer-list">

                <div className="filters">

                    <input
                        type="date"
                        placeholder="Created At Start"
                        value={createdAtStart}
                        onChange={(e) => setCreatedAtStart(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Created At End"
                        value={createdAtEnd}
                        onChange={(e) => setCreatedAtEnd(e.target.value)}
                    />
                    <button onClick={handleSearch}>بحث</button>
                </div>

                <div className="filters">
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}>
                        <CreatePurchase fetchPurchase={fetchPurchase} />
                    </div>

                    <div style={{ width: '50%', float: 'right' }}> <samp style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>  اجمالي المشتريات  : {total_amount} </samp>   </div>
                </div>
                <table>

                    <thead>
                        <tr>
                            <th>تاريخ الانشاء</th>
                            <th>اسم المنتج</th>
                            <th>التكلفه</th>
                            <th>الكميه</th>
                            <th>المبلغ</th>
                            <th> </th>

                        </tr>
                    </thead>
                    <tbody>
                        {purchase.map(item => (
                            <tr key={item.id}>
                                <td>{item.purchase_date}</td>
                                <td>{item.product_name}</td>
                                <td>{item.cost}</td>
                                <td>{item.quantity}</td>
                                <td>{item.amount}</td>
                                <td style={{ width: '180px' }}><UpdatePurchase item={item} fetchPurchase={fetchPurchase} /></td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>        </div>

    );
};

export default Purchase;
