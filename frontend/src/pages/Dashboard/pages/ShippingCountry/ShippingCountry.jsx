import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './ShippingCountry.css';
import CreateCountry from './components/CreateCountry';
import UpdateCountry from './components/UpdateCountry.';

const ShippingCountry = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
          navigate('/login');
        }
      }, [navigate]); // Ensure navigate is added as a dependency for useEffect
    

    const [countryData, setCountryData] = useState([]);
    const [countryCount, setCountryCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        fetchCountry();
    }, []);

    const fetchCountry = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping_country_list/`);
            setCountryData(response.data.country);
            setCountryCount(response.data.country_count);
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
        <div className='details_head_h4'> الدول المتاحه للشحن </div>
        </div> 

        <div className="customer-list">
     
            <div className="filters">
                <div style={{width:'49%', float:'left', marginRight:'1%'}}><CreateCountry fetchCountry={fetchCountry} />
            </div>
                <div style={{width:'50%', float:'right'}}>
                    <samp style={{width:'90%', float:'right', textAlign:'left', fontSize:'20px', marginTop:'5px', fontWeight:'600'}}>
                         عدد الدول  ({countryCount})
                    </samp>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>  الاسم</th>
                        <th>الضريبه</th>
                        <th>   شركات الشحن</th>
                        <th></th>

                     </tr>
                </thead>
                <tbody>
                    {countryData.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.tax}</td>
                            <td>
                            {item.Shipping.map(Ship  => (
                            <>
                           <span  key={item.id}  style={{width:'100%',float:'right',marginTop:'5px'}}>{Ship.name} <br/></span>
                            </>
                            ))}
                            </td>
                            <td style={{width:'180px'}}><UpdateCountry item={item} fetchCountry={fetchCountry}/></td>
 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        </div>

    );
};

export default ShippingCountry;
 