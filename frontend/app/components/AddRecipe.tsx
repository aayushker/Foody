import React from "react";
import AddRecipeNavBar from "@/app/components/AddRecipe/AddRecipeNavBar";
import AddRecipeSidebar from "@/app/components/AddRecipe/AddRecipeSidebar";
import { NutritionalInfoProvider } from "@/app/components/context/NutritionalInfoContext";

const AddRecipe = () => {
  return (
    <>
      <>{/* <AddRecipeNavBar /> */}</>

      <>
        <NutritionalInfoProvider>
          <AddRecipeSidebar />
        </NutritionalInfoProvider>
      </>
    </>
  );
};

export default AddRecipe;
