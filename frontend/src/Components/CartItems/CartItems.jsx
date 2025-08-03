import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
    const [promo, setPromo] = useState("");

    const applyPromo = () => {
      if (promo === "DISCOUNT10") {
        alert("Promo applied! 10% discount");
      } else {
        alert("Invalid promo code");
      }
    };
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {products.map((e) =>
        cartItems[e.id] > 0 ? (
          <div key={e.id}>
            <div className="cartitems-format-main cartitems-format">
              <img
                className="cartitems-product-icon"
                src={backend_url + e.image}
                alt={e.name}
              />
              <p className="cartitems-product-title">{e.name}</p>
              <p>
                {currency}
                {e.new_price}
              </p>
              <button className="cartitems-quantity">{cartItems[e.id]}</button>
              <p>
                {currency}
                {e.new_price * cartItems[e.id]}
              </p>
              <img
                onClick={() => {
                  try {
                    removeFromCart(e.id);
                  } catch (error) {
                    console.error("Remove from cart error:", error);
                  }
                }}
                className="cartitems-remove-icon"
                src={cross_icon}
                alt="remove"
              />
            </div>
            <hr />
          </div>
        ) : null
      )}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{currency + getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency + getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
  <input type="text" placeholder="promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
  <button onClick={applyPromo}>Submit</button>
</div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
