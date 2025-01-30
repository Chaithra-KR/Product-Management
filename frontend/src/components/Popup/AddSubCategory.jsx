import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { addSubCategory, getCategories } from "../../../utils/axiosService";

const AddSubCategory = ({ isOpen, onClose }) => {
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        message.error("Failed to load categories.");
      }
    } catch (error) {
      message.error("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubCategorySubmit = async () => {
    if (!categoryId || !subCategoryName) {
      message.warning("Please fill in both the category and subcategory name.");
      return;
    }

    const data = { categoryId, name: subCategoryName };
    setLoading(true);

    try {
      const response = await addSubCategory(data);
      message.success(response.message);
      setCategoryId("");
      setSubCategoryName("");
      onClose();
    } catch (error) {
      message.error("Subcategory adding failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onClose={onClose}
      centered
      open={isOpen}
      width={400}
      footer={null}
      closable={false}
      maskStyle={false}
    >
      <form className="p-4">
        <h1 className="text-2xl font-medium text-center mb-8">
          Add Sub Category
        </h1>
        <div className="flex flex-col space-y-3">
          {/* Category Selection */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-200 focus:outline-none"
            disabled={loading}
          >
            <option value="">Select category</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>

          {/* Subcategory Name Input */}
          <input
            type="text"
            name="subCategoryName"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            placeholder="Enter subcategory name"
            className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handleSubCategorySubmit}
            disabled={loading}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            {loading ? "Adding..." : "ADD"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            DISCARD
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSubCategory;
