import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./components/home/Home";
import NotFound from "./components/ui/NotFound";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import api from "./utils/api"; // Use the Axios instance

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    const cartCode = localStorage.getItem("cart_code");
    if (cartCode) {
      try {
        const response = await api.get(`/cart/?cart_code=${cartCode}`);
        setCartCount(response.data.total_items || 0);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <Router>
      <MainLayout cartCount={cartCount} updateCartCount={updateCartCount}>
        <Routes>
          <Route
            path="/"
            element={<Home updateCartCount={updateCartCount} />}
          />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
