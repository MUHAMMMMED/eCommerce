import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Coupon.css';
import CreatePackage from './components/CreateCoupon';
import UpdateCoupon from './components/UpdateCoupon';

const Coupon = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const [couponData, setCouponData] = useState([]);
    const [couponCount, setCouponCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        fetchCoupon();
    }, []);

    const fetchCoupon = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/products/coupon/`);
            setCouponData(response.data.coupon);
            setCouponCount(response.data.coupon_count);
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
        
        <div className='details_head'>  <Link to="/Settings"> <div className='details_head_ArrowBack'><IoIosArrowBack /></div></Link> </div>
         
        <div className='details_head'>
        <div className='details_head_h4'>  كود الخصم  </div>
        </div> 

        <div className="customer-list">
     
            <div className="filters">
                <div style={{width:'49%', float:'left', marginRight:'1%'}}><CreatePackage fetchCoupon={fetchCoupon} />
            </div>
                <div style={{width:'50%', float:'right'}}>
                    <samp style={{width:'90%', float:'right', textAlign:'left', fontSize:'20px', marginTop:'5px', fontWeight:'600'}}>
                        عدد كود الخصم ({couponCount})
                    </samp>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                
                        <th>كود الخصم</th>
                        <th>الخصم</th>
                        <th>عدد مرات الاستخدام</th>
                        <th> تاريخ انتهاء الكود</th>
                        <th></th>

                     </tr>
                </thead>
                <tbody>
                    {couponData.map(item => (
                        <tr key={item.id}>
                      
                            <td>{item.code}</td>
                            <td>{item.discount} ٪</td>
                            <td>{item.coupon_usage}</td>
                            <td>{item.expiryDate}</td>
                            <td style={{width:'180px'}}><UpdateCoupon item={item} fetchCoupon={fetchCoupon}/></td>

        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        </div>

    );
};

export default Coupon;
 