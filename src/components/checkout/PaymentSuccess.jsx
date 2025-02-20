import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = ({ updateCartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("order_id");

  useEffect(() => {
    // Clear the cart code from local storage
    localStorage.removeItem("cart_code");

    // Update the cart count
    updateCartCount();
  }, [updateCartCount]);

  const handleViewOrderDetails = () => {
    navigate(`/order/${orderId}`); // Redirect to order details page
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Payment Successful!</h2>
              <p>Thank you for your purchase. Your order ID is: {orderId}</p>
              <button
                className="btn btn-primary"
                onClick={handleViewOrderDetails}
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
