import React, { useState } from "react";
import { LoginBg } from "../../assets/image";
import Icons from "../../../utils/Icons";
import { signUpUser } from "../../../utils/axiosService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    if (!name || !email || !password) {
      setError("Please fill in all the fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await signUpUser(data);
      localStorage.setItem("authUser", response.token);
      message.success(response.message);
      navigate("/home");
    } catch (error) {
      message.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Panel */}
      <div
        className="relative w-2/5 text-white flex items-center justify-center"
        style={{
          backgroundImage: `url(${LoginBg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-md mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-8">
            To keep connected with us please <br />
            login with your personal info
          </p>
          <button
            onClick={() => navigate("/")}
            className="border-2 cursor-pointer border-white px-12 py-3 rounded-full hover:bg-white hover:text-blue-900 transition-colors duration-300 relative z-10"
          >
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-4/6 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-5xl text-center font-bold text-yellow-500 mb-12">
            Create Account
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}{" "}
          {/* Display error */}
          <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400">
                <Icons path="user" className="w-6 h-6" />
              </span>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 px-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400">
                <Icons path="email" className="w-6 h-6" />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 px-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400">
                <Icons path="lock" className="w-6 h-6" />
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 px-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-60 bg-yellow-500 text-white py-3 rounded-full hover:bg-yellow-600 transition-colors duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable button when loading
              >
                {loading ? "Signing Up..." : "SIGN UP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
