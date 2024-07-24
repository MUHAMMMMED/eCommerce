import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Note.css';
import Delete from './components/Form/Delete';

const Note = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect


    const [data, setData] = useState([]); // Initialize Data as an empty array
    const [count, setCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/cart/note-list/`);
            if (response.data && Array.isArray(response.data.notes)) {
                setData(response.data.notes);
                setCount(response.data.notes_count);
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
                <div className='details_head_h4'>  الملاحظات </div>
            </div>

            <div className="customer-list">
                <div className="filters">
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}>
                     </div>
                    <div style={{ width: '50%', float: 'right' }}>
                        <samp style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>
                            عدد الملاحظات  ({count})
                        </samp>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th  style={{textAlign:'right'}}> الملاحظة</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td style={{textAlign:'right'}}>{item?.note}</td>
                                <td style={{ width: '50px' }}>
                                <Delete itemId={item.id} fetchData={fetchData}  />  </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Note;
