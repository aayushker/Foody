import React from "react";
import RootLayout from "@/app/layout";
import AddRecipeNavBar from "@/app/components/AddRecipe/AddRecipeNavBar";
import "@/app/globals.css";
import AddRecipeSidebar from "@/app/components/AddRecipe/AddRecipeSidebar";

const index = () => {
  return (
    <div className="">
      {/* <AddRecipeNavBar /> */}
      <AddRecipeSidebar />
    </div>
  );
};

export default index;
