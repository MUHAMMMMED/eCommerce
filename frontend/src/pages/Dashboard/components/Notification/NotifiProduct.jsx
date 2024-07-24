import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../components/Authentication/AxiosInstance';
import Config from '../../../../components/config';
import Notification from './components/Notification';

const NotifiProduct = () => {
  const [products, setProducts] = useState([]);

const fetchPackage = async () => {
    try {
        const response = await AxiosInstance.get(`${Config.baseURL}/api/products/notification_products/`);
        setProducts(response.data);
     } catch (error) {
        console.error("There was an error fetching the products data!", error);
    }
};

useEffect(() => {
  fetchPackage();
}, []);

  return (
 <>
 {products.map(item => (
  <>
 <Notification Id={item.id}link={'product_update'}   name={item.name}  stock_no={item.stock_no} key={item.id} /> 
  </>
 ))}
 </>
  );
};
   

export default NotifiProduct;
 

 