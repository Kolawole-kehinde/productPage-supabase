import { Navigate, Outlet } from "react-router";
import { UseAuth } from "../../hooks/useAuth";



export const ProtectedRoute = () => {
  const { user } = UseAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
};
