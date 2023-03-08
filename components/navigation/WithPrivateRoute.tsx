import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface WithPrivateRouteProps {
  children: ReactNode;
}

export default function WithPrivateRoute({ children }: WithPrivateRouteProps) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!currentUser && !loading) router.push("/login");
  }, [currentUser, loading, router]);

  // No need for loading check since loading must be true if !currentUser
  return <>{currentUser && children}</>;
}
