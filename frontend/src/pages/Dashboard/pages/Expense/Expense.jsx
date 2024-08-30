import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Expense.css';
import CreateExpense from './components/CreateExpense';
import UpdateExpense from './components/UpdateExpense';

const Expense = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
            navigate('/login');
        }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const [expense, setExpense] = useState([]);
    const [expense_count, setExpense_count] = useState('');
    const [total_amount, setTotal_amount] = useState('');
    const [createdAtStart, setCreatedAtStart] = useState('');
    const [createdAtEnd, setCreatedAtEnd] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchExpense();
    }, []);

    const fetchExpense = async (params = {}) => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/accounting/expense/`, { params });
            setExpense(response.data.expenses);
            setExpense_count(response.data.expense_count);
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

        fetchExpense(params);
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
                <div className='details_head_h4'> ({expense_count})  المصاريف  </div>
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
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}>  <CreateExpense fetchExpense={fetchExpense} /></div>

                    <div style={{ width: '50%', float: 'right' }}> <samp style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>  اجمالي المصروفات  : {total_amount} </samp>   </div>
                </div>
                <table>

                    <thead>
                        <tr>
                            <th>تاريخ الانشاء</th>

                            <th>تفاصيل</th>
                            <th>المبلغ</th>
                            <th> </th>

                        </tr>
                    </thead>
                    <tbody>
                        {expense.map(item => (
                            <tr key={item.id}>
                                <td>{item.expense_date}</td>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>


                                <td style={{ width: '180px' }}><UpdateExpense item={item} fetchExpense={fetchExpense} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>  </div>
    );
};

export default Expense;
