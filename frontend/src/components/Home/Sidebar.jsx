import React, { useState } from "react";
import Icons from "../../../utils/Icons";

const Sidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categories, setCategories] = useState([
    {
      id: "laptop",
      name: "Laptop",
      subcategories: [
        { id: "hp", name: "Hp", checked: true },
        { id: "dell", name: "Dell", checked: false },
      ],
    },
    {
      id: "tablet",
      name: "Tablet",
      subcategories: [
        { id: "apple", name: "Apple", checked: false },
        { id: "samsung", name: "Samsung", checked: false },
      ],
    },
    {
      id: "headphones",
      name: "Headphones",
      subcategories: [
        { id: "bose", name: "Bose", checked: false },
        { id: "sony", name: "Sony", checked: false },
      ],
    },
  ]);

  const toggleCategoryExpand = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSubcategory = (categoryId, subcategoryId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.map((sub) =>
                sub.id === subcategoryId
                  ? { ...sub, checked: !sub.checked }
                  : sub
              ),
            }
          : category
      )
    );
  };

  return (
    <div className="w-80 flex-shrink-0">
      <h2 className="font-semibold text-primary mb-5">Categories</h2>
      <ul className="space-y-3">
        <li>
          <button className="flex items-center justify-between w-full text-left hover:text-blue-900">
            <span>All Categories</span>
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className="flex items-center justify-between w-full text-left hover:text-blue-900"
              onClick={() => toggleCategoryExpand(category.id)}
            >
              <span>{category.name}</span>
              <Icons
                path={expandedCategories[category.id] ? "down" : "right"}
                className="w-6 h-6 transition-transform"
              />
            </button>
            {expandedCategories[category.id] && (
              <div className="space-y-3 p-3">
                {category.subcategories.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-2">
                    <button
                      className={`relative w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        sub.checked ? "bg-gray-900" : "bg-blue-100"
                      }`}
                      onClick={() => toggleSubcategory(category.id, sub.id)}
                    >
                      {sub.checked && (
                        <Icons
                          path="check"
                          className="w-2.5 h-2.5 text-white"
                        />
                      )}
                    </button>
                    <span className="text-gray-900">{sub.name}</span>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
