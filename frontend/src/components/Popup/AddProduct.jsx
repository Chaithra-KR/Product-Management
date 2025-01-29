import React, { useState } from "react";
import { Modal, message } from "antd";
import Icons from "../../../utils/Icons";
import ImageUploader from "../Home/ImageUploader";

const AddProduct = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([{ ram: "", price: "", qty: 0 }]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAddVariant = () => {
    const isVariantEmpty = variants.some(
      (variant) => !variant.ram || !variant.price || !variant.qty
    );
    if (isVariantEmpty) {
      message.warning(
        "Please fill in all variant fields before adding a new one."
      );
      return;
    }

    setVariants([...variants, { ram: "", price: "", qty: 0 }]);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setVariants(updatedVariants);
  };

  const updateVariantQuantity = (index, increment) => {
    setVariants(
      variants.map((variant, i) =>
        i === index
          ? {
              ...variant,
              qty: Math.max(0, variant.qty + (increment ? 1 : -1)),
            }
          : variant
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!subCategory) newErrors.subCategory = "Sub category is required.";
    if (!description) newErrors.description = "Description is required.";
    variants.forEach((variant, index) => {
      if (!variant.name)
        newErrors[`variantName${index}`] = "Variant name is required.";
      if (!variant.price || isNaN(variant.price))
        newErrors[`variantPrice${index}`] = "Valid price is required.";
      if (variant.qty <= 0 || isNaN(variant.qty))
        newErrors[`variantQty${index}`] = "Valid quantity is required.";
    });
    if (images.length === 0) {
      newErrors.images = "At least one image is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const productData = {
      title,
      subcategory: subCategory,
      description,
      variants: variants.map((variant) => ({
        name: variant.name,
        price: parseFloat(variant.price),
        qty: variant.qty,
      })),
      images,
    };

    console.log("Product data to submit:", productData);
    onClose(); // Close modal after submission
  };

  const resetFields = () => {
    setTitle("");
    setSubCategory("");
    setDescription("");
    setImages([]);
    setErrors({});
  };

  return (
    <Modal
      onClose={onClose}
      centered
      open={isOpen}
      width={800}
      footer={null}
      closable={false}
      maskStyle={false}
    >
      <div className="p-4 h-[36rem] overflow-y-auto">
        <h1 className="text-2xl font-medium text-center mb-8">Add Product</h1>

        <div className="space-y-4">
          {/* Title */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-400 text-lg">Title :</label>
            <div className="w-full">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.title && errors.title}
              </p>
            </div>
          </div>

          {/* Variants */}
          <div className="flex items-start">
            <label className="w-32 text-gray-400 text-lg">Variants :</label>
            <div className="flex-1 space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="flex-1 flex gap-4">
                    <div className="flex justify-between items-center gap-2">
                      <label className="text-sm text-gray-400 mb-1">Ram:</label>
                      <input
                        type="text"
                        value={variant.ram}
                        onChange={(e) =>
                          handleVariantChange(index, "ram", e.target.value)
                        }
                        className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <label className="text-sm text-gray-400 mb-1">
                        Price:
                      </label>
                      <input
                        type="text"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(index, "price", e.target.value)
                        }
                        className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <label className="text-sm text-gray-400 mb-1">QTY:</label>
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateVariantQuantity(index, false)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Icons
                            path="left"
                            className="w-6 h-6 text-gray-400"
                          />
                        </button>
                        <span className="w-8 text-center">{variant.qty}</span>
                        <button
                          onClick={() => updateVariantQuantity(index, true)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Icons
                            path="right"
                            className="w-6 h-6 text-gray-400"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Icons path="round-close" />
                    </button>
                  )}
                </div>
              ))}

              <div className="flex justify-end items-end">
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-700"
                >
                  Add Variant
                </button>
              </div>
            </div>
          </div>

          {/* Sub category */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-400 text-lg">Sub category :</label>
            <div className="w-full">
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.subCategory && errors.subCategory}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-4">
            <label className="w-32 text-gray-400 text-lg">Description :</label>
            <div className="w-full">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.description && errors.description}
              </p>
            </div>
          </div>

          {/* Image upload */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-400 text-lg">Images :</label>
            <div className="w-full">
              <ImageUploader setImages={setImages} />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => {
              resetFields();
              onClose();
            }}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            DISCARD
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            ADD
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
