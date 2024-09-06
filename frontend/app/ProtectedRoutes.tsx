import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

const ProtectedRoute = (Component: ComponentType) => {
  return () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/");
      }
    }, [user]);

    if (!user) return null;

    return <Component />;
  };
};

export default ProtectedRoute;
