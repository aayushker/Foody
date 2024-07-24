import React from "react";
import AddRecipeNavBar from "@/app/components/AddRecipe/AddRecipeNavBar";
import AddRecipeSidebar from "@/app/components/AddRecipe/AddRecipeSidebar";
import { NutritionalInfoProvider } from "@/app/components/context/NutritionalInfoContext";
import { InstructionsProvider } from "@/app/components/context/InstructionsContext";
import { IngredientsProvider } from "./context/IngredientsContext";
import { RecipeInfoProvider } from "./context/RecipeInfoContext";

const AddRecipe = () => {
  return (
    <>
      <>{/* <AddRecipeNavBar /> */}</>

      <>
        <RecipeInfoProvider>
          <IngredientsProvider>
            <InstructionsProvider>
              <NutritionalInfoProvider>
                <AddRecipeSidebar />
              </NutritionalInfoProvider>
            </InstructionsProvider>
          </IngredientsProvider>
        </RecipeInfoProvider>
      </>
    </>
  );
};

export default AddRecipe;
