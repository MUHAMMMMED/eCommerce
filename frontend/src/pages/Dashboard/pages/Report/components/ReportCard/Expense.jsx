import React from 'react'

export default function Expense({ report }) {

  const total_amount_expense = report.total_amount_expense
  const total_amount_budgetAdd = report.total_amount_budgetAdd
  const taxAmount = report.taxAmount
  const product_sold = report.total_amount_product_sold
  const total = total_amount_expense + total_amount_budgetAdd + taxAmount + product_sold

  return (
    <>

      <h2 className='report_h2'> المصروفات</h2>

      <div className='report_card'>
        <div className='report_card_text'>مصروفات اخري</div>
        <div className='report_card_number'>{total_amount_expense || 0} <span className='card_report_code'>SAR</span></div>
      </div>

      <div className='report_card'>
        <div className='report_card_text'>تكلفه المنتجات المباعة</div>
        <div className='report_card_number'>{product_sold || 0} <span className='card_report_code'>SAR</span></div>
      </div>

      <div className='report_card'>
        <div className='report_card_text'>الاعلانات</div>
        <div className='report_card_number'>{total_amount_budgetAdd || 0} <span className='card_report_code'>SAR</span></div>
      </div>

      <div className='report_card'>
        <div className='report_card_text'>  استرايب ({report.StripeTax || 0}%)</div>
        <div className='report_card_number'>{taxAmount || 0}<span className='card_report_code'>SAR</span></div>
      </div>

      <div className='report_card' style={{ background: '#9081f6', color: '#fff' }}>
        <div className='report_card_text' style={{ color: '#fff' }}> اجمالي المصروفات</div>
        <div className='report_card_number'>{total || 0} <span className='card_report_code'>SAR</span></div>
      </div>

    </>
  )
}
