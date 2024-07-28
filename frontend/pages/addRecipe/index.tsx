import React from "react";
import RootLayout from "@/app/layout";
import AddRecipe from "@/app/components/AddRecipe";
import  withAuth  from "@/app/withAuth";
import "@/app/globals.css";
import { AuthProvider } from "@/app/AuthContext";

const index = () => {
  return (
    <>
    <AuthProvider>
      <AddRecipe   />
    </AuthProvider>
      
    </>
  );
};

export default withAuth(index);
