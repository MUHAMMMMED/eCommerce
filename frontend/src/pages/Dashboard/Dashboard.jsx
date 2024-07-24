
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotifiProduct from './components/Notification/NotifiProduct';
import NotificationPackage from './components/Notification/NotificationPackage';
import Orders from './components/orders/Orders';
import './form.css';
import ButtonGroup from './pages/OrderDetails/components/ButtonGroup/ButtonGroup';
const Dashboard = () => {
  
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (!userExists) {
      // Navigate to login page if user does not exist
      navigate('/login');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

  return (
    <>
  <ButtonGroup />
  <NotifiProduct />
  <NotificationPackage />
  <Orders />
    </>
  );
};

export default Dashboard;