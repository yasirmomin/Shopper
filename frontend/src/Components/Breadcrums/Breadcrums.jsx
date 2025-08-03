<<<<<<< HEAD
import React from "react";
import "./Breadcrums.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrums = ({ product }) => {
  if (!product) return null;

  return (
    <div className="breadcrums">
      HOME <img src={arrow_icon} alt="arrow" /> SHOP{" "}
      <img src={arrow_icon} alt="arrow" /> {product.category}{" "}
      <img src={arrow_icon} alt="arrow" /> {product.name}
    </div>
  );
};

export default Breadcrums;
=======
import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrums = (props) => {
  const {product} = props;
  return (
    <div className='breadcrums'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name} 
    </div>
  )
}

export default Breadcrums
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
