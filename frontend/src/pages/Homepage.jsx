import React, { useState } from "react";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import Products from "../components/Home/Products";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
       <Navbar setSearchTerm={setSearchTerm} />
      <Header />
      <div className="mb-6 max-w-screen-2xl mx-auto bg-white">
        <div className="flex gap-8">
          <Sidebar />
          <div className="flex-1">
            <Products searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
