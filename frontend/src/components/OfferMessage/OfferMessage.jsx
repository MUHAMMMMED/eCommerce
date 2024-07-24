 
import './styles.css';
 
const OfferMessage = ({info}) => {

  return (
  <>
 {info && info.offer_message &&
  <div className='OfferMessage'> {info.offer_message} </div> }

 </>
 );
};

export default OfferMessage;

 