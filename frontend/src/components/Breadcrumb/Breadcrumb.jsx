import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ tags }) => {


  return (
    <ul className="breadcrumb">
      {tags.map((item, index) => (
        <li key={index}><a href={item.link}>{item.name}</a></li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
