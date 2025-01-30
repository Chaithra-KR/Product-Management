import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authUser");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adding response interceptor to handle global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle success status (2xx)
    if (response.data.success) {
      return response.data; 
    } else {
      // If success is false, reject with the message from the backend
      return Promise.reject({ success: false, message: response.data.message });
    }
  },
  (error) => {
    // Handle all errors, including 4xx, 5xx, and network errors
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : "An error occurred. Please try again.";
    
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        // Handle client errors (4xx)
        return Promise.reject({ success: false, message: errorMessage });
      } else if (error.response.status >= 500) {
        // Handle server errors (5xx)
        return Promise.reject({ success: false, message: "Server error. Please try again later." });
      }
    }

    // Handle network errors or any other errors
    return Promise.reject({ success: false, message: errorMessage });
  }
);

export default axiosInstance;
