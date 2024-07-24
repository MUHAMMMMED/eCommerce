import React from 'react';
import './CardReport.css';

export default function OrderStatus({report}) {
  return (
    <>
    
    <div className='contner_card_report'>
  
    
 <h2 className='report_h2'> الطلبات</h2>

<div className='card_report'>
<div className='card_report_text' >انتظار</div>
<div className='card_report_number'> {report.waiting||0} <span className='card_report_code'> </span></div>
</div>
 

<div className='card_report'>
<div className='card_report_text'> تجهيز الطلب</div>
<div className='card_report_number'> {report.processing||0} <span className='card_report_code'> </span></div>
</div>


<div className='card_report'>
<div className='card_report_text'>تم الشحن</div>
<div className='card_report_number'>{report.Shipping||0} <span className='card_report_code'> </span></div>
</div>



<div className='card_report'>
<div className='card_report_text'>تم  </div>
<div className='card_report_number'>{report.done||0} <span className='card_report_code'> </span></div>
</div>



<div className='card_report'>
<div className='card_report_text'> الغاء  </div>
<div className='card_report_number'>{report.cancel||0} <span className='card_report_code'></span></div>
</div>

<div className='card_report' style={{background:'#9081f6',color:'#fff'}}>
<div className='report_card_text' style={{color:'#fff'}}> اجمالي عدد الطلبات  </div>
<div className='report_card_number'>{report.orders_count||0} <span className='card_report_code'></span></div>
</div>

</div>
 
    </>
  )
}
