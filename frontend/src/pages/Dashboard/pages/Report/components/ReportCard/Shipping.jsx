import React from 'react'

export default function Shipping({report}) {
const total_shipping= report.total_discount_pshipping
const total_shipping_balance=report.total_shipping_balance 
const balance=total_shipping_balance - total_shipping



  return (
    <>
 <h2 className='report_h2'> الشحن</h2>
<h2 className='report_p'>    اجمالي ايرادات كل شركه داخل الموقع</h2>

{report.shipping_sum&& report.shipping_sum.map((item, index) => (
    <div className='report_card'  style={{height:' 120px' }} key={index + 1}>
        <div className='report_card_text'>{item.name}</div>
        <div className='report_card_number'>
            {item.total_amount||0} <span className='card_report_code'>SAR</span>
        </div>
        <div className='report_card_number' style={{fontSize:"14px",marginTop:'0'}}>
            {item.total_amount_discount||0} <span className='card_report_code' >الايراد بعد الخصم</span>
        </div>


    </div>
))} 

<div className='report_card' style={{background:'#9081f6',color:'#fff',height:' 120px'}}>
<div className='report_card_text' style={{color:'#fff'}}> اجمالي ايرادات شركات الشحن</div>
<div className='report_card_number'>{report.total_shipping||0} <span className='card_report_code'>SAR</span></div>
<div className='report_card_number' style={{fontSize:"14px",marginTop:'0'}}>{report.total_discount_pshipping||0} <span className='card_report_code' >الايراد بعد الخصم المكتسب</span></div>
</div>
<h2 className='report_p'>  رصيد شركات الشحن داخل المنصه</h2>
 
{report.shipping_balance_summary&& report.shipping_balance_summary.map((item, index) => (
    <div className='report_card' key={index + 1}>
        <div className='report_card_text'>{item.name}</div>
        <div className='report_card_number'>
            {item.total_amount||0} <span className='card_report_code'>SAR</span>
        </div>
    </div>
))}
 
<div className='report_card' style={{background:'#9081f6',color:'#fff'}}>
<div className='report_card_text' style={{color:'#fff'}}>           اجمالي رصيد منصه شركه الشحن </div>
 
<div className='report_card_number'>{report.total_shipping_balance||0} <span className='card_report_code'>SAR</span></div>

</div>


<h2 className='report_p'> الرصيد المتاح  </h2>

<div className='report_card' style={{background:'#9081f6',color:'#fff'}}>
<div className='report_card_text' style={{color:'#fff'}}> اجمالي رصيد  داخل منصة الشحن</div>
<div className='report_card_number'>{balance||0} <span className='card_report_code'>SAR</span></div>
</div>
  
    </>
  )
}
