import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import api from "../../utils/api"; // Use the Axios instance

const CardContainer = ({ updateCartCount }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/products/")
      .then((response) => setProducts(response.data))
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
