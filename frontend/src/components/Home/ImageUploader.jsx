import React, { useEffect, useState } from "react";
import { Upload, Image, message, Button } from "antd";
import ImgCrop from "antd-img-crop";
import Icons from "../../../utils/Icons";
import { uploadImages } from "../../../utils/axiosService";
import baseUrl from "../../../utils/cryptUrl";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUploader = ({ passHandleImageUpload, previousImages = [] }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]); // To store newly selected files
  const [storedImages, setStoredImages] = useState([]); // To store uploaded images' data

  // Set initial file list with previous images if editing
  useEffect(() => {
    if (previousImages && previousImages.length > 0) {
      const initialFileList = previousImages.map((img) => ({
        uid: img, // Unique identifier (usually URL or image id)
        name: img, // Image name (you can modify this depending on your data structure)
        status: 'done', // Status of file
        url: `${baseUrl}/uploads/${img}`, // URL for preview
      }));
      setFileList(initialFileList);
    }
  }, [previousImages]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      try {
        file.preview = await getBase64(file.originFileObj);
      } catch (error) {
        console.error("Image preview failed:", error);
        return;
      }
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleImageUpload = async () => {
    if (fileList.length === 0) {
      message.warning("No file selected.");
      return []; // Return empty array instead of null
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    try {
      const res = await uploadImages(formData);
      if (res.success) {
        message.success("Images uploaded successfully!");
        setStoredImages([...storedImages, ...res.data]);
        setFileList([]); // Clear file list after upload
        return res.data; // Ensure this returns an array
      } else {
        message.error(res.message || "Upload failed.");
        return [];
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload failed.");
      return [];
    }
  };

  useEffect(() => {
    passHandleImageUpload(handleImageUpload); // Pass handleImageUpload function to parent
  }, [passHandleImageUpload]);

  return (
    <div>
      <ImgCrop rotationSlider aspect={1 / 1}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={5}
          beforeUpload={(file) => {
            setFileList((prevList) => [...prevList, file]);
            return false; // Prevent automatic upload
          }}
        >
          {fileList.length >= 5 ? null : (
            <button type="button" className="border-none bg-inherit">
              <Icons path="image-plus" className="text-gray-400 w-9 h-9" />
            </button>
          )}
        </Upload>
      </ImgCrop>

      {/* Preview for newly uploaded images */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default ImageUploader;
