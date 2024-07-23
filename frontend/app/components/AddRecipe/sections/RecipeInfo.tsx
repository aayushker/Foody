import React from "react";
import { Textarea } from "@nextui-org/react";

const RecipeInfo = () => {
  return (
    <>
      <p className="text-black text-4xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Add something tasty 😋
      </p>
      <p className="text-black text-lg drop-shadow-md">
        Add some details so we can know what are you cooking today!
      </p>

      <Textarea
        isRequired
        label="Recipe Name"
        labelPlacement="outside"
        placeholder="Enter a tasty name for your recipe"
        className="max-w-xs"
      />

      
    </>
  );
};

export default RecipeInfo;
