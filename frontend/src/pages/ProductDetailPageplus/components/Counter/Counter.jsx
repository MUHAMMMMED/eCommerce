
import React, { useEffect, useState } from 'react';
import './Counter.css';

export default function Counter({ targetDate,discount }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <>
    


    <div className='center-Timer-row'>

      <div className='Timer-row'>
        <div className='Timer-row-number'>{timeLeft.days}</div>
        <div className='Timer-row-text'>يوم</div>
      </div>

      <div className='Timer-row'>
        <div className='Timer-row-number'>{timeLeft.hours}</div>
        <div className='Timer-row-text'>الساعه</div>
      </div>

      <div className='Timer-row'>
        <div className='Timer-row-number'>{timeLeft.minutes}</div>
        <div className='Timer-row-text'>الدقيقه</div>
      </div>

      <div className='Timer-row'>
        <div className='Timer-row-number'>{timeLeft.seconds}</div>
        <div className='Timer-row-text'>ثانيه</div>
      </div>
      {discount > 0.0 && (
     <div className='Timer-row' style={{ backgroundColor: '#9081f6', color: '#fff' }}>
    <div className='Timer-row-number' style={{ color: '#fff' }}>{discount}%</div>
    <div className='Timer-row-text'>خصم</div>
    </div> 
    )}
</div>
      
    </>
  );
}
