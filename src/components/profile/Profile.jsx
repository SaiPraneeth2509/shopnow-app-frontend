import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./Profile.css"; // Ensure this CSS file exists

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
    state: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user profile and order history
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/profile/");
        setUser(response.data.user);
        setFormData(response.data.user);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to fetch profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/api/profile/", formData);
      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="profile-main">
        {/* Profile Card */}
        <div className="profile-card">
          <h3>Profile Card</h3>
          <div className="profile-photo">
            <img src="/src/assets/profile pic.jpg" alt="Profile" />
          </div>
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* Account Summary */}
        <div className="account-summary">
          <h3>Account Summary</h3>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              {["username", "email", "city", "state", "address", "phone"].map(
                (field) => (
                  <div key={field} className="form-group">
                    <label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )
              )}
              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>
                <strong>City:</strong> {user.city}
              </p>
              <p>
                <strong>State:</strong> {user.state}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Order History */}
      <div className="order-history">
        <h3>Order History</h3>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total_price}
                </p>
                <div>
                  <strong>Products:</strong>
                  {order.items && order.items.length > 0 ? (
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.product.id}>
                          <p>
                            <strong>Product:</strong> {item.product.name}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                          <p>
                            <strong>Price:</strong> ${item.product.price}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No products found for this order.</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
