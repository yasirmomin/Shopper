<<<<<<< HEAD
import React from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = ({ data }) => {
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
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

export default NewCollections;
=======
import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = (props) => {
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {props.data.map((item,index)=>{
                return <Item id={item.id} key={index} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            })}
      </div>
    </div>
  )
}

export default NewCollections
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
