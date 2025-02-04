// src/components/ui/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      {" "}
      {/* Increase padding with py-3 */}
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3">
          {" "}
          {/* Increase brand font size */}
          ShopperShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              {" "}
              {/* Add margin between links */}
              <Link to="/login" className="nav-link fs-5">
                {" "}
                {/* Increase link font size */}
                Login
              </Link>
            </li>
            <li className="nav-item mx-3">
              {" "}
              {/* Add margin between links */}
              <Link to="/register" className="nav-link fs-5">
                {" "}
                {/* Increase link font size */}
                Register
              </Link>
            </li>
            <li className="nav-item mx-3">
              {" "}
              {/* Add margin between links */}
              <Link to="/cart" className="nav-link fs-5">
                {" "}
                {/* Increase link font size */}
                <FaShoppingCart size={24} /> {/* Increase cart icon size */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
