import axios from 'axios'; // Import axios for making HTTP requests
import React, { useState } from 'react';
import { RiCoupon3Line } from "react-icons/ri";
import Config from '../../../../components/config';

 
export default function ApplyCoupon({ total, setAppliedCoupon }) {
  const [couponCode, setCouponCode] = useState('');

  const applyCoupon = async () => {
    try {
      const response = await axios.post(`${Config.baseURL}/api/cart/coupon/apply/`, { code: couponCode, Total: total });

      if (response.data.success) {
        setAppliedCoupon(response.data.coupon);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error applying coupon:', error.message);
    }
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <div className="section-card">
      <div className="input-group">
        <button className="coupon-btn" type="button" onClick={applyCoupon}>
          <span className="px-1">إرسال</span>
          <span className="js-apply-coupon-icon"><RiCoupon3Line /></span>
        </button>
        <input
          type="text"
          className="form-control coupon-input-group"
          placeholder="أدخل كود الخصم"
          value={couponCode}
          onChange={handleCouponCodeChange}
        />
      </div>
    </div>
  );
}
