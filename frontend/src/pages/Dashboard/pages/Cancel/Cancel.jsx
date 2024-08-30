import { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import './Cancel.css';
export default function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to navigate after 5 seconds
    const timer = setTimeout(() => {
      navigate('/Checkout');
    }, 2000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='SuccessMessage'>
      <h2 className='SuccessMessage-text'>
        .   حدث خطأ في عملية الدفع  يرجى المحاولة ببطاقة أخرى
        <span className='SuccessMessage-icon'><MdCancel /> </span>
      </h2>    </div>

  )
}


