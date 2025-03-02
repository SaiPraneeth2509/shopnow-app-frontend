import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./components/home/Home";
import NotFound from "./components/ui/NotFound";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import PaymentSuccess from "./components/checkout/PaymentSuccess";
import PaymentCancel from "./components/checkout/PaymentCancel";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";
import OrderDetails from "./components/order/OrderDetails";
import api from "./utils/api";
import { AuthProvider } from "./components/context/AuthContext";

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
    <AuthProvider>
      <Router basename="/shopnow-app-frontend">
        <MainLayout cartCount={cartCount} updateCartCount={updateCartCount}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/"
              element={<Home updateCartCount={updateCartCount} />}
            />
            <Route path="product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/payment-success"
              element={<PaymentSuccess updateCartCount={updateCartCount} />}
            />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
