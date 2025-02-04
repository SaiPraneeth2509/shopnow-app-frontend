// src/components/home/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="bg-secondary text-white text-center py-5 mt-0">
      {/* Add mt-4 for margin-top */}
      <h1 className="display-3">Welcome to ShopperShop</h1>
      <p className="lead">
        Your one-stop destination for all your shopping needs
      </p>
    </header>
  );
};

export default Header;
