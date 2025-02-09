// src/components/checkout/Checkout.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/api";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const totalPrice = cartItems
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

  const handlePayPalPayment = () => {
    alert("Redirecting to PayPal...");
  };

  const handlePaymentSuccess = () => {
    alert("Payment successful! Thank you for your purchase.");
    localStorage.removeItem("cart_code");
    navigate("/");
  };

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
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="row">
        {/* Order Summary */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <h6>{item.product.name}</h6>
                    <p className="text-muted">
                      ${item.product.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="fw-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h5>${totalPrice}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Payment Options</h5>
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={handlePayPalPayment}
              >
                Pay with PayPal
              </button>
              <button
                className="btn btn-secondary w-100"
                onClick={handlePaymentSuccess}
              >
                Pay with Credit Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
