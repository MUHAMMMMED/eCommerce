import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'; // Assuming you have react-icons installed
import './Accordion.css';

const Accordion = ({questions}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Set initial state to 0 to open the first item by default

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className='accordion-text'>  الأسئلة المتكررة</div>
      <div className="accordion-container">
        { questions.map((item, index) => (
          <React.Fragment key={index}>
            <button className="accordion" onClick={() => handleToggle(index)}>
              <div className="accordionContent">
                <div>{item.question}</div>
                <div>{activeIndex === index ? <SlArrowUp /> : <SlArrowDown />}</div>
              </div>
            </button>
            <div className={`panel ${activeIndex === index ? 'active' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Accordion;
 