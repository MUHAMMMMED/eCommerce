
import axios from 'axios';
import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import Config from '../../../../components/config';
axios.defaults.withCredentials = true; // Ensuring cookies are sent with requests

const PurchaseFollowUp = ({ discountedPrice }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const orderResponse = await axios.post(`${Config.baseURL}/api/orders/orders/`, { total: discountedPrice });
      const cartResponse = await axios.post(`${Config.baseURL}/api/cart/update_total/`, { total: discountedPrice });

      console.log('Order successfully submitted:', orderResponse.data);
      console.log('Cart total successfully updated:', cartResponse.data);

      // Redirect to checkout page if both requests are successful
      if (orderResponse.status === 200 && cartResponse.status === 200) {
        navigate('/Checkout');
      } else {
        console.error('Error in submitting order or updating cart total');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="grid">
      <Link className="grid-a" to={'/All_Products'}>
        <div className="Btn-b">
          <FaArrowLeftLong />
          <div>العودة للتسوق</div>
        </div>
      </Link>
      <div className="grid-a" onClick={handleSubmit}>
        <div className="Btn fw-bold">
          ريال {discountedPrice}
          <div>متابعة الشراء</div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseFollowUp;
