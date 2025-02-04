// src/components/home/CardContainer.jsx
import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx"; // Import the SkeletonCard component
import BASE_URL from "../../utils/api.js";

const CardContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Products</h2>
      <div className="row">
        {loading
          ? // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="col-md-4 mb-4">
                <SkeletonCard />
              </div>
            ))
          : // Show actual product cards after loading
            products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <HomeCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default CardContainer;
