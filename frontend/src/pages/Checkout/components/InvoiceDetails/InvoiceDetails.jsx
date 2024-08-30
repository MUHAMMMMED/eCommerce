 
import React from 'react';

export default function InvoiceDetails({ cart ,order }) {
  // Extract total, tax rate, and shipping from cart_data, ensuring they are numbers
  const total = Number(cart?.cart_data?.total) || 0;
  const taxRate = Number(order?.tax) || 0;
  const shipping = Number(order?.shipping) || 0;
  // Calculate the tax amount
  const taxAmount = (total * taxRate) / 100;
  // Calculate the final total including tax and shipping
  const finalTotal = total + taxAmount + shipping;

  return (
    <>
       {cart?.order && (
        <>
          <div className="Pricing-sub-title">تفاصيل الفاتورة</div>
          <div className="Pricing-Summary">
            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title">عدد المنتجات</span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">({cart.cart_items_count})</span>
              </div>
            </div>

            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title">الكمية</span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">({cart.cart_quantity})</span>
              </div>
            </div>


            <div className="totals-item-sub_totals">
              <div className="col" >
                <span className="pricing-title">المجموع الفرعي</span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">{total.toFixed(2)}  <spen className='money_code'> ريال</spen></span>
              </div>
            </div>
            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title"> ({taxRate.toFixed(0)} %) الضريبه</span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">{taxAmount.toFixed(2)} <spen className='money_code'> ريال</spen></span>
              </div>
            </div>
            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title">رسوم التوصيل</span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">{shipping.toFixed(2)} <spen className='money_code'> ريال</spen></span>
              </div>
            </div>
            <div className="totals-item-total" style={{display:'block'}}>
              <div className="col"style={{display:'block'}}>
                <span className="total-title"style={{display:'block'}}>المجموع</span>
              </div>
              <div className="text-right"style={{display:'block'}}>
                <span className="total-amount"style={{display:'block'}}>{finalTotal.toFixed(2)} <spen className='money_code'> ريال</spen></span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
