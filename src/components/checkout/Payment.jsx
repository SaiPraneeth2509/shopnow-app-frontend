import React, { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Payment = ({ cartItems, totalPrice }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle PayPal payment
  const handlePayPalPayment = async () => {
    setIsLoading(true);
    setError("");

    const cartCode = localStorage.getItem("cart_code");
    if (!cartCode) {
      setError("No cart found.");
      setIsLoading(false);
      return;
    }

    try {
      // Call backend to create PayPal payment
      const response = await api.post("/create_paypal_payment/", {
        cart_code: cartCode,
      });

      // Redirect to PayPal approval URL
      if (response.data.approval_url) {
        window.location.href = response.data.approval_url;
      } else {
        setError("Failed to create PayPal payment.");
      }
    } catch (error) {
      console.error("Error creating PayPal payment:", error);
      setError("Failed to create PayPal payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Payment Options</h5>
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handlePayPalPayment}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Pay with PayPal"}
        </button>
        <button
          className="btn btn-secondary w-100"
          onClick={() => navigate("/payment-cancel")}
        >
          Pay with Credit Card
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Payment;
