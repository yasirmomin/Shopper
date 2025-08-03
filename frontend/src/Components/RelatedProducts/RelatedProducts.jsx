import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const backend_url = "http://localhost:4000";

const RelatedProducts = ({ category, id }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${backend_url}/relatedproducts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        });
        const data = await res.json();
        setRelated(data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelated();
  }, [category]);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map(
          (item, index) =>
            id !== item.id && (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            )
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
