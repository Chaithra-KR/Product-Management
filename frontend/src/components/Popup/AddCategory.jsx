import React, { useState } from "react";
import { Modal, message } from "antd";
import { addCategory } from "../../../utils/axiosService";

const AddCategory = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategorySubmit = async () => {
    if (!categoryName) {
      message.warning("Please enter a category name.");
      return;
    }

    setLoading(true);

    try {
      const response = await addCategory({ name: categoryName });
      message.success(response.message);
      setCategoryName("");
      onClose();
    } catch (error) {
      message.error("Category adding failed. Please try again.");
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
      <div className="p-4">
        <h1 className="text-2xl font-medium text-center mb-8">Add Category</h1>
        <input
          type="text"
          name="name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-200 focus:outline-none"
        />
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="primary"
            onClick={handleCategorySubmit}
            loading={loading}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            ADD
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            DISCARD
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCategory;
