import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RESERVED_ROUTES } from "../../constant";
import { AuthContext } from "../../contexts";
import { AppContext } from "../../contexts/appContext";
import { DefaultUserRole } from "../../lib/types/user";


export interface ProtectedRouteProps {
  connected?: boolean;
  role?: DefaultUserRole;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  children,
  connected = true,
}) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { setRestrictedRoute } = useContext(AppContext);

  if ((!!connected || !!role) && !user) {
    setRestrictedRoute(location.pathname + location.search + location.hash);
    return <Navigate to={RESERVED_ROUTES.LOGIN} />;
  }

  if (role && role !== user?.role) {
    setRestrictedRoute(location.pathname + location.search + location.hash);
    return <Navigate to={RESERVED_ROUTES.NOTFOUND} />;
  }

  return <>{children}</>;
};
