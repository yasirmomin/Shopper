<<<<<<< HEAD
import React from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = ({ data }) => {
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
=======
import React from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = (props) => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {props.data.map((item,index)=>{
            return <Item id={item.id} key={index} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
