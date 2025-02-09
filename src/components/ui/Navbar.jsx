// src/components/ui/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3">
          ShopNow
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
            {/* Login Link */}
            <li className="nav-item mx-3">
              <Link to="/login" className="nav-link fs-5">
                Login
              </Link>
            </li>
            {/* Register Link */}
            <li className="nav-item mx-3">
              <Link to="/register" className="nav-link fs-5">
                Register
              </Link>
            </li>
            {/* Cart Link */}
            <li className="nav-item mx-3">
              <Link to="/cart" className="nav-link fs-5 position-relative">
                <FaShoppingCart size={24} />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
