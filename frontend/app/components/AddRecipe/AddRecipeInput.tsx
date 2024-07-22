import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import your QuillWrapper component with SSR disabled
const QuillWrapper = dynamic(() => import('./QuillWrapper'), { ssr: false });

const AddRecipePage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<number | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setImages([...images, ...uploadedFiles]);
    }
  };

  return (
    <div>

      <QuillWrapper placeholder="Start typing..." value={content} onChange={setContent} />
      
      <div>
        <h2>Upload Images</h2>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        {images.length > 0 && (
          <div>
            <h3>Select Main Image</h3>
            <div style={{ display: 'flex', overflowX: 'scroll' }}>
              {images.map((image, index) => (
                <div key={index} style={{ margin: '0 10px', textAlign: 'center' }}>
                  <Image 
                    src={URL.createObjectURL(image)} 
                    alt={`Uploaded ${index}`} 
                    width={100} 
                    height={100} 
                    onClick={() => setMainImage(index)}
                    style={{ cursor: 'pointer', border: mainImage === index ? '2px solid blue' : 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecipePage;
