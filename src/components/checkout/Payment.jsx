// src/components/checkout/Payment.jsx
import React from "react";

const Payment = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Payment</h2>
              <p className="text-center">Proceed with your payment here.</p>
              {/* Add payment form or integration here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
