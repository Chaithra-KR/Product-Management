import React, { useState } from "react";
import Icons from "../../../utils/Icons";
import WishlistDrawer from "../Popup/WishlistDrawer";

const Navbar = ({ setSearchTerm }) => {
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  return (
    <nav className="w-full h-24 bg-primary px-4">
      <div className="w-full h-full flex items-center justify-between">
        <div className="w-8/12 flex justify-center">
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search any things"
                className="w-full px-4 py-4 rounded-2xl pr-24 focus:outline-none"
                value={searchInput}
                onChange={handleInputChange}
              />
              <button
                className="absolute rounded-2xl right-0 top-0 h-full px-10 py-4 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300 flex items-center"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="w-4/12 flex justify-center items-center space-x-6">
          <button
            className="flex items-center text-white hover:text-yellow-500 transition-colors duration-300"
            onClick={() => setWishlistOpen(true)}
          >
            <div className="flex justify-between items-center">
              <Icons path="heart" className="w-6 h-6" />
              <span className="flex items-center justify-center bg-yellow-500 text-white text-xs rounded-full w-4 h-4">
                {wishlistCount}
              </span>
            </div>
          </button>
          <button className="text-white hover:text-yellow-500 transition-colors duration-300">
            Sign in
          </button>
          <button className="flex items-center text-white hover:text-yellow-500 transition-colors duration-300">
            <div className="flex justify-between items-center">
              <Icons path="cart" className="w-6 h-6" />
              <span className="flex items-center justify-center bg-yellow-500 text-white text-xs rounded-full w-4 h-4">
                0
              </span>
            </div>
            <span className="ml-2">Cart</span>
          </button>
        </div>
      </div>
      <WishlistDrawer
        open={isWishlistOpen}
        onClose={() => setWishlistOpen(false)}
        updateWishlistCount={setWishlistCount}
      />
    </nav>
  );
};

export default Navbar;
