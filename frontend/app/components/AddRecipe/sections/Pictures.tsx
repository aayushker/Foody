import React, { useState } from 'react';
import { Input, Image, Spacer } from '@nextui-org/react';

const Pictures = () => {
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setMainImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <p className="text-black text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Pictures 📸
      </p>
      <p className="text-black text-md drop-shadow-md">
        Add pictures to make your recipe stand out! 🌟
      </p>

      <div className="mb-4 pt-8">
        <Input
          type="file"
          multiple
          label="Add Images"
          onChange={handleImageChange}
          accept="image/*"
          style={{ width: '100%' }} 
          className='max-w-sm'
          description="Add multiple images to showcase your recipe."
        />
        <Spacer y={1} />
        {images.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {images.map((src, index) => (
              <Image key={index} src={src} alt={`Image ${index}`} style={{ width: '150px', height: 'auto' }} />
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
          style={{ width: '100%' }} 
          className='max-w-sm'
        />
        <Spacer y={1} />
        {mainImage && (
          <Image src={mainImage} alt="Main Display Image" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
        )}
      </div>
    </>
  );
}

export default Pictures;