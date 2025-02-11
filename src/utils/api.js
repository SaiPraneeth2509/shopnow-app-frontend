import axios from "axios";

const BASE_URL = "http://127.0.0.1:8001";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem("access_token");

// Function to get the refresh token from localStorage
const getRefreshToken = () => localStorage.getItem("refresh_token");

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/token/refresh/`, {
      refresh: getRefreshToken(),
    });
    const { access } = response.data;
    localStorage.setItem("access_token", access);
    return access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    // Handle token refresh failure (e.g., redirect to login)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // Redirect to login page
    return null;
  }
};

// Request interceptor to add the access token to each request
api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired access token (401) and it's not a retry request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the access token
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Update the Authorization header with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return api(originalRequest);
      }
    }

    // If the error is not due to an expired token, reject the promise
    return Promise.reject(error);
  }
);

export default api;
