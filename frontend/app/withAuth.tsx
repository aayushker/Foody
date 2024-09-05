import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";
import { useEffect, ComponentType, JSX } from "react";

const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, loading, router]);

    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
