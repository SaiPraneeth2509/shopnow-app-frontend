// src/layout/MainLayout.jsx
import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const MainLayout = ({ children, cartCount, updateCartCount }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartCount={cartCount} updateCartCount={updateCartCount} />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
