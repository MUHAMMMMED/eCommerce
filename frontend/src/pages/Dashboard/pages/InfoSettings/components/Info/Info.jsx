import React, { useEffect, useState } from 'react';
import { RiFileInfoLine } from "react-icons/ri";
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import ErrorPage from '../../../../../../components/Loading/ErrorPage';
import Loading from '../../../../../../components/Loading/Loading';
import Config from '../../../../../../components/config';
import CreateInfo from './components/CreateInfo';
import UpdateInfo from './components/UpdateInfo';

export default function Info() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const fetchData = async () => {
    try {
        const response = await AxiosInstance.get(`${Config.baseURL}/api/home/info/` );
        setInfo(response.data);

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
    <>
    
    <div className='Info_card'>
      <div className='Info_card_space'>
      <div className='Info_card_icon'><RiFileInfoLine /></div>
      <div className='Info_card_text'> المعلومات الاساسية</div>
      <div className='Info_card_but'>

      {info&&info.id ? (
      <UpdateInfo item={info}/>
      ) : (  
      <CreateInfo />
      )}
 </div> </div>  </div>

   </>
  )
}
