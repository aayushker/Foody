import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface QuillWrapperProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const QuillWrapper: React.FC<QuillWrapperProps> = ({ placeholder, value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      ['clean']
    ]
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder={placeholder || 'Start typing...'}
    />
  );
};

export default QuillWrapper;
