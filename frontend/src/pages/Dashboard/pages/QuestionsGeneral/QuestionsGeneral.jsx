import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './QuestionsGeneral.css';
import CreateQuestionsGeneral from './components/Form/CreateQuestionsGeneral';
import UpdateQuestionsGeneral from './components/Form/UpdateQuestionsGeneral';

const QuestionsGeneral = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
            navigate('/login');
        }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const [data, setData] = useState([]); // Initialize dealData as an empty array
    const [Count, setCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/home/questions/`);
            if (response.data && Array.isArray(response.data.ques)) {
                setData(response.data.ques);
                setCount(response.data.ques_count);
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
                <div className='details_head_h4'>  الأسئلة المتكررة</div>
            </div>

            <div className="customer-list">
                <div className="filters">
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}>
                        <CreateQuestionsGeneral fetchData={fetchData} />
                    </div>
                    <div style={{ width: '50%', float: 'right' }}>
                        <samp style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>
                            عدد الاسئلة({Count})</samp>

                    </div></div>
                <table>
                    <thead>
                        <tr>
                            <th>السؤال</th>
                            <th>الاجابه</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.question}</td>
                                <td>{item.answer}</td>
                                <td style={{ width: '106px' }}>
                                    <UpdateQuestionsGeneral item={item} fetchData={fetchData} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuestionsGeneral;
