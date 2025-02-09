// src/components/home/HomeCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../utils/api";
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
      const response = await fetch(
        `${BASE_URL}/product_in_cart/?cart_code=${cartCode}&product_id=${product.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to check if product is in cart");
      }
      const data = await response.json();
      setIsInCart(data.product_in_cart);
    } catch (error) {
      console.error("Error checking product in cart:", error);
    }
  };

  const addToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/add_item/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_code: cartCode,
          product_id: product.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      console.log("Item added to cart:", data);

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
          src={`${BASE_URL}${product.image}`}
          alt={product.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200";
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
