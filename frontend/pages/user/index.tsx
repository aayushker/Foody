import React from "react";
import UserLayout from "@/app/userLayout";
import UserPanel from "@/app/components/UserPanel";
import withAuth from "@/app/withAuth";
import { AuthProvider } from "@/app/AuthContext";
import { ThemeProvider } from "@/app/ThemeContext";
import ProtectedRoute from "@/app/ProtectedRoutes";
import "@/app/globals.css";

const Index = () => {
  return (
    <UserLayout>
      <AuthProvider>
        <ThemeProvider>
          <UserPanel />
        </ThemeProvider>
      </AuthProvider>
    </UserLayout>
  );
};

export default ProtectedRoute(withAuth(Index));
