import React, { useState, useEffect } from "react";
import Icons from "../../../utils/Icons";
import { getSubCategories } from "../../../utils/axiosService";
import { message } from "antd";

const Sidebar = ({ selectedSubcategories, setSelectedSubcategories }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubcategories = async () => {
    try {
      const response = await getSubCategories();
      if (response.success) {
        const formattedCategories = response.data.reduce((acc, subcategory) => {
          const categoryId = subcategory.category._id;
          if (!acc[categoryId]) {
            acc[categoryId] = {
              name: subcategory.category.name,
              subcategories: [],
            };
          }
          acc[categoryId].subcategories.push({
            id: subcategory._id,
            name: subcategory.name,
            checked: false,
          });
          return acc;
        }, {});

        setCategories(Object.values(formattedCategories));
      } else {
        message.error("Failed to load subcategories.");
      }
    } catch (error) {
      message.error("Error fetching subcategories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const toggleCategoryExpand = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSubcategory = (subcategoryId) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subcategoryId)) {
        return prev.filter((id) => id !== subcategoryId);
      }
      return [...prev, subcategoryId];
    });
  };

  return (
    <div className="w-80 flex-shrink-0">
      <h2 className="font-semibold text-primary mb-5">Categories</h2>
      <ul className="space-y-3">
        <li>
          <button
            onClick={() => setSelectedSubcategories([])}
            className="flex items-center justify-between w-full text-left hover:text-blue-900"
          >
            <span>All Categories</span>
          </button>
        </li>
        {loading ? (
          <div>Loading...</div>
        ) : (
          categories.map((category) => (
            <li key={category.name}>
              <button
                className="flex items-center justify-between w-full text-left hover:text-blue-900"
                onClick={() => toggleCategoryExpand(category.name)}
              >
                <span>{category.name}</span>
                <Icons
                  path={expandedCategories[category.name] ? "down" : "right"}
                  className="w-6 h-6 transition-transform"
                />
              </button>
              {expandedCategories[category.name] && (
                <div className="space-y-3 p-3">
                  {category.subcategories.map((sub) => (
                    <div key={sub.id} className="flex items-center gap-2">
                      <button
                        className={`relative w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          selectedSubcategories.includes(sub.id)
                            ? "bg-gray-900"
                            : "bg-blue-100"
                        }`}
                        onClick={() => toggleSubcategory(sub.id)}
                      >
                        {selectedSubcategories.includes(sub.id) && (
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
          ))
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
