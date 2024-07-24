import React from 'react'

export default function Revenues({report}) {
  const total_discount_pshipping= report.total_discount_pshipping

  const total_shipping=report.total_shipping

  const shipping_balance=total_shipping - total_discount_pshipping

  const total_tax=report.total_tax

  const total_amount=report.total_amount-total_shipping

  const sub_total_amount=total_amount - (total_tax)
  
  const total=total_amount + shipping_balance
 

  return (
    <> 
<h2 className='report_h2'>   الايرادات </h2>

  

 <div className='report_card'>
 <div className='report_card_text'>   ايراد المنتجات</div>
<div className='report_card_number'> {sub_total_amount||0} <span className='card_report_code'>SAR</span></div>
 </div>

 <div className='report_card'>
 <div className='report_card_text'>   ضريبه القيمه المضافه</div>
<div className='report_card_number'> {total_tax ||0} <span className='card_report_code'>SAR</span></div>
 </div>


 
 <div className='report_card' >
<div className='report_card_text' >  ايراد شركات الشحن</div>
<div className='report_card_number'>{shipping_balance||0} <span className='card_report_code'>SAR</span></div>
</div>
  

<div className='report_card' style={{background:'#9081f6',color:'#fff'}}>
<div className='report_card_text' style={{color:'#fff'}}> اجمالي الايرادات</div>
<div className='report_card_number'>{total||0} <span className='card_report_code'>SAR</span></div>
</div>
    
    </>
  )
}
