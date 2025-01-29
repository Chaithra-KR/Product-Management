import React, { useState } from "react";
import Icons from "../../../utils/Icons";
import AddProduct from "../Popup/AddProduct";

const Header = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsProductModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProductModalOpen(false);
  };

  return (
    <div className="bg-white p-6 mb-6">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <a href="#" className="text-gray-600 hover:text-blue-900">
            Home
          </a>
          <Icons path="right" className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex space-x-4">
          <button className="rounded-2xl px-8 py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300 flex items-center">
            Add category
          </button>
          <button className="rounded-2xl px-8 py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300 flex items-center">
            Add sub category
          </button>
          <button
            className="rounded-2xl px-8 py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300 flex items-center"
            onClick={handleButtonClick}
          >
            Add product
          </button>
        </div>
      </div>
      <AddProduct isOpen={isProductModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Header;
