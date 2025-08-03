<<<<<<< HEAD
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { backend_url, currency } from "../../App";

const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={backend_url + image}
          alt={name}
        />
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {currency}
          {new_price}
        </div>
        <div className="item-price-old">
          {currency}
          {old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
=======
import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { backend_url, currency } from '../../App'

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={backend_url+props.image} alt="products" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">{currency}{props.new_price}</div>
        <div className="item-price-old">{currency}{props.old_price}</div>
      </div>
    </div>
  )
}

export default Item
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
