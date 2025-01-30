import React, { useEffect, useState } from "react";
import { Upload, Image, message, Button } from "antd";
import ImgCrop from "antd-img-crop";
import Icons from "../../../utils/Icons";
import { uploadImages } from "../../../utils/axiosService";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUploader = ({passHandleImageUpload }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [storedImages, setStoredImages] = useState([]);

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
      return [];  // Return empty array instead of null
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
        setFileList([]);
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
    passHandleImageUpload(handleImageUpload);
  }, [passHandleImageUpload]);

  return (
    <div>
      {/* <Button type="primary" onClick={handleImageUpload}>
        Upload Images
      </Button> */}
      <ImgCrop rotationSlider aspect={1 / 1}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={5}
          beforeUpload={(file) => {
            setFileList((prevList) => [...prevList, file]);
            return false; 
          }}
        >
          {fileList.length >= 5 ? null : (
            <button type="button" className="border-none bg-inherit">
              <Icons path="image-plus" className="text-gray-400 w-9 h-9" />
            </button>
          )}
        </Upload>
      </ImgCrop>

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
