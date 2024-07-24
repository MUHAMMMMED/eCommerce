import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Package.css';
import CreatePackage from './components/CreatePackage';
import UpdatePackage from './components/UpdatePackage';

const Package = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect
  
    const [packageData, setPackageData] = useState([]);
    const [packageCount, setPackageCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        fetchPackage();
    }, []);

    const fetchPackage = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/accounting/package/`);
            setPackageData(response.data.package);
            setPackageCount(response.data.package_count);
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
        <div className='details_head_h4'>  التغليف  </div>
        </div> 

        <div className="customer-list">
     
            <div className="filters">
                <div style={{width:'49%', float:'left', marginRight:'1%'}}><CreatePackage fetchPackage={fetchPackage} />
            </div>
                <div style={{width:'50%', float:'right'}}>
                    <samp style={{width:'90%', float:'right', textAlign:'left', fontSize:'20px', marginTop:'5px', fontWeight:'600'}}>
                        اجمالي كميه المخزون: ({packageCount})
                    </samp>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                    <th></th>
                        <th>الاسم</th>
                        <th>تفاصيل</th>
                        <th>الكميه</th>
                        <th></th>

                     </tr>
                </thead>
                <tbody>
                    {packageData.map(item => (
                        <tr key={item.id}>
                            <td className="Package_img">
                            {item?.image&&  
                             <img className="Package_img"  src={`${Config.baseURL}${item?.image}`} alt={item.name}/>} 
                            </td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td style={{width:'180px'}}><UpdatePackage item={item} fetchPackage={fetchPackage}/></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        </div>

    );
};

export default Package;
 