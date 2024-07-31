import React from "react";
import Explore from "@/app/components/Explore";
import "@/app/globals.css";
import { AuthProvider } from "@/app/AuthContext";
import { ThemeProvider } from "@/app/ThemeContext";

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

export default index;
