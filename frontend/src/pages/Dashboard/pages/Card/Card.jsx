import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Card.css';
import CreateCard from './components/CreateCard';
import UpdateCard from './components/UpdateCard';

const Card = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect
  
 
    const [data, setData] = useState([]);
    const [count, setCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const fetchData = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/home/card/` );
            setData(response.data.card);
            setCount(response.data.card_count);
   
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
        <div className='details_head_h4'>  الكروت </div>
        </div>
        <div className="customer-list">
        <div className="filters">
        <div style={{width:'49%' ,float:'left' ,marginRight:'1%'}}> <CreateCard fetchData={fetchData}/>  </div>
        <div style={{width:'50%' ,float:'right'}}> <samp style={{width:'90%' ,float:'right',textAlign:'left' ,fontSize:'20px',marginTop:'5px',fontWeight:'600'}}>   عدد الكروت  : {count}   </samp>   </div>
        </div>
        <table>
        <thead>
        <tr>
      <th> </th>   <th> الاسم</th>  <th>   الرابط</th> 
    
       <th style={{width:'50px'}} > </th>
          </tr> </thead>
                <tbody>
                    {data.map(item => (
                     <tr key={item.id}>
                      <td style={{width:'300px'}}   >
                      {item?.image&&
                     <img style={{width:'300px'}} 
                       src={`${Config.baseURL}${item?.image}`}
                        alt={item.name}/> }  </td>

                        <td > {item.title} </td>
                        <td > {item.link} </td> 
                         <td style={{width:'50px'}} >   <UpdateCard item={item} fetchData={fetchData}/></td>
                             
                        </tr>
                    ))}
                </tbody>
            </table> </div>  </div>
           
    );
};

export default Card ;
 