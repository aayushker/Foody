import React, { useState } from "react";
import { Input, Image, Spacer, Button, Progress } from "@nextui-org/react";
import { usePictures } from "@/app/components/context/PicturesContext";
import axios from "axios";
import baseurl from "@/baseurl";

const Pictures = () => {
  const { 
    images, 
    mainImage, 
    cloudinaryUrls,
    mainImageUrl,
    setImages, 
    setMainImage,
    setCloudinaryUrls,
    setMainImageUrl
  } = usePictures();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    // Also remove the corresponding Cloudinary URL if it exists
    if (cloudinaryUrls[index]) {
      setCloudinaryUrls(cloudinaryUrls.filter((_, i) => i !== index));
    }
  };

  const uploadImageToCloudinary = async (file: File, isMainImage = false) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${baseurl}/api/upload-image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data && response.data.url) {
        if (isMainImage) {
          setMainImageUrl(response.data.url);
        } else {
          setCloudinaryUrls([...cloudinaryUrls, response.data.url]);
        }
        return response.data.url;
      }
      return null;
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
      return null;
    }
  };

  const uploadAllImages = async () => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Upload main image if it exists
      if (mainImage && mainImage instanceof File) {
        await uploadImageToCloudinary(mainImage, true);
      }

      // Upload additional images
      for (let i = 0; i < images.length; i++) {
        if (!cloudinaryUrls[i]) {
          await uploadImageToCloudinary(images[i]);
        }
      }

      setUploadProgress(100);
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("Failed to upload some images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <p className="text-black dark:text-white text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Pictures 📸
      </p>
      <p className="text-black dark:text-gray-300 text-md drop-shadow-md">
        Add pictures to make your recipe stand out! 🌟
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4 pt-8">
        <Input
          type="file"
          multiple
          label="Add Images"
          onChange={handleImageChange}
          accept="image/*"
          style={{ width: "100%" }}
          className="max-w-sm"
          description="Add multiple images to showcase your recipe."
        />
        <Spacer y={1} />
        {images.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {images.map((src, index) => (
              <div
                key={index}
                style={{ position: "relative", width: "150px", height: "auto" }}
              >
                <Image
                  src={cloudinaryUrls[index] || URL.createObjectURL(src)}
                  alt={`Image ${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    padding: "0",
                    minWidth: "20px",
                    height: "20px",
                    zIndex: 10,
                  }}
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <Input
          type="file"
          label="Main Display Image"
          onChange={handleMainImageChange}
          accept="image/*"
          style={{ width: "100%" }}
          className="max-w-sm"
        />
        <Spacer y={1} />
        {mainImage && mainImage instanceof File && (
          <Image
            src={mainImageUrl || URL.createObjectURL(mainImage)}
            alt="Main Display Image"
            style={{ width: "100%", maxWidth: "600px", height: "auto" }}
          />
        )}
      </div>

      <div className="mt-6">
        <Button 
          color="primary" 
          onClick={uploadAllImages} 
          isLoading={isUploading}
          disabled={isUploading || (images.length === 0 && !mainImage)}
        >
          {isUploading ? "Uploading..." : "Upload Images to Cloud"}
        </Button>
        
        {isUploading && (
          <div className="mt-4">
            <Progress 
              value={uploadProgress} 
              color="primary" 
              showValueLabel={true}
            />
            <p className="text-sm text-gray-500 mt-2">
              Uploading images to Cloudinary... {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Pictures;
