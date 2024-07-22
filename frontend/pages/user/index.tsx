import React from "react";
import UserLayout from "@/app/userLayout";
import AdminSidebar from "@/app/components/UserPanel/UserSidebar";
import "@/app/globals.css";

const Index = () => {
  return (
    <UserLayout>
      <AdminSidebar />
    </UserLayout>
  );
};

export default Index;
