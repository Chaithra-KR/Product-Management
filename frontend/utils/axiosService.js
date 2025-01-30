import axios from "axios";
import axiosInstance from "./axiosInstance";

export const checkAuthStatus = async () => {
  try {
    const response = await axiosInstance.get("/auth/status");
    localStorage.setItem("isAuthenticated", response.isAuthenticated);
    return response.isAuthenticated;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

export const uploadImages = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/product/upload-image",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("authUser")}`,
        },
      }
    );

    console.log(response);

    if (response.data.success && response.data.isAuthenticated) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Product adding failed. Please try again.",
    };
  }
};

// to register
export const signUpUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Signup failed. Please try again.",
    };
  }
};

// to login
export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Login failed. Please try again.",
    };
  }
};

// to add category
export const addCategory = async (data) => {
  try {
    const response = await axiosInstance.post("/category", data);
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Category adding failed. Please try again.",
    };
  }
};

// to get categories
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Category fetching failed. Please try again.",
    };
  }
};

// to add sub category
export const addSubCategory = async (data) => {
  try {
    const response = await axiosInstance.post("/subcategory", data);
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Subcategory adding failed. Please try again.",
    };
  }
};

// to get sub categories
export const getSubCategories = async () => {
  try {
    const response = await axiosInstance.get("/subCategory");
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.message || "Subcategory fetching failed. Please try again.",
    };
  }
};

// to add product
export const addProduct = async (data) => {
  try {
    const response = await axiosInstance.post("/product", data);
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Product adding failed. Please try again.",
    };
  }
};

// to get products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/product");
    if (response.success && response.isAuthenticated == true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Products fetching failed. Please try again.",
    };
  }
};

// to get product by id
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    if (response.success && response.isAuthenticated === true) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "Product fetching failed. Please try again.",
    };
  }
};
