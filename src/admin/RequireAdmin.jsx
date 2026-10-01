import { Navigate, Outlet } from "react-router-dom";
import useAdminAuth from "./hooks/useAdminAuth";


const RequireAdmin = () => {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;