import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorPage from '../../components/Loading/ErrorPage';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';
import './Checkout.css';
import ContactForm from './components/ContactForm/ContactForm';
import FollowUpPayment from './components/FollowUpPayment/FollowUpPayment';
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails';
import SmallCard from './components/SmallCard/SmallCard';

axios.defaults.withCredentials = true; // Ensuring cookies are sent with requests

export default function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/api/cart/cart/`);
      setCart(response.data);
    } catch (error) {
      setError(error.response?.data?.message || " الصفحة غير موجوده");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  return (
    <div>
      <section className="cartPageSection">
        <h3>الشراء</h3>
      </section>
      <section className="section-Checkout">
        <div className="section-Checkout-row1">
          <ContactForm   fetchCart={fetchCart} order={cart?.order} customer={cart?.customers} />
        </div>

        {cart?.order && (
          <div className="section-Checkout-row2">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="sub-title">المنتجات</h2>
            </div>
            <div className="product">
              {cart.cart_items.map((item) => (
                <SmallCard key={item.id} quantity={item.quantity} image={item.product?.image_side_one} />
              ))}
            </div>
            <InvoiceDetails cart={cart} order={cart?.order}  />
            <FollowUpPayment order={cart?.order} cart={cart}/>
          </div>
        )}
      </section>
    </div>
  );
}


