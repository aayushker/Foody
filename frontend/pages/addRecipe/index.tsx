import React from "react";
import RootLayout from "@/app/layout";
import AddRecipeNavBar from "@/app/components/AddRecipe/AddRecipeNavBar";
import "@/app/globals.css";
import AddRecipeHero from "@/app/components/AddRecipe/AddRecipeHero";
import AddRecipeInput from "@/app/components/AddRecipe/AddRecipeInput";

const index = () => {
  return (
    <div className="">
      <AddRecipeNavBar />
      <AddRecipeHero />
      <AddRecipeInput />
    </div>
      
  );
};

export default index;
