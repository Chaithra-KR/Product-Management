import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus } from "./axiosService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const status = await checkAuthStatus();
      setIsAuthenticated(status);
    };

    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
