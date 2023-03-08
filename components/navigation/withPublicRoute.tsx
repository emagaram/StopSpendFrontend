import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface WithPublicRouteProps {
  children: JSX.Element | JSX.Element[];
}

export default function WithPublicRoute({ children }: WithPublicRouteProps) {
  const { currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/my-setup");
  }, []);
  useEffect(() => {
    // No need for loading check since loading must be true if !currentUser
    if (currentUser) router.push("/my-setup");
  }, [currentUser]);

  // Can't do loading check otherwise static render won't work
  return <>{!currentUser && children}</>;
}
