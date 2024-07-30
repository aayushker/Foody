import React from "react";
import UserLayout from "@/app/userLayout";
import UserPanel from "@/app/components/UserPanel";
import withAuth from "@/app/withAuth";
import "@/app/globals.css";
import { AuthProvider } from "@/app/AuthContext";

const Index = () => {
  return (
    <UserLayout>
      <AuthProvider>
        <UserPanel />
      </AuthProvider>
    </UserLayout>
  );
};

export default withAuth(Index);
