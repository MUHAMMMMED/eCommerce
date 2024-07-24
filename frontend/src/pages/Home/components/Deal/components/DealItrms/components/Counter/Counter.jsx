
import React, { useEffect, useState } from 'react';

export default function Counter({ targetDate }) {
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
    <div className='DealItrm-timer-row'>
    <div className='DealItrm-timer-row-number'>{timeLeft.days}</div>
    <div className='DealItrm-timer-row-text'>يوم</div>
      </div>

      <div className='DealItrm-timer-row'>
      <div className='DealItrm-timer-row-number'>{timeLeft.hours}</div>
      <div className='DealItrm-timer-row-text'>الساعه</div>
      </div>

      <div className='DealItrm-timer-row'>
      <div className='DealItrm-timer-row-number'>{timeLeft.minutes}</div>
      <div className='DealItrm-timer-row-text'>الدقيقه</div>
      </div>

      <div className='DealItrm-timer-row'>
      <div className='DealItrm-timer-row-number'>{timeLeft.seconds}</div>
      <div className='DealItrm-timer-row-text'>ثانيه</div>
      </div>

 
    </>
  );
}
