import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

export function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    
    return null;
  }

  if (!isAuthenticated) {
    
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
