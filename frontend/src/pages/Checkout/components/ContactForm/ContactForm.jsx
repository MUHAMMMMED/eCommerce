

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import Config from '../../../../components/config';
import './ContactForm.css';
import './PhoneNumberForm.css';

const ContactForm = ({ fetchCart, order, customer }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!order?.id || !customer?.id) {
      navigate('/cart');
    }
  }, [order, customer, navigate]);

  const [shippingCountries, setShippingCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(customer?.country?.id || '');
  const [selectedCompany, setSelectedCompany] = useState(order?.Shipping || '');

  const [orderData, setOrderData] = useState({
    note: order?.note || '',
    Shipping: order?.Shipping || '',
  });

  const [customerData, setCustomerData] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    country: customer?.country?.id || '',
    governorate: customer?.governorate || '',
    city: customer?.city || '',
    neighborhood: customer?.neighborhood || '',
    street: customer?.street || '',
    shipping_address: customer?.shipping_address || '',
  });

  useEffect(() => {
    const fetchShippingCountries = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/api/orders/shipping-countries/`);
        setShippingCountries(response.data);
        fetchCart();
      } catch (error) {
        console.error('Error fetching shipping countries:', error);
      }
    };
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    const fetchShippingDetails = async () => {
      if (selectedCountry) {
        try {
          const response = await axios.get(`${Config.baseURL}/api/orders/shipping-company/${selectedCountry}/`);
          setCompanies(response.data?.Shipping || []);
          fetchCart();
        } catch (error) {
          console.error('Error fetching shipping details:', error);
        }
      }
    };
    fetchShippingDetails();
  }, [selectedCountry]);
  // , fetchCart
  useEffect(() => {
    const fetchShipping = async () => {
      if (selectedCompany) {
        try {
          await axios.get(`${Config.baseURL}/api/orders/shipping/${selectedCompany}`);
          fetchCart();
        } catch (error) {
          console.error('Error fetching shipping', error);
        }
      }
    };
    fetchShipping();
  }, [selectedCompany]);
  // , fetchCart
  useEffect(() => {
    const submitOrderData = async () => {
      if (order && order?.id) {
        try {
          const response = await axios.put(`${Config.baseURL}/api/orders/order/${order?.id}/`, orderData);
          console.log('Order successfully submitted:', response.data);
          fetchCart();
        } catch (error) {
          console.error('Error submitting order:', error);
        }
      }
    };
    submitOrderData();
  }, [orderData, order?.id]);
  // , fetchCart
  useEffect(() => {
    const submitCustomerData = async () => {
      if (customer && customer?.id) {
        try {
          const response = await axios.put(`${Config.baseURL}/api/orders/Customers/${customer?.id}/`, customerData);
          console.log('Customer successfully submitted:', response.data);
          fetchCart();
        } catch (error) {
          console.error('Error submitting customer data:', error);
        }
      }
    };
    submitCustomerData();
  }, [customerData, customer?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'country') {
      setSelectedCountry(value);
      fetchCart();
    }
  };

  const handlePhoneChange = (phone) => {
    setCustomerData((prevData) => ({ ...prevData, phone }));
  };

  if (!order) {
    return null;
  }

  return (
    <div className="container">
      <form>
        <h3>بيانات الشحن</h3>
    
        <input
          type="text"
          id="fname"
          name="name"
          className="input-text"
          style={{ width: '100%' }}
          placeholder="الاسم"
          value={customerData?.name}
          onChange={handleInputCustomerChange}
        />
        <PhoneInput
          country={'sa'}
          value={customerData.phone}
          onChange={handlePhoneChange}
          enableAreaCodes
          enableAreaCodeStretch
          inputProps={{ name: 'phone', required: true, autoFocus: true }}
          containerClass="phone-input-container"
          inputClass="phone-input"
        />
        <div className="grub">
          <select 
          className='select'
            id="country"
            name="country"
            value={customerData?.country}
            onChange={handleInputCustomerChange}
            style={{   borderRadius: '5px' }}
          >
            <option value="0">الدولة</option>
            {shippingCountries.map((country) => (
              <option key={country?.id} value={country?.id}>
                {country?.name}
              </option>
            ))}
          </select>
          <input
          
            type="text"
            id="governorate"
            name="governorate"
            className="input-text "
            placeholder="المحافظة"
            value={customerData?.governorate}
            onChange={handleInputCustomerChange}
          />
        </div>
        <div className="grup">
          <input
            type="text"
            id="city"
            name="city"
            className="input-text"
            placeholder="المدينة"
            value={customerData?.city}
            onChange={handleInputCustomerChange}
          />
          <input
            type="text"
            id="neighborhood"
            className="input-text"
            name="neighborhood"
            placeholder="الحي"
            value={customerData?.neighborhood}
            onChange={handleInputCustomerChange}
          />
        </div>
        <input
          type="text"
          id="street"
          className="input-text"
          name="street"
          placeholder="الشارع"
          value={customerData?.street}
          onChange={handleInputCustomerChange}
          style={{ width: '100%' }}
        />
        <input
          type="text"
          id="shortAddress"
          className="input-text"
          name="shipping_address"
          placeholder="العنوان المختصر"
          value={customerData?.shipping_address}
          onChange={handleInputCustomerChange}
          style={{ width: '100%' }}
        />
        <textarea
          id="subject"
          name="note"
          placeholder="ملاحظات"
          style={{ height: '100px', width: '100%' }}
          value={orderData?.note}
          onChange={handleInputChange}
        />
        {companies && (
          <div className="address-preview">
            <div className="address-sub-title">طريقة الشحن</div>
            <div className="Shipping-method">
              {companies.map((company) => (
                <div
                  key={company?.id}
                  className="Delivery-card"
                  onClick={() => {
                    setSelectedCompany(company?.id);
                    setOrderData((prevData) => ({ ...prevData, Shipping: company?.id }));
                  }}
                  style={{
                    border: selectedCompany === company?.id ? '2px solid #9081f6' : '1px solid black',
                    backgroundColor: selectedCompany === company?.id ? 'lightblue' : 'white',
                    padding: '10px',
                    margin: '5px',
                    cursor: 'pointer',
                  }}
                >
                  <div className="Delivery-checked">
                    {selectedCompany === company?.id ? <span className="checked"></span> : <span className="unchecked"></span>}
                  </div>
                  <div>
                    <img
                      src={`${Config.baseURL}${company?.image}`}
                      height="35"
                      className="Delivery-option-icon"
                      alt="Delivery Option Icon"/>
                    
                  </div>
                  <div className="DElivery-card-content">
                    <span className="card-title">{company?.name}</span>

                    <span className="card-text">{company?.work_days}</span>
                  </div>
                  <div className="DElivery-card-price"> {company?.shipping_price} <span className='money_code' style={{display:'block', }}> ريال</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
