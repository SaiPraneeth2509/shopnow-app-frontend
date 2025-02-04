// src/components/home/HomeCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../utils/api.js"; // Import the base URL

const HomeCard = ({ product }) => {
  // Construct the full image URL by prepending the base URL
  const imageUrl = `${BASE_URL}${product.image}`;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imageUrl} // Use the full image URL
        alt={product.name}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/200"; // Fallback image if the URL is broken
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-primary fw-bold">${product.price}</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
