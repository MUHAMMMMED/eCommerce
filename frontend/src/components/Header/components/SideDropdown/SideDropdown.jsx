import React, { useState } from 'react';
import './SideDropdown.css';

export default function SideDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="dropdown-btn" onClick={toggleDropdown}>
        Dropdown <i className="fa fa-caret-down"></i>
      </div>
      <div className={`dropdown-container ${isDropdownOpen ? 'show' : ''}`}>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
  );
}
