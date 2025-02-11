// src/components/cart/Cart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/api";

const Cart = ({ updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    const cartCode = localStorage.getItem("cart_code");
    if (!cartCode) {
      setError("No cart found.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/cart/?cart_code=${cartCode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update quantity of a product in the cart
  const updateQuantity = async (productId, quantity) => {
    const cartCode = localStorage.getItem("cart_code");
    if (!cartCode) {
      alert("No cart found.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/update_quantity/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_code: cartCode,
          product_id: productId,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const data = await response.json();
      console.log("Quantity updated:", data);
      fetchCartItems(); // Refresh cart items
      if (updateCartCount) {
        updateCartCount(); // Update cart count in Navbar
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  // Remove a product from the cart
  const removeFromCart = async (productId) => {
    const cartCode = localStorage.getItem("cart_code");
    if (!cartCode) {
      alert("No cart found.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/remove_item/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_code: cartCode,
          product_id: productId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();
      console.log("Item removed:", data);
      fetchCartItems(); // Refresh cart items
      if (updateCartCount) {
        updateCartCount(); // Update cart count in Navbar
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger my-5">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={`${BASE_URL}${item.product.image}`}
                      alt={item.product.name}
                      className="img-fluid rounded-start"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100";
                      }}
                    />
                  </div>
                  {/* Product Details */}
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{item.product.name}</h5>
                      <p className="card-text text-primary fw-bold">
                        ${item.product.price} x {item.quantity} = $
                        {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="d-flex align-items-center">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.product.id, e.target.value)
                          }
                          className="form-control me-3"
                          style={{ width: "80px" }}
                        />
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <p className="card-text">Total Items: {cartItems.length}</p>
                <p className="card-text fw-bold">
                  Total Price: $
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-muted">Your cart is empty.</div>
      )}
    </div>
  );
};

export default Cart;
