 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../../components/Loading/ErrorPage';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';

import Footer from '../../components/Footer/Footer';
import './Category.css';
import Filter from './components/Filter/Filter';

export default function Category() {
  
    const { id:CategoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  

    const fetchData= async () => {
        try {
            if (!CategoryId) return;  
            const response = await axios.get(`${Config.baseURL}/api/products/category/${CategoryId}/`);
            setCategory(response.data.categories);
 
        } catch (error) { 
            setError(error.response?.data?.message || " الصفحة غير موجوده");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      fetchData();
    }, [CategoryId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }
 
  return (
    <>
 {category.top_slider_web && 
<div className="BG_web" ><img src={`${Config.baseURL}${category?.top_slider_web}`}  style={{width:'100%'}}/></div>}
{category.top_slider_mobile && 
<div className="BG_mobile">  <img src={`${Config.baseURL}${category?.top_slider_mobile}`}  style={{width:'100%'}}/> </div>}
<Filter categoryId={CategoryId} />
<Footer/>

</>
)
}
