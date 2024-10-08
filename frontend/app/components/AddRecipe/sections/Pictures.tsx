import React, { useState } from "react";
import { Input, Image, Spacer, Button } from "@nextui-org/react";
import { usePictures } from "@/app/components/context/PicturesContext";

const Pictures = () => {
  const { images, mainImage, setImages, setMainImage } = usePictures();

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
  };

  return (
    <>
      <p className="text-black dark:text-white text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Pictures 📸
      </p>
      <p className="text-black dark:text-gray-300 text-md drop-shadow-md">
        Add pictures to make your recipe stand out! 🌟
      </p>

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
                  src={URL.createObjectURL(src)}
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
            src={URL.createObjectURL(mainImage)}
            alt="Main Display Image"
            style={{ width: "100%", maxWidth: "600px", height: "auto" }}
          />
        )}
      </div>
    </>
  );
};

export default Pictures;
