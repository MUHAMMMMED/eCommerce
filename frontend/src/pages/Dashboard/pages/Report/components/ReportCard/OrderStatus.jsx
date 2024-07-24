import React from 'react'

export default function OrderStatus({report}) {
  return (
    <>
    
    
    
 <h2 className='report_h2'> الطلبات</h2>

<div className='report_card_order'>
<div className='report_card_text'>انتظار</div>
<div className='report_card_number'> {report.waiting||0} <span className='card_report_code'> </span></div>
</div>

<div className='report_card_order'>
<div className='report_card_text'> تجهيز الطلب</div>
<div className='report_card_number'> {report.processing||0} <span className='card_report_code'> </span></div>
</div>


<div className='report_card_order'>
<div className='report_card_text'>تم الشحن</div>
<div className='report_card_number'>{report.Shipping||0} <span className='card_report_code'> </span></div>
</div>



<div className='report_card_order'>
<div className='report_card_text'>تم  </div>
<div className='report_card_number'>{report.done||0} <span className='card_report_code'> </span></div>
</div>



<div className='report_card_order'>
<div className='report_card_text'> الغاء  </div>
<div className='report_card_number'>{report.cancel||0} <span className='card_report_code'></span></div>
</div>

<div className='report_card_order' style={{background:'#9081f6',color:'#fff'}}>
<div className='report_card_text' style={{color:'#fff'}}> اجمالي عدد الطلبات  </div>
<div className='report_card_number'>{report.orders_count||0} <span className='card_report_code'></span></div>
</div>

 
    </>
  )
}
