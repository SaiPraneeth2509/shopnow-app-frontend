// src/components/checkout/PaymentCancel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = ({ updateCartCount }) => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Payment Canceled</h2>
              <p>
                Your payment was canceled. You can return to the checkout page.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  updateCartCount();
                  navigate("/checkout");
                }}
              >
                Return to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
