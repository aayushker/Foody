import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PicturesContextType {
  images: string[];
  mainImage: string | null;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setMainImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const PicturesContext = createContext<PicturesContextType | undefined>(undefined);

export const PicturesProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);

  return (
    <PicturesContext.Provider value={{ images, mainImage, setImages, setMainImage }}>
      {children}
    </PicturesContext.Provider>
  );
}

export const usePictures = () => {
  const context = useContext(PicturesContext);
  if (!context) {
    throw new Error("usePictures must be used within a PicturesProvider");
  }
  return context;
}

export default PicturesContext;
