import React from "react";
import RecipeAssistant from "@/app/components/RecipeAssistant";
import { AuthProvider } from "@/app/AuthContext";
import { ThemeProvider } from "@/app/ThemeContext";
import ProtectedRoute from "@/app/ProtectedRoutes";
import "@/app/globals.css";

const RecipeAssistantPage = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <RecipeAssistant />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default RecipeAssistantPage; 