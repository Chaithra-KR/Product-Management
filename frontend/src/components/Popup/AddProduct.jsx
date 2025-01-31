import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import Icons from "../../../utils/Icons";
import ImageUploader from "../Home/ImageUploader";
import {
  addProduct,
  getSubCategories,
  updateProduct,
} from "../../../utils/axiosService";

const AddProduct = ({ isOpen, onClose, existingProduct = null }) => {
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([{ name: "", price: "", qty: 0 }]);
  const [errors, setErrors] = useState({});
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [handleImageUpload, setHandleImageUpload] = useState(null);

  // Fetching subcategories from the server
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getSubCategories();
      if (response.success) {
        const options = response.data.map((category) => ({
          label: category.name,
          value: category._id,
        }));
        setSubCategoryOptions(options);
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
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleAddVariant = () => {
    const isVariantEmpty = variants.some(
      (variant) => !variant.name || !variant.price || variant.qty <= 0
    );

    if (isVariantEmpty) {
      message.warning(
        "Please fill in all variant fields before adding a new one."
      );
      return;
    }

    setVariants([...variants, { name: "", price: "", qty: 0 }]);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const receiveHandleImageUpload = (childFunction) => {
    setHandleImageUpload(() => childFunction);
  };

  useEffect(() => {
    if (existingProduct) {
      setTitle(existingProduct.title);
      setDescription(existingProduct.description);
      setVariants(
        existingProduct.variants || [{ name: "", price: "", qty: 0 }]
      );

      if (subCategoryOptions.length > 0) {
        const defaultSubCategory = subCategoryOptions.find(
          (category) => category.value === existingProduct.subcategory._id
        );
        if (defaultSubCategory) {
          setSubCategory(defaultSubCategory.value);
        }
      }
    } else {
      resetFields();
    }
  }, [existingProduct, subCategoryOptions]);

  const handleSubmit = async () => {
    if (!handleImageUpload) {
      message.error("Image upload function not available.");
      return;
    }

    const uploadedImages = await handleImageUpload();
    console.log("Upload result: ", uploadedImages);

    if (!uploadedImages || uploadedImages.length === 0) {
      message.error("Image upload failed. Please try again.");
      return;
    }

    if (!validateForm()) return;

    const data = {
      title,
      subcategory: subCategory,
      description,
      variants: variants.map((variant) => ({
        name: variant.name,
        price: parseFloat(variant.price),
        qty: variant.qty.toString(),
      })),
      images: uploadedImages,
    };

    try {
      let response;
      if (existingProduct) {
        // Update product
        response = await updateProduct(existingProduct._id, data);
      } else {
        // Add new product
        response = await addProduct(data);
      }
      message.success(response.message);
      resetFields();
      onClose();
    } catch (error) {
      message.error("Product adding failed. Please try again.");
    }
  };

  const resetFields = () => {
    setTitle("");
    setSubCategory("");
    setDescription("");
    setVariants([{ name: "", price: "", qty: 0 }]);
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
      <div className="p-4 h-[41rem] overflow-y-auto">
        <h1 className="text-2xl font-medium text-center mb-8">
          {existingProduct ? "Update Product" : "Add Product"}
        </h1>

        <div className="space-y-4">
          {/* Title */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-400 text-base">Title :</label>
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
            <label className="w-32 text-gray-400 text-base">Variants :</label>
            <div className="flex-1 space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="flex-1 flex gap-4">
                    <div className="flex justify-between items-center gap-2">
                      <label className="text-sm text-gray-400 mb-1">Ram:</label>
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(e) =>
                          handleVariantChange(index, "name", e.target.value)
                        }
                        className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <label className="text-sm text-gray-400 mb-1">
                        Price:
                      </label>
                      <input
                        type="number"
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
            <label className="w-32 text-gray-400 text-base">
              Sub category :
            </label>
            <div className="w-full">
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
              >
                <option value="">Select Subcategory</option>
                {subCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm mt-1">
                {errors.subCategory && errors.subCategory}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-400 text-base">
              Description :
            </label>
            <div className="w-full">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 rounded-lg border-2 border-gray-300 p-2 focus:border-blue-200 focus:ring-blue-border-blue-200 focus:outline-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.description && errors.description}
              </p>
            </div>
          </div>

          {/* Image upload */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-400 text-base">Images :</label>
            <div className="w-full">
              <ImageUploader
                passHandleImageUpload={receiveHandleImageUpload}
                previousImages={existingProduct?.images}
              />
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
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            {loading ? "Loading..." : existingProduct ? "UPDATE" : "ADD"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
