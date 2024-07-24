import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './CategoriesList.css';
import CreateCat from './components/CreateCat';
import UpdateCat from './components/UpdateCat';

const CategoriesList = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const [categories, setCategories] = useState([]);
    const [categories_count, setCategories_count] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const fetchcategories = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/products/categories_list/` );
            setCategories(response.data.categories);
            setCategories_count(response.data.categories_count);
   
          } catch (error) {
            setError(error.response?.data?.message || " الصفحة غير موجوده");
          } finally {
            setLoading(false);
          }
        };
    useEffect(() => {
        fetchcategories();
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
        <div className='details_head_h4'>     الفئات  </div>
        </div>
        <div className="customer-list">
        <div className="filters">
        <div style={{width:'49%' ,float:'left' ,marginRight:'1%'}}> <CreateCat fetchCategories={fetchcategories}/>  </div>
        <div style={{width:'50%' ,float:'right'}}> <samp style={{width:'90%' ,float:'right',textAlign:'left' ,fontSize:'20px',marginTop:'5px',fontWeight:'600'}}>  اجمالي الفئات  : {categories_count}   </samp>   </div>
        </div>
        <table>
        <thead>
        <tr>
        <th>الرئيسية </th> <th>  الويب</th> <th>   الموبيل</th>  <th>الاسم</th> <th style={{width:'50px'}} > </th>
          </tr>
                </thead>
                <tbody>
                    {categories.map(item => (
                     <tr key={item.id}>
                     <td style={{width:'50px'}} >
                     {item?.home_image&&
                     <img style={{width:'50px'}} 
                     src={`${Config.baseURL}${item?.home_image}`}
                     alt={item.name}/>}
                      </td>


                      <td style={{width:'200px'}} >
                      {item?.top_slider_web&&
                     <img style={{width:'200px'}} 
                       src={`${Config.baseURL}${item?.top_slider_web}`}
                        alt={item.name}/> }  </td>

                      <td style={{width:'50px'}}>
                      {item?.top_slider_mobile&&
                        <img style={{width:'50px'}} 
                       src={`${Config.baseURL}${item?.top_slider_mobile}`}
                        alt={item.name}/> } </td>
                            
                         <td>{item.name}</td>
                         <td style={{width:'50px'}} >   <UpdateCat item={item} fetchcategories={fetchcategories}/></td>
                             
                        </tr>
                    ))}
                </tbody>
            </table> </div>  </div>
           
    );
};

export default CategoriesList;
 