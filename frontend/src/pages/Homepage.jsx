import React from "react";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import Products from "../components/Home/Products";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className="px-4 mb-6 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Products />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
