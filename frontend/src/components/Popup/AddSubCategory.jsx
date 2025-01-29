import { Modal } from "antd";
import React from "react";

const AddSubCategory = ({ isOpen, onClose }) => {
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
        <h1 className="text-2xl font-medium text-center mb-8">
          Add Sub Category
        </h1>
        <div className="flex flex-col space-y-3">
          <select
            name="Select category"
            className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
          >
            <option value="">Select category</option>
            <option value="option1">option1</option>
          </select>
          <input
            type="text"
            name="name"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter sub category name"
            className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
          />
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            ADD
          </button>
          <button className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            DISCARD
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSubCategory;
