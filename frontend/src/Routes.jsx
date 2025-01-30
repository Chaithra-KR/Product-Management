import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProductPage from "./pages/ProductPage";
import AuthenticatedRoute from "../utils/secureRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute element={<Login />} isProtectedRoute={false} />
    ),
  },
  {
    path: "/sign-up",
    element: (
      <AuthenticatedRoute element={<Signup />} isProtectedRoute={false} />
    ),
  },
  {
    path: "/home",
    element: (
      <AuthenticatedRoute element={<Homepage />} isProtectedRoute={true} />
    ),
  },
  {
    path: "/product/:id",
    element: (
      <AuthenticatedRoute element={<ProductPage />} isProtectedRoute={true} />
    ),
  },
]);

export default router;
