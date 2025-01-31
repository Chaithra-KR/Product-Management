import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, getWishlist } from "./axiosService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchAuth = async () => {
      const status = await checkAuthStatus();
      setIsAuthenticated(status);
    };

    fetchAuth();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      setWishlist(response.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, wishlist, setWishlist, fetchWishlist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
