import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const AddProduct = async () => {
    try {
      let dataObj;
      let product = productDetails;

      let formData = new FormData();
      formData.append("product", image);

      const uploadRes = await fetch(`${backend_url}/upload`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      dataObj = await uploadRes.json();

      if (dataObj.success) {
        product.image = dataObj.image_url;

        const res = await fetch(`${backend_url}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("admin-token"), // ✅ Add token
        },
        body: JSON.stringify(product),
      });


        const data = await res.json();
        if (data.success) {
          alert("✅ Product Added Successfully");
        } else {
          alert(data.error || "❌ Failed to add product");
        }
      } else {
        alert("❌ Image Upload Failed");
      }
    } catch (error) {
      alert("❌ Error adding product");
      console.error(error);
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={productDetails.category}
          name="category"
          className="add-product-selector"
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
      </div>
      <button className="addproduct-btn" onClick={AddProduct}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
