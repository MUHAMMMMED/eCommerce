

import axios from 'axios'; // Import axios properly
import { useEffect, useState } from 'react';
import Config from '../../../../components/config';

export default function FollowUpPayment({ order, cart }) {
  const [finalTotal, setFinalTotal] = useState(0);

  // Calculate final total when order or cart changes
  useEffect(() => {
    const total = Number(cart?.cart_data?.total) || 0;
    const taxRate = Number(order?.tax) || 0;
    const shipping = Number(order?.shipping) || 0;
    const taxAmount = (total * taxRate) / 100;
    const calculatedFinalTotal = total + taxAmount + shipping;
    setFinalTotal(calculatedFinalTotal);
  }, [order, cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${Config.baseURL}/api/payment/create-checkout-session/`, { items: [{ id: order.id, finalTotal }] }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true  // Ensure withCredentials is set correctly
      });

      const data = response.data;
      if (data.url) {
        window.location.href = data.url;  // Redirect to payment URL if available
      } else {
        console.error('Error:', data.error);  // Handle errors from API response
      }
    } catch (error) {
      console.error('Error:', error);  // Handle network errors
    }
  };

  return (
    <>
      {order && (
        <div className="grid-a" onClick={handleSubmit}>
          <div className="Btn fw-bold" style={{ width: '93%', textAlign: 'left', marginTop: '20px', float: 'right' }}>
            ريال {finalTotal} <div>متابعة الدفع</div>
          </div>
        </div>
      )}
    </>
  );
}


