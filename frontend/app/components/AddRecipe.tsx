import React from "react";
import AddRecipeNavBar from "@/app/components/AddRecipe/AddRecipeNavBar";
import AddRecipeSidebar from "@/app/components/AddRecipe/AddRecipeSidebar";
import { NutritionalInfoProvider } from "@/app/components/context/NutritionalInfoContext";
import { InstructionsProvider } from "@/app/components/context/InstructionsContext";

const AddRecipe = () => {
  return (
    <>
      <>{/* <AddRecipeNavBar /> */}</>

      <>
        <InstructionsProvider>
          <NutritionalInfoProvider>
            <AddRecipeSidebar />
          </NutritionalInfoProvider>
        </InstructionsProvider>
      </>
    </>
  );
};

export default AddRecipe;
