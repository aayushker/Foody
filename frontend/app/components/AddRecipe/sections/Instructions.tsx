"use client";
import React from "react";
import { useState } from "react";
import dynamic from 'next/dynamic';
const QuillWrapper = dynamic(() => import('../ui/QuillWrapper'), { ssr: false });

const Instructions = () => {


  const [content, setContent] = useState<string>('');

  return (
    <>
      <p className="text-black text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Instructions 📄
      </p>
      <p className="text-black text-md drop-shadow-md">
        Tell us the sorcery behind your recipe! 🧙‍♂️
      </p>
      <QuillWrapper placeholder="Use your creativity to create a well written instructions section-" value={content} onChange={setContent} />
    </>
  );
};

export default Instructions;
