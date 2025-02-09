// src/components/home/CardContainer.jsx
import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import BASE_URL from "../../utils/api";

const CardContainer = ({ updateCartCount }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <HomeCard product={product} updateCartCount={updateCartCount} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
