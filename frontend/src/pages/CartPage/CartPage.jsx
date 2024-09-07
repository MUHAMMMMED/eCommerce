

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiCoupon3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';
import './CartPage.css';
import Notes from './components/Notes/Notes';
import PurchaseFollowUp from './components/PurchaseFollowUp/PurchaseFollowUp';
import RemoveItem from './components/RemoveItem/RemoveItem';
import Quantity from './components/quantity/quantity';

axios.defaults.withCredentials = true;

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/api/cart/cart/`);
      setCart(response.data);
      setDiscountedPrice(response.data.total);
    } catch (error) {
      setError(error.response?.data?.message || "The Product is not available");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const getProductPrice = (item) => {
    if (item.product) {
      const { quantity, product } = item;

      if (quantity <= product.quantity1) {
        const total_price = product.price1 * quantity;
        const total_discount = product.discount_price1 * quantity;
        return { total_price, total_discount };
      } else if (quantity <= product.quantity2) {
        const total_price = product.price2 * quantity;
        const total_discount = product.discount_price2 * quantity;
        return { total_price, total_discount };
      } else if (quantity <= product.quantity3) {
        const total_price = product.price3 * quantity;
        const total_discount = product.discount_price3 * quantity;
        return { total_price, total_discount };
      } else if (quantity <= product.quantity4) {
        const total_price = product.price4 * quantity;
        const total_discount = product.discount_price4 * quantity;
        return { total_price, total_discount };
      } else {
        const total_price = product.price5 * quantity;
        const total_discount = product.discount_price5 * quantity;
        return { total_price, total_discount };
      }
    } else {
      return { total_price: 0, total_discount: 0 };
    }
  };

  const updateTotal = async (newTotal) => {
    try {
      const response = await axios.post(`${Config.baseURL}/api/cart/update_total/`, { total: newTotal });
      setDiscountedPrice(response.data.total);
    } catch (error) {
      console.error('Error updating total:', error.message);
    }
  };

  const applyCoupon = async () => {
    try {
      const response = await axios.post(`${Config.baseURL}/api/cart/coupon/apply/`, { code: couponCode, Total: cart.total });
      if (response.data.valid) {
        const newDiscountedPrice = response.data.discounted_price;
        setDiscountedPrice(newDiscountedPrice);
        setSuccessMessage("تم تطبيق كود الخصم بنجاح!"); // Set success message
        updateTotal(newDiscountedPrice);  // Update total after applying the coupon
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error applying coupon:', error.message);
      setErrorMessage("كود الخصم غير صحيح"); // Set error message
    }
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <section className="cartPageSection">
        <h3 className="h2">سلة المشتريات</h3>
      </section>
      {cart ? (
        cart.cart_items.length > 0 ? (
          <section className="section-cart-products">
            <div className="section-cart-products-row1">
              {cart.cart_items.map(item => {
                const { total_price, total_discount } = getProductPrice(item); // Destructure prices
                return (
                  <div className='list-group-item' key={item.id}>
                    <RemoveItem itemId={item.id} FetchCart={fetchCart} />
                    <div className="cart-product-col-img">
                      <div style={{ float: 'right' }}>
                        <img className="cart-product-image" src={`${Config.baseURL}${item.product?.image_side_one}`} alt={item.product.name} />
                      </div>
                      <Link to={`/Product/${item?.product?.name}/${item?.product?.id}`}>
                        <div className='cart-product-titel'>{item.product?.name}</div>
                      </Link>
                    </div>
                    <Quantity itemId={item.id} quantity={item.quantity} fetchCart={fetchCart} />
                    <div className='cart-product-price'>
                      <div className='price'>{total_price?.toFixed(2)} <span className='money_code'>{item.product?.currency}</span></div>
                      <div className='before-price'>{total_discount?.toFixed(2)} <span className='money_code'>{item.product?.currency}</span></div>
                    </div>
                    {item && item.product.is_active_note && (
                      <Notes item={item} quantity={item.quantity} fetchCart={fetchCart} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className='section-cart-products-row2'>
              <div className='section-cart-totals'>
                <h5 className="text-body">مجموع الطلب</h5>
                <ul className="list-group">
                  <li className="list-group-item-li">
                    <span className="fw-bold text-primary">({cart.cart_items_count}) </span>
                    <div className="me-auto"><span>عدد المنتجات</span></div>
                  </li>
                  <li className="list-group-item-li">
                    <span className="fw-bold text-primary">({cart.cart_quantity}) </span>
                    <div className="me-auto"><span>الكمية</span></div>
                  </li>
                  <li className="list-group-item-li">
                    <span className="fw-bold text-primary">  {cart?.total.toFixed(2)}    <span className='money_code'> ريال</span></span>
                    <div className="me-auto"><span>المجموع</span></div>
                  </li>
                </ul>
                <div className="section-card">
                  <div className="input-group">
                    <button className="coupon-btn" type="button" onClick={applyCoupon}>
                      <span className="js-apply-coupon-icon"><RiCoupon3Line /></span>
                      <span className="px-1">إرسال</span>
                    </button>
                    <input
                      type="text"
                      className="form-control coupon-input-group"
                      placeholder="أدخل كود الخصم"
                      value={couponCode}
                      onChange={handleCouponCodeChange}
                    />
                    <br />
                  </div>
                  <div className="section-card" style={{ marginTop: '0', paddingTop: '0' }}>
                    {successMessage && (<div className="successMessage">{successMessage}</div>)}
                    {errorMessage && (<div className="errorMessage">{errorMessage}</div>)}
                  </div>
                </div>
                <PurchaseFollowUp discountedPrice={discountedPrice} cart={cart} />
              </div>
            </div>
          </section>
        ) : (
          <div className="section-cart-products-row1" style={{ width: '100%', marginTop: '100px', marginBottom: '300px' }}>
            <div className="grid" style={{ width: '50%', margin: 'auto' }}>
              <Link className="grid-a" to={'/All_Products'}>
                <div className="Btn-b">
                  <FaArrowLeftLong />
                  <div>العودة للتسوق</div>
                </div>
              </Link>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
}