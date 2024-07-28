import React, { createContext, useContext, useState, ReactNode } from "react";

interface PicturesContextType {
  images: File[];
  mainImage: File;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setMainImage: React.Dispatch<React.SetStateAction<File>>;
}

const PicturesContext = createContext<PicturesContextType | undefined>(
  undefined
);

export const PicturesProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File>({} as File);

  return (
    <PicturesContext.Provider
      value={{ images, mainImage, setImages, setMainImage }}
    >
      {children}
    </PicturesContext.Provider>
  );
};

export const usePictures = () => {
  const context = useContext(PicturesContext);
  if (!context) {
    throw new Error("usePictures must be used within a PicturesProvider");
  }
  return context;
};

export default PicturesContext;
