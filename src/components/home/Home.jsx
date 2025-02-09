// src/components/home/Home.jsx
import React, { useState } from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";
import BASE_URL from "../../utils/api";

const Home = () => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    const cartCode = localStorage.getItem("cart_code");
    if (cartCode) {
      try {
        const response = await fetch(`${BASE_URL}/cart/?cart_code=${cartCode}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart count");
        }
        const data = await response.json();
        setCartCount(data.total_items || 0);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <CardContainer updateCartCount={updateCartCount} />
    </div>
  );
};

export default Home;
