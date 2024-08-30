import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Group.css';
import CreateGroup from './components/CreateGroup';
import UpdateGroup from './components/UpdateGroup';

const Group = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (!userExists) {
      navigate('/login');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

  const [data, setData] = useState([]);
  const [data_count, setData_count] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/home/group/`);
      setData(response.data.group);
      setData_count(response.data.group_count);
    } catch (error) {
      setError(error.response?.data?.message || " الصفحة غير موجوده");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        <div className='details_head_h4'>     المنتجات المجمعة  </div>
      </div>
      <div className="customer-list">
        <div className="filters">
          <div style={{ width: '49%', float: 'left', marginRight: '1%' }}> <CreateGroup fetchData={fetchData} />  </div>
          <div style={{ width: '50%', float: 'right' }}> <samp style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>           عدد المنتجات المجمعة  : {data_count}   </samp>   </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>  </th> <th>   </th> <th>  العنوان  </th>  <th>السعر</th> <th style={{ width: '50px' }} > </th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>

                <td style={{ width: '150px' }} >
                  {item?.big_image &&
                    <img style={{ width: '150px' }}
                      src={`${Config.baseURL}${item?.big_image}`}
                      alt={item.title} />}
                </td>

                <td style={{ width: '47px' }}>
                  {item?.image1 &&
                    <img style={{ width: '47px' }}
                      src={`${Config.baseURL}${item?.image1}`}
                      alt={item.title} />}

                  {item?.image2 &&
                    <img style={{ width: '47px' }}
                      src={`${Config.baseURL}${item?.image2}`}
                      alt={item.title} />}

                  {item?.image3 &&
                    <img style={{ width: '47px' }}
                      src={`${Config.baseURL}${item?.image3}`}
                      alt={item.title} />}
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td style={{ width: '50px' }} >   <UpdateGroup item={item} fetchData={fetchData} /></td>

              </tr>
            ))}
          </tbody>
        </table> </div>  </div>

  );
};

export default Group;
