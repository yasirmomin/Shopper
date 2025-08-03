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
