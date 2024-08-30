import React from 'react'

export default function Purchase({ report }) {
  const total_amount_purchase = report?.total_amount_purchase
  const product_sold = report.total_amount_product_sold

  const total = total_amount_purchase - product_sold


  return (
    <>

      <h2 className='report_h2'> مشتريات</h2>

      <div className='report_card'>
        <div className='report_card_text'> مشتريات</div>
        <div className='report_card_number'>{total_amount_purchase || 0} <span className='card_report_code'>SAR</span></div>
      </div>

      <div className='report_card'>
        <div className='report_card_text'>  يخصم تكلفه البضاعه المباعة  </div>
        <div className='report_card_number'>{product_sold || 0} <span className='card_report_code'>SAR</span></div>
      </div>


      <div className='report_card' style={{ background: '#9081f6', color: '#fff' }}>
        <div className='report_card_text' style={{ color: '#fff' }}> المخزون</div>
        <div className='report_card_number'>{total || 0} <span className='card_report_code'>SAR</span></div>
      </div>









    </>
  )
}
