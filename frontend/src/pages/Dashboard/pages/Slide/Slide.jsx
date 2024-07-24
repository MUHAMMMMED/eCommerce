import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Slide.css';
import CreateSlide from './components/CreateSlide';
import UpdateSlide from './components/UpdateSlide';

const Slide = () => {
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
            const response = await AxiosInstance.get(`${Config.baseURL}/api/home/slide/` );
            setData(response.data.slide);
            setCount(response.data.slide_count);
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
        <div className='details_head_h4'>     عرض شرائح الصفحه الرئسية  </div>
        </div>
        <div className="customer-list">
        <div className="filters">
        <div style={{width:'49%' ,float:'left' ,marginRight:'1%'}}> <CreateSlide fetchData={fetchData}/>  </div>
        <div style={{width:'50%' ,float:'right'}}> <samp style={{width:'90%' ,float:'right',textAlign:'left' ,fontSize:'20px',marginTop:'5px',fontWeight:'600'}}>   عدد الشرائح  : {count}   </samp>   </div>
        </div>
        <table>
        <thead>
        <tr>
      <th>  الويب</th>   <th>   الموبيل</th> 
    
       <th style={{width:'50px'}} > </th>
          </tr> </thead>
                <tbody>
                    {data.map(item => (
                     <tr key={item.id}>
                      <td style={{width:'700px'}}   >
                      {item?.top_slider_web&&
                     <img style={{width:'700px'}} 
                       src={`${Config.baseURL}${item?.top_slider_web}`}
                        alt={item.name}/> }  </td>

                      <td style={{width:'200px'}}>
                      {item?.top_slider_mobile&&
                        <img style={{width:'200px'}} 
                       src={`${Config.baseURL}${item?.top_slider_mobile}`}
                        alt={item.name}/> } </td>
                        
                         <td style={{width:'50px'}} >   <UpdateSlide item={item} fetchData={fetchData}/></td>
                             
                        </tr>
                    ))}
                </tbody>
            </table> </div>  </div>
           
    );
};

export default Slide;
 