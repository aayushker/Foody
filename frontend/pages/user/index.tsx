import React from "react";
import UserLayout from "@/app/userLayout";
import UserPanel from "@/app/components/UserPanel";
import withAuth from "@/app/withAuth";
import "@/app/globals.css";

const Index = () => {
  return (
    <UserLayout>
      <UserPanel />
    </UserLayout>
  );
};

export default withAuth(Index);
