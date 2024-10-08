"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const QuillWrapper = dynamic(() => import("../ui/QuillWrapper"), {
  ssr: false,
});
import { useInstructions } from "@/app/components/context/InstructionsContext";

const Instructions = () => {
  const { instructions, setInstructions } = useInstructions();
  const [content, setContent] = useState<string>(instructions);

  useEffect(() => {
    setContent(instructions);
  }, [instructions]);

  const handleInstructions = (newContent: string) => {
    setContent(newContent);
    setInstructions(newContent);
  };

  return (
    <>
      <p className="text-black dark:text-white text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Instructions 📄
      </p>
      <p className="text-black dark:text-gray-300 text-md drop-shadow-md">
        Tell us the sorcery behind your recipe! 🧙‍♂️
      </p>
      <QuillWrapper
        placeholder="Use your creativity to create a well written instructions section-"
        value={content}
        onChange={handleInstructions}
      />
    </>
  );
};

export default Instructions;
