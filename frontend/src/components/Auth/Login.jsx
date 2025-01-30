import React, { useState } from "react";
import Icons from "../../../utils/Icons";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { loginUser } from "../../../utils/axiosService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = { email, password };
    try {
      const response = await loginUser(data);
      localStorage.setItem("authUser", response.token);
      message.success(response.message);
      navigate("/home");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-4/6 flex items-center justify-center p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-5xl text-center font-bold text-yellow-500 leading-tight">
            Sign In to <br /> Your Account
          </h1>

          {error && (
            <p className="text-red-500 font-semibold text-center">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Icons path="email" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 pl-12 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Icons path="lock" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 pl-12 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="text-center">
              <a
                href="#"
                className="text-black font-semibold underline hover:text-gray-800 text-sm"
              >
                Forgot password?
              </a>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-60 bg-yellow-500 text-white py-3 rounded-full hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "SIGN IN"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative w-1/2 bg-primary flex items-center justify-center overflow-hidden">
        {/* Geometric Shapes Container */}
        <div className="absolute inset-0">
          {/* Top Large diamond */}
          <div
            className="absolute right-0 top-0 w-96 h-96 opacity-10"
            style={{
              clipPath: "polygon(61% 0%, 100% 0%, 100% 89%, 38% 26%)",
              backgroundColor: "#fff",
            }}
          />

          {/* Top Medium circle */}
          <div
            className="absolute right-1/3 top-56 w-16 h-16 opacity-10"
            style={{
              clipPath: "circle(50% at 50% 50%)",
              backgroundColor: "#fff",
            }}
          />

          {/* Large Circle Left */}
          <div
            className="absolute -left-12 top-32 w-32 h-32  opacity-10"
            style={{
              clipPath: "circle(50% at 50% 50%)",
              backgroundColor: "#fff",
            }}
          />

          {/* Small rectangle Right */}
          <div
            className="absolute right-52 center w-20 h-20 opacity-10"
            style={{
              clipPath: "polygon(29% 0, 63% 0, 63% 100%, 29% 100%)",
              backgroundColor: "#fff",
              transform: "rotate(-50deg)",
            }}
          />

          {/* Small rectangle center Right */}
          <div
            className="absolute bottom-72 left-44 center w-20 h-20 opacity-10"
            style={{
              clipPath: "polygon(29% 0, 63% 0, 63% 100%, 29% 100%)",
              backgroundColor: "#fff",
              transform: "rotate(-50deg)",
            }}
          />

          {/* Bottom Right Triangle */}
          <div
            className="absolute left-1/2 bottom-11 w-24 h-24 opacity-10"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              backgroundColor: "#fff",
              transform: "rotate(-20deg)",
            }}
          />

          {/* Bottom Left Circle */}
          <div
            className="absolute left-24 bottom-24 w-12 h-12 opacity-10"
            style={{
              clipPath: "circle(50% at 50% 50%)",
              backgroundColor: "#fff",
            }}
          />

          {/* Bottom Diamond */}
          <div
            className="absolute right-1/3 bottom-52 w-16 h-16 opacity-10"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              backgroundColor: "#fff",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white ">
          <h2 className="text-5xl font-bold mb-6">Hello Friend!</h2>
          <p className="text-2xl mb-20 font-light">
            Enter your personal details and <br />
            start your journey with us
          </p>
          <button
            onClick={() => navigate("/sign-up")}
            className="border-2 w-64 border-white text-white py-4 rounded-full hover:bg-white hover:text-blue-900 transition-colors duration-300"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
