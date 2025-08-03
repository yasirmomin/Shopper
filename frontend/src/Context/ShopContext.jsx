<<<<<<< HEAD
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const backend_url = "http://localhost:4000";

const ShopContextProvider = (props) => {
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;
    return cart;
  };

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [token, setToken] = useState(localStorage.getItem("auth-token") || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("auth-token") || null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backend_url}/allproducts`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
  
      try {
        await fetch(`${backend_url}/getcart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": token,
            "Content-Type": "application/json",
          },
          body:"",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data));

      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, [token]); 

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((p) => p.id === Number(item));
        if (itemInfo) totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((p) => p.id === Number(item));
        if (itemInfo) totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const addToCart = async (itemId) => {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    try {
      await fetch(`${backend_url}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    try {
      await fetch(`${backend_url}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        token,
        setToken
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
=======
import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data))

    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/getcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => { setCartItems(data) });
    }
  }, [])

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = products.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price;
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = products.find((product) => product.id === Number(item));
          totalItem += itemInfo ? cartItems[item] : 0 ;
        } catch (error) {}
      }
    }
    return totalItem;
  };

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please Login");
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/addtocart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/removefromcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
    }
  };

  const contextValue = { products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
