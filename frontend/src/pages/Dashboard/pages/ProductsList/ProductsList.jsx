import React, { useEffect, useState } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import Config from '../../../../components/config';

import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import './ProductsList.css';
import Delete from './components/form/Delete';
const ProductsList = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect
  
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/products/product_list_dash/`, {
                params: { category }
            });
            setProducts(response.data.products);
            setProductCount(response.data.product_count);
        } catch (error) {
            setError(error.response?.data?.message || " الصفحة غير موجوده");
          } finally {
            setLoading(false);
          }
        };


    const fetchCategories = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/products/categories_list/`);
            setCategories(response.data.categories);
        } catch (error) {
            console.error("There was an error fetching the categories data!", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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
 <Link to="/Settings"><div className='details_head_ArrowBack'><IoIosArrowBack /></div></Link>
</div>
 <div className='details_head'><div className='details_head_h4' > ({productCount}) المنتجات</div></div>
           
 <div className="customer-list">
 <div className="filters">
<div style={{float:'right', marginRight: '1%' , width: '70%' }}>

<Link to="/product_create"> <button>اضافه</button> </Link></div>            
 <div className="product-filter" style={{ width: '40%', float: 'right',padding:'0' }}>
 
<label htmlFor="category-select">فلتر</label>
<select id="category-select" onChange={handleCategoryChange}>
<option value="">جميع الفئات</option>                              
{categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
</select> 
</div>  
                           
 </div>
               
 <table>
 <thead>
<tr><th>صوره</th>
<th>الاسم</th>
<th>تاريخ نهاية العرض</th>
<th style={{ width: '100px' }}>الكميه</th>
<th>الحاله</th>
<th></th>
 </tr>
 </thead>
 <tbody>
 {products.map(item => (
 <tr key={item.id}>
 <td style={{ width: '50px' }}>
 <img style={{ width: '50px' }} src={`${Config.baseURL}${item.image_side_one}`}alt={item.name} /></td>
 <td>{item.name}</td>
 <td  style={{ width: '130px' }}>{item.expiration_date_offer}</td>
<td style={{ width: '50px' }}>{item.stock_no}</td>
<td  style={{ width: '100px' }}> {item.is_active ? 'تم النشر' : 'مخفي'} </td>
<td style={{ width: '120px' }}>
    
<Link to={`/product_update/${item.id}`}>  
 <div style={{ float: 'left', width: '40px', marginRight: '17px' }} >
<span className='onLine-icon'><GrUpdate /></span>  </div></Link>
  
<Delete item={item} fetchData={fetchProducts}/>
 </td>
 </tr>
 ))}
 </tbody> </table></div> </div>
       
    );
};

export default ProductsList;
