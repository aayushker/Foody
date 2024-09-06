import React from "react";
import AddRecipe from "@/app/components/AddRecipe";
import withAuth from "@/app/withAuth";
import { AuthProvider } from "@/app/AuthContext";
import { ThemeProvider } from "@/app/ThemeContext";
import ProtectedRoute from "@/app/ProtectedRoutes";
import "@/app/globals.css";

const index = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <AddRecipe />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default ProtectedRoute(withAuth(index));
