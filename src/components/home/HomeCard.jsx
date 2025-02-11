import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api"; // Use the Axios instance
import generateCartCode from "../../utils/generate_cart_code";

const HomeCard = ({ product, updateCartCount }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartCode = localStorage.getItem("cart_code") || generateCartCode();

  if (!localStorage.getItem("cart_code")) {
    localStorage.setItem("cart_code", cartCode);
  }

  const checkProductInCart = async () => {
    try {
      const response = await api.get(
        `/product_in_cart/?cart_code=${cartCode}&product_id=${product.id}`
      );
      setIsInCart(response.data.product_in_cart);
    } catch (error) {
      console.error("Error checking product in cart:", error);
    }
  };

  const addToCart = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/add_item/", {
        cart_code: cartCode,
        product_id: product.id,
      });

      if (updateCartCount) {
        await updateCartCount();
      }

      await checkProductInCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkProductInCart();
  }, [product.id]);

  return (
    <Link to={`/product/${product.slug}`} className="text-decoration-none">
      <div className="card h-100 shadow-sm">
        <img
          src={`${api.defaults.baseURL}${product.image}`} // Use api.defaults.baseURL
          alt={product.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "/images/placeholder.png"; // Local fallback
            e.target.onerror = null; // Prevent infinite loop
          }}
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </h5>
          <p className="card-text text-primary fw-bold">${product.price}</p>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              addToCart();
            }}
            disabled={isLoading || isInCart}
          >
            {isLoading ? "Adding..." : isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
