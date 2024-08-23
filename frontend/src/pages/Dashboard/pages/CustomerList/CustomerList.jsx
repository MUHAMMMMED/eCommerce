
import React, { useEffect, useState } from 'react';
import { GrLocationPin } from "react-icons/gr";
import { IoIosArrowBack, IoMdLocate } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './CustomerList.css';

const CustomerList = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect

    const [customers, setCustomers] = useState([]);
    const [phone, setPhone] = useState('');
    const [createdAtStart, setCreatedAtStart] = useState('');
    const [createdAtEnd, setCreatedAtEnd] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [expandedCustomer, setExpandedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        fetchCustomers();
    }, [page]);

    const fetchCustomers = async (params = {}) => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/customers/`, { 
                params: { ...params, page, page_size: 10 } 
            });
            if (page === 1) {
                setCustomers(response.data.results);
            } else {
                setCustomers(prev => [...prev, ...response.data.results]);
            }
            setHasMore(response.data.next !== null);
        } catch (error) {
            setError(error.response?.data?.message || " الصفحة غير موجوده");
          } finally {
            setLoading(false);
          }
        };

    const handleSearch = () => {
        setPage(1);
        const params = {};
        if (phone) params.phone = phone;
        if (createdAtStart) params.createdAtStart = createdAtStart;
        if (createdAtEnd) params.createdAtEnd = createdAtEnd;
        fetchCustomers(params);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
        fetchCustomers({ phone, createdAtStart, createdAtEnd });
    };

    const toggleMoreInfo = (customerId) => {
        setExpandedCustomer(prev => (prev === customerId ? null : customerId));
    };
    // Format the date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
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
            <div className='details_head_h4'>  العملاء  </div>
            </div>
             
        <div className="customer-list" dir="rtl">
 
            <div className="filters">
                <input 
                    type="text" 
                    placeholder="الهاتف" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                />
                <input 
                    type="date" 
                    placeholder="Created At Start" 
                    value={createdAtStart} 
                    onChange={(e) => setCreatedAtStart(e.target.value)} 
                />
                <input 
                    type="date" 
                    placeholder="Created At End" 
                    value={createdAtEnd} 
                    onChange={(e) => setCreatedAtEnd(e.target.value)} 
                />
                <button onClick={handleSearch}>بحث</button>
            </div>
            <table>
                <thead>
                    <tr>
                    <th> تاريخ الانشاء </th>
                        <th>الاسم</th>
                        <th>الهاتف</th>
                        <th>البريد الالكتروني</th>
                        <th>الدولة</th>
                        <th>المحافظة</th>
                        <th> عدد مرات الشراء</th>
                        <th>المزيد</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                             <td>{formatDate(customer?.created_at)}</td>
                             <td>{customer.name}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.country?.name}</td>
                            <td>{customer.governorate}</td>
                            <td>{customer.purchase_count}</td>
                            <td>
                                <button className='customer-list_but' onClick={() => toggleMoreInfo(customer.id)}>المزيد</button>
                                {expandedCustomer === customer.id && (
                                    <div className="customer-modal show">
                                        <div className="customer-modal-content">
                                            <span className="close" style={{display:'block'}} onClick={() => toggleMoreInfo(null)}>&times;</span>
                                            <div className="modalContent" style={{display:'block'}}>

                                            <p className='modalContent-P' style={{display:'block'}} >
                                            <span className='modalContent-span' style={{display:'block'}}>   تاريخ الانشاء :   </span> 
                                            <span className='modalContent-span' style={{display:'block'}}>{formatDate(customer?.created_at)}</span>
                                            </p>

                                            <p className='modalContent-P' style={{display:'block'}}>
                                            <span className='modalContent-span' style={{display:'block'}}>  الاسم :</span>
                                            <span className='modalContent-span' style={{display:'block'}}>{customer.name}</span>
                                            </p>

                                            <p className='modalContent-P' style={{display:'block'}}>
                                            <span className='modalContent-span' style={{display:'block'}}> الدولة :</span>
                                            <span className='modalContent-span' style={{display:'block'}}>{customer.country?.name}</span>
                                            </p>

                                            <p className='modalContent-P' style={{display:'block'}}>
                                            <span className='modalContent-span' style={{display:'block'}}> المحافظة :</span>
                                            <span className='modalContent-span' style={{display:'block'}}>{customer.governorate}</span>
                                            </p>

                                            

                                            <p className='modalContent-P' style={{display:'block'}}>
                                            <span className='modalContent-span' style={{display:'block'}}>المدينه : </span>
                                            <span className='modalContent-span'style={{display:'block'}}>{customer.city}</span>
                                            </p>

                                            <p className='modalContent-P'style={{display:'block'}}>
                                            <spa className='modalContent-span'style={{display:'block'}}> الحي :</spa>
                                            <span className='modalContent-span'style={{display:'block'}}>{customer.neighborhood}</span>
                                            </p>

                                            <p className='modalContent-P'style={{display:'block'}}>
                                            <span className='modalContent-span'style={{display:'block'}}>الشارع : </span>
                                            <span className='modalContent-span'style={{display:'block'}}>{customer.street}</span>
                                            </p>
 

                                            <p className='modalContent-P'style={{display:'block'}}>
                                            <span className='modalContent-span'style={{display:'block'}}> العنوان التفصيلي :</span>
                                            <span className='modalContent-span'style={{display:'block'}}>{customer.shipping_address}</span>
                                            </p>

                                            <p className='modalContent-P'style={{display:'block'}}>
                                            <span className='modalContent-span' style={{textAlign:"right",color:'#9081f6',display:'block'}}><GrLocationPin /> :</span>
                                            <span className='modalContent-span'>{customer.IP_Address}</span>
                                            </p>
                                        

                                            <p className='modalContent-P'style={{display:'block'}}>
                                            <span className='modalContent-span' style={{textAlign:"right",color:'#9081f6',display:'block'}}> <IoMdLocate />  :</span>
                                            <span className='modalContent-span'style={{display:'block'}}> {customer?.IP_country?.dictionary?.name},{customer?.IP_country?.dictionary?.name}, {customer.IP_Region.dictionary.name} , {customer.IP_city.dictionary.name}</span>
                                            </p>
  
 

                                            </div>
                                            </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMore && <button onClick={handleLoadMore}>Load More</button>}
        </div>   </div>
    );
};

export default CustomerList;
