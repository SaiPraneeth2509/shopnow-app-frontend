import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/order/${orderId}/`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (isLoading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger my-5">{error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Order Details</h2>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>User:</strong> {order.user.username}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Total Price:</strong> ${order.total_price}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
              <h3 className="mt-4">Purchased Products</h3>
              {order.items && order.items.length > 0 ? (
                <ul className="list-group">
                  {order.items.map((item) => (
                    <li key={item.product.id} className="list-group-item">
                      <div className="d-flex align-items-center">
                        {/* Product Image */}
                        <img
                          src={`${api.defaults.baseURL}${item.product.image}`}
                          alt={item.product.name}
                          className="img-fluid rounded"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            marginRight: "20px",
                          }}
                          onError={(e) => {
                            e.target.src = "/images/placeholder.png"; // Fallback image
                            e.target.onerror = null; // Prevent infinite loop
                          }}
                        />
                        <div>
                          <p>
                            <strong>Product:</strong> {item.product.name}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                          <p>
                            <strong>Price:</strong> ${item.product.price}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products found for this order.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
