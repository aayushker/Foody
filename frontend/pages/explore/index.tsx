import React from "react";
import Explore from "@/app/components/Explore";
import "@/app/globals.css";
import { AuthProvider } from "@/app/AuthContext";

const index = () => {
  return (
    <>
      <AuthProvider>
        <Explore />
      </AuthProvider>
    </>
  );
};

export default index;
