import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const backend_url = "http://localhost:4000";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default"); 
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backend_url}/allproducts`);
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const sortedProducts = [...allproducts]
    .filter((item) => item.category === props.category)
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.new_price - b.new_price;
      if (sortOrder === "highToLow") return b.new_price - a.new_price;
      return 0; 
    });

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {sortedProducts.length}</span> products
        </p>

        <div
          className="shopcategory-sort"
          onClick={() => setShowDropdown((prev) => !prev)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          Sort by <img src={dropdown_icon} alt="" />
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                background: "#fff",
                border: "1px solid #ccc",
                padding: "5px",
                right: 0,
                top: "30px",
                zIndex: 10,
              }}
            >
              <p onClick={() => setSortOrder("lowToHigh")}>Price: Low to High</p>
              <p onClick={() => setSortOrder("highToLow")}>Price: High to Low</p>
              <p onClick={() => setSortOrder("default")}>Default</p>
            </div>
          )}
        </div>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: "none" }}>
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default ShopCategory;
