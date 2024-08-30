import React from 'react'

export default function NetProfit({ report }) {
  // revenues
  const total_discount_pshipping = report.total_discount_pshipping
  const total_shipping = report.total_shipping
  const shipping_balance = total_shipping - total_discount_pshipping
  const total_amount = report.total_amount - total_shipping
  const total_revenues = total_amount + shipping_balance

  // expense
  const total_amount_expense = report.total_amount_expense
  const total_amount_budgetAdd = report.total_amount_budgetAdd
  const taxAmount = report.taxAmount
  const product_sold = report.total_amount_product_sold
  const total_expense = total_amount_expense + total_amount_budgetAdd + taxAmount + product_sold

  // NetProfi

  const total = total_expense - total_revenues




  return (
    <>
      <h2 className='report_p'>  صافي الربح  </h2>
      <div className='report_card' style={{ background: '#16b967', color: '#fff' }}>
        <div className='report_card_text' style={{ color: '#fff' }}> الارباح</div>
        <div className='report_card_number'> {total.toFixed(2) || 0}<span className='card_report_code'>SAR</span></div>
      </div>









    </>
  )
}
