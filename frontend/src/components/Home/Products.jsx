import React, { useState } from "react";
import Icons from "../../../utils/Icons";
import { LoginBg } from "../../assets/image";

const Products = () => {
  const [expandedCategories, setExpandedCategories] = useState({
    Laptop: true,
  });

  const products = Array(6).fill({
    name: "HP AMD Ryzen 3",
    price: 529.99,
    image: LoginBg,
  });

  const [categories, setCategories] = useState([
    { id: "hp", name: "Hp", checked: true },
    { id: "dell", name: "Dell", checked: false },
  ]);

  const toggleCategory = (id) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, checked: !category.checked }
          : category
      )
    );
  };
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border-2 border-gray-200 shadow p-4 relative"
          >
            <button className="absolute top-5 right-6 p-1.5 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors">
              <Icons path="heart" className="w-5 h-5 text-blue-900" />
            </button>
            <div className="mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-2xl cursor-pointer"
              />
            </div>
            <h3 className="text-lg font-medium text-blue-900 mb-2 cursor-pointer">
              {product.name}
            </h3>
            <p className="text-gray-900 font-semibold">${product.price}</p>
            <div className="flex mt-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 h-20 flex items-center justify-between">
        <p className="text-sm text-gray-600">0 of 456 items</p>
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white">
            1
          </button>
          {[2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              {num}
            </button>
          ))}
          <span>...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            10
          </button>
        </div>
        <div>
          <span>show</span>
          <select className="ml-4 px-2 py-1 border rounded-lg">
            <option>10 rows</option>
            <option>20 rows</option>
            <option>50 rows</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Products;
