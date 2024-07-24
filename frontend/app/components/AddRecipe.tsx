import React from "react";
import AddRecipeNavBar from "@/app/components/AddRecipe/AddRecipeNavBar";
import AddRecipeSidebar from "@/app/components/AddRecipe/AddRecipeSidebar";
import { NutritionalInfoProvider } from "@/app/components/context/NutritionalInfoContext";
import { InstructionsProvider } from "@/app/components/context/InstructionsContext";
import Ingredients from "./AddRecipe/sections/Ingredients";
import { IngredientsProvider } from "./context/IngredientsContext";

const AddRecipe = () => {
  return (
    <>
      <>{/* <AddRecipeNavBar /> */}</>

      <>
        <IngredientsProvider>
          <InstructionsProvider>
            <NutritionalInfoProvider>
              <AddRecipeSidebar />
            </NutritionalInfoProvider>
          </InstructionsProvider>
        </IngredientsProvider>
      </>
    </>
  );
};

export default AddRecipe;
