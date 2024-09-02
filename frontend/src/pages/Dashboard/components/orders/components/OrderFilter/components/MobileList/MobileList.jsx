import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { Link } from "react-router-dom";

export default function MobileList({ order }) {
  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const getOrderStatus = (status) => {
    switch (status) {
      case 'waiting':
        return 'انتظار';
      case 'processing':
        return 'تجهيز الطلب';
      case 'shipping':
        return 'تم الشحن';
      case 'done':
        return 'تم';
      case 'cancel':
        return 'الغاء';
      default:
        return '';
    }
  };

  return (
    <div className='filter_list_mobile'>
      <div className='list_mobile' style={{ textAlign: 'center' }}>
        {formatDate(order?.created_at)}
      </div>

      <div className='list_mobile'>
        <div className='mobile_text2' style={{ color: '#9081f6', float: 'right' }}>
          <span>{order.paid ? 'دفع' : 'لم يدفع'}</span>
          <span style={{ float: 'right', marginLeft: '5px', paddingTop: '2px' }}>
            {order.paid ? <FaRegMoneyBillAlt /> : <MdCancelPresentation />}
          </span>
        </div>
      </div>

      <div className='list_mobile'>
        <div className='mobile_text1'> العميل </div>
        <div className='mobile_text2'> {order?.customer?.name}</div>
      </div>

      <div className='list_mobile'>
        <div className='mobile_text1'> المبلغ </div>
        <div className='mobile_text2'> {order?.total}</div>
      </div>

      <div className='list_mobile'>
        <div className='mobile_text1'> حاله الطلب </div>
        <div className='mobile_text2'>
          {getOrderStatus(order?.status)}
        </div>
      </div>

      <div className='list_mobile'>
        <div className='mobile_text1' style={{ color: '#9081f6', display: 'block' }}>

          {order.new ? <span style={{
            float: 'right',
            padding: '3px 15px',
            background: '#fff',
            border: '1px solid #9081f6',
            borderRadius: '3px',
            marginTop: '3px',
            display: 'block'
          }}>جديد</span> : <></>}


        </div>
        <div className='mobile_text2'>
          <Link to={`/order/${order.id}`}>
            <button style={{
              width: '50%',
              marginRight: '50%',
              padding: '8px',
              marginTop: '0px',
              border: 'none',
              background: '#9081f6',
              color: '#fff',
              borderRadius: '5px'
            }}>
              عرض التفاصيل
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
