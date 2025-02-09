// src/components/product/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BASE_URL from "../../utils/api.js";
import Error from "../ui/Error.jsx";
import HomeCard from "../home/HomeCard.jsx";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  console.log("Slug from URL:", slug);

  useEffect(() => {
    console.log("Fetching product details for slug:", slug);
    fetch(`${BASE_URL}/products/${slug}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product Data:", data);
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [slug]);

  if (error) {
    return <Error message={error} />;
  }

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const imageUrl = `${BASE_URL}${product.image}`;

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-6">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "500px", backgroundColor: "#f0f0f0" }}
          >
            {hasError ? (
              <div className="text-center text-muted">
                <i className="bi bi-image" style={{ fontSize: "3rem" }}></i>
                <p className="mt-2">Image not available</p>
              </div>
            ) : (
              <img
                src={imageUrl}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "500px", objectFit: "cover" }}
                onError={() => setHasError(true)}
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{product.name}</h1>
          <p className="lead">{product.description}</p>
          <p className="h3 text-primary">${product.price}</p>
          <button className="btn btn-primary btn-lg">Add to Cart</button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <h2>Related Products</h2>
        <div className="row">
          {product.related_products && product.related_products.length > 0 ? (
            product.related_products.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col-md-3 mb-4">
                <HomeCard product={relatedProduct} />
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
