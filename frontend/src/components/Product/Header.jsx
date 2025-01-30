import React, { useState } from "react";
import Icons from "../../../utils/Icons";

const Header = () => {
  return (
    <div className="bg-white px-3 py-10">
      <div className="max-w-screen-2xl mx-auto gap-5 flex justify-start items-center">
        <div className="flex items-center space-x-2">
          <a href="/home" className="text-gray-600 hover:text-blue-900">
            Home
          </a>
          <Icons path="right" className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <a href="#" className="text-gray-600 hover:text-blue-900">
            Product details
          </a>
          <Icons path="right" className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;
