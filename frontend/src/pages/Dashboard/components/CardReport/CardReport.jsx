import React from 'react';
import './CardReport.css';

export default function CardReport({ report }) {

  const shipping_count = report.shipping_count
  const discount = report.discount_pshipping_count
  const Gainـorـloss = shipping_count - discount


  return (
    <div className='contner_card_report'>


      <div className='card_report'>
        <div className='card_report_text'>الطلبات</div>
        <div className='card_report_number'>{report.orders_count}  </div>
      </div>

      {/* الايرادات */}


      <div className='card_report'>
        <div className='card_report_text'>المبيعات</div>
        <div className='card_report_number'>{report.total_count} <span className='card_report_code'>SAR</span></div>
      </div>





      <div className='card_report'>
        <div className='card_report_text'>اجمالي الضريبه   </div>
        <div className='card_report_number'>{report.tax_count} <span className='card_report_code'>SAR</span></div>
      </div>


      <div className='card_report'>
        <div className='card_report_text'> اجمالي الشحن
        </div>
        <div className='card_report_number' style={{ marginTop: '0px' }}> <div className='card_report_code' style={{ marginTop: '5px' }}>{Gainـorـloss} </div>
          {report.shipping_count} <span className='card_report_code'>SAR
          </span>





        </div>




      </div>



      {/* <div className='card_report'>
<div className='card_report_text'> الزيارات</div>
<div className='card_report_number'>{report.shipping_count} <span className='card_report_code'>SAR</span></div>
 </div> */}


      {/* "orders_count": 3,
    "shipping_count": 64.0,
    "tax_count": 20,
    "total_count": 3200.0 */}



      {/* <div className='card_report'>
<div className='card_report_text'> الزيارات</div>
<div className='card_report_number'>{report.tax_count} <span className='card_report_code'>SAR</span></div>
 </div> */}







    </div>
  )
}
