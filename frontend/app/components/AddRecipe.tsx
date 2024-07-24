import React from "react";
import AddRecipeNavBar from "@/app/components/AddRecipe/AddRecipeNavBar";
import AddRecipeSidebar from "@/app/components/AddRecipe/AddRecipeSidebar";
import { RecipeInfoProvider } from "@/app/components/context/RecipeInfoContext";
import { IngredientsProvider } from "@/app/components/context/IngredientsContext";
import { InstructionsProvider } from "@/app/components/context/InstructionsContext";
import { PicturesProvider } from "@/app/components/context/PicturesContext";
import { NutritionalInfoProvider } from "@/app/components/context/NutritionalInfoContext";

const AddRecipe = () => {
  return (
    <>
      <>{/* <AddRecipeNavBar /> */}</>

      <>
        <RecipeInfoProvider>
          <IngredientsProvider>
            <InstructionsProvider>
              <PicturesProvider>
                <NutritionalInfoProvider>
                  <AddRecipeSidebar />
                </NutritionalInfoProvider>
              </PicturesProvider>
            </InstructionsProvider>
          </IngredientsProvider>
        </RecipeInfoProvider>
      </>
    </>
  );
};

export default AddRecipe;
