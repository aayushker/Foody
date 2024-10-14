"use client";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

const ProtectedRoute = (Component: ComponentType) => {
  return (props: any) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (!storedToken) {
        console.log("Redirecting to home page");
        router.push("/");
      }
    }, [router]);

    if (token === null) return <div>Loading...</div>;
    if (!token) return null;

    return <Component {...props} />;
  };
};

export default ProtectedRoute;