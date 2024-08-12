import React from "react";
import Addrecipe from "@/app/components/AddRecipe/Addrecipe";
import { RecipeInfoProvider } from "@/app/components/context/RecipeInfoContext";
import { IngredientsProvider } from "@/app/components/context/IngredientsContext";
import { InstructionsProvider } from "@/app/components/context/InstructionsContext";
import { PicturesProvider } from "@/app/components/context/PicturesContext";
import { NutritionalInfoProvider } from "@/app/components/context/NutritionalInfoContext";

const AddRecipe = () => {
  return (
    <>
      <RecipeInfoProvider>
        <IngredientsProvider>
          <InstructionsProvider>
            <PicturesProvider>
              <NutritionalInfoProvider>
                <Addrecipe />
              </NutritionalInfoProvider>
            </PicturesProvider>
          </InstructionsProvider>
        </IngredientsProvider>
      </RecipeInfoProvider>
    </>
  );
};

export default AddRecipe;
