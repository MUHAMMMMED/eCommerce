import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config';
import './Report.css';
import ReportCarde from './components/ReportCard/ReportCarde';

export default function Report() {
  const navigate = useNavigate();
  useEffect(() => {
      const userExists = localStorage.getItem('user');
      if (!userExists) {
        navigate('/login');
      }
    }, [navigate]); // Ensure navigate is added as a dependency for useEffect
  

  const [dateFilter, setDateFilter] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
 

    // Function to fetch orders based on statusFilter and dateFilter Report
    const fetchReport = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/api/Report/`, {
          params: {
            date: dateFilter   
          }
        });
        setReport(response.data);  

      } catch (error) {
        setError(error.response?.data?.message || " الصفحة غير موجوده");
      } finally {
        setLoading(false);
      }
    };

  // Fetch orders on initial load and whenever statusFilter or dateFilter changes
  useEffect(() => {
 
    fetchReport();
  }, [ dateFilter]);
 

  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }
 
  return (
<>

<div className='container_order_details'>

<div className='details_head'>  <Link to="/dashboard"> <div className='details_head_ArrowBack'><IoIosArrowBack /></div></Link> </div>
 
<div className='details_head'>
<div className='details_head_h4'>     </div>
</div>

</div>




    <div className='container_orders_filter' style={{border:'none'}}>
      <div className='orders_filter' style={{border:'none'}}>
        <div className='orders_text'>التقارير </div>
        

        
        <div className='orders_select'>
          <div className='orders_select_label'>
            <label htmlFor="dateFilter">:حدد التاريخ</label>
          </div>
          <div className='orders_select_option'>
            <select id="dateFilter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ width: '100%', textAlign: 'center' }}>
             
              <option value="">الكل</option>
              <option value="today">اليوم</option>
              <option value="last3days">اخر 3 ايام</option>
              <option value="thisweek">هذا الأسبوع</option>
              <option value="thismonth">هذا الشهر</option>
              <option value="previousmonth">   الشهر السابق</option>
              <option value="last3months">اخر 3 أشهر</option>
              <option value="last6months">اخر 6 أشهر</option>
              <option value="thisyear">هذه السنة</option>
              <option value="lastyear">السنة السابقة</option>
            </select>
          </div>
        </div>
 </div>
<ReportCarde report={report}/>
 </div></>
  );
}












 