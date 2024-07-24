import React from 'react';
import ApexChart_Location_country from '../ApexChart/ApexChart_Location_country';
import CountryButton from '../Country/CountryButton';
import ReportProduct from '../ReportProduct/ReportProduct';
import Expense from './Expense';
import NetProfit from './NetProfit';
import OrderStatus from './OrderStatus';
import Purchase from './Purchase';
import './ReportCard.css';
import Revenues from './Revenues';
import Shipping from './Shipping';


export default function ReportCarde({report}) {

  return (
    <div className='contner_card_report'>
 {report && (
  <>
<OrderStatus report={report}/>
<Shipping report={report}/>
<Purchase report={report}/> 
<Expense report={report}/>
<Revenues report={report}/>
<NetProfit report={report}/>
<ReportProduct report={report}/>

<div style={{width: '100%', marginTop: '30px', float: 'left'}}  > 
<ApexChart_Location_country title="التوزيع الجغرافي للعملاء" data={report ? report.country_list : null} />  </div>
 <div style={{width: '100%', marginTop: '30px', float: 'left'}}  >  <CountryButton data={report} /></div>
  </>
    )}
  
</div>
  )
}
