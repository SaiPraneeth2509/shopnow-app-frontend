// src/components/ui/Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/about" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/home" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 text-center mb-3">
            <div className="d-inline-block me-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaFacebook size={24} />
              </a>
            </div>
            <div className="d-inline-block me-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaTwitter size={24} />
              </a>
            </div>
            <div className="d-inline-block me-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaInstagram size={24} />
              </a>
            </div>
            <div className="d-inline-block">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="col-12 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} ShopperShop. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
