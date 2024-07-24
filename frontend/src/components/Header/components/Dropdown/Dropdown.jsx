import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <div className="dropbtn">بطاقات NFC
 

      </div>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        <a href="#">LinkLinkLinkLinkLink</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
  );
};

export default Dropdown;
