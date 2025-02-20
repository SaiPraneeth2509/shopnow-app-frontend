import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Payment from "./Payment"; // Import Payment component

const Checkout = ({ updateCartCount }) => {
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
      const response = await api.get(`/cart/?cart_code=${cartCode}`);
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total price
  const totalPrice = cartItems
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

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
          <Payment cartItems={cartItems} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
