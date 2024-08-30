import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Rate.css';
import CreateRate from './components/Form/CreateRate';
import UpdateRate from './components/Form/UpdateRate';

const Rate = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
            navigate('/login');
        }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const [rate, setRate] = useState([]); // Initialize dealData as an empty array
    const [RateCount, setRateCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/products/rate/`);
            if (response.data && Array.isArray(response.data.rate)) {
                setRate(response.data.rate);
                setRateCount(response.data.rate_count);


            } else {
                setError(error.response?.data?.message || " الصفحة غير موجوده");
            }
        } catch (error) {
            setError(error.response?.data?.message || " الصفحة غير موجوده");
        } finally {
            setLoading(false);
        }
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
                    <div className='details_head_ArrowBack'><IoIosArrowBack /></div>
                </Link>
            </div>
            <div className='details_head'>
                <div className='details_head_h4'>  التقيمات </div>
            </div>

            <div className="customer-list">
                <div className="filters">
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}>
                        <CreateRate fetchData={fetchData} />
                    </div>
                    <div style={{ width: '50%', float: 'right' }}>
                        <samp style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>
                            عدد التقيمات ({RateCount})
                        </samp>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>

                            <th>اسم العميل  </th>
                            <th> التقييم</th>
                            <th>   عدد النجوم</th>
                            <th> اسم المنتج</th>
                            <th>  </th>

                        </tr>
                    </thead>
                    <tbody>
                        {rate.map(item => (
                            <tr key={item.id}>
                                {/* <td>{item.created}</td> */}

                                <td>{item.name}</td>
                                <td>{item.message}</td>
                                <td>
                                    {Array.from({ length: item.rate_number }, (_, index) => (
                                        <FaStar key={index} style={{ color: '#ffba00' }} />))}

                                </td>
                                <td>{item.product.name}</td>

                                <td style={{ width: '105px' }}><UpdateRate item={item} fetchData={fetchData} /> </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Rate;
