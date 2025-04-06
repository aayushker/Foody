import React, { createContext, useContext, useState, ReactNode } from "react";

interface PicturesContextType {
  images: File[];
  mainImage: File;
  cloudinaryUrls: string[];
  mainImageUrl: string | null;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setMainImage: React.Dispatch<React.SetStateAction<File>>;
  setCloudinaryUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setMainImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const PicturesContext = createContext<PicturesContextType | undefined>(
  undefined
);

export const PicturesProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File>({} as File);
  const [cloudinaryUrls, setCloudinaryUrls] = useState<string[]>([]);
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);

  return (
    <PicturesContext.Provider
      value={{ 
        images, 
        mainImage, 
        cloudinaryUrls,
        mainImageUrl,
        setImages, 
        setMainImage,
        setCloudinaryUrls,
        setMainImageUrl
      }}
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
