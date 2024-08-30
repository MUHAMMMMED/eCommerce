import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './ShippingCompany.css';
import CreateCompany from './components/CreateCompany';
import UpdateCompany from './components/UpdateCompany';
const ShippingCompany = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userExists = localStorage.getItem('user');
        if (!userExists) {
            navigate('/login');
        }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect


    const [companyData, setCompanyData] = useState([]);
    const [companyCount, setCompanyeCount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping_company_list/`);
            setCompanyData(response.data.company);
            setCompanyeCount(response.data.company_count);
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
                <div className='details_head_h4'>  شركات الشحن  </div>
            </div>

            <div className="customer-list">

                <div className="filters">
                    <div style={{ width: '49%', float: 'left', marginRight: '1%' }}><CreateCompany fetchCompany={fetchCompany} />
                    </div>
                    <div style={{ width: '50%', float: 'right' }}>
                        <samp style={{ width: '90%', float: 'right', textAlign: 'left', fontSize: '20px', marginTop: '5px', fontWeight: '600' }}>
                            عدد شركات الشحن ({companyCount})
                        </samp>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>اسم الشركه</th>
                            <th>سعر الشحن</th>
                            <th>سعرالخصم</th>
                            <th>ايام العمل</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {companyData.map(item => (
                            <tr key={item.id}>
                                <td className="Package_img">
                                    {item?.image &&
                                        <img className="Package_img" src={`${Config.baseURL}${item?.image}`} alt={item.name} />}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.shipping_price}</td>
                                <td>{item.discount_price}</td>
                                <td>{item.work_days}</td>

                                <td style={{ width: '180px' }}><UpdateCompany item={item} fetchCompany={fetchCompany} /></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>        </div>

    );
};

export default ShippingCompany;
