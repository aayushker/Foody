import React from "react";
import Explore from "@/app/components/Explore";
import { AuthProvider } from "@/app/AuthContext";
import { ThemeProvider } from "@/app/ThemeContext";
import ProtectedRoute from "@/app/ProtectedRoutes";
import "@/app/globals.css";

const index = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Explore />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default ProtectedRoute(index);
