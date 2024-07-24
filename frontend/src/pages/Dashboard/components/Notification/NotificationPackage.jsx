import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import Config from '../../../../components/config';
import NotificationPack from './components/NotificationPack';

const NotificationPackage = () => {
  const [packages, setPackages]  = useState([]);

const fetchPackage = async () => {
    try {
        const response = await AxiosInstance.get(`${Config.baseURL}/api/accounting/notification_packages/`);
        setPackages(response.data);
     } catch (error) {
        console.error("There was an error fetching the package data!", error);
    }
};

useEffect(() => {
  fetchPackage();
}, []);

  return (
 <>
 {packages.map(item => (
  <>
 <NotificationPack link={'package'}  name={item?.name}  stock_no={item?.quantity} key={item.id} /> 

 
  </>
 ))}
 </>
  );
};

export default NotificationPackage;
 

 