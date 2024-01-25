import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

function AdminUser() {
  const { isUserAdmin } = useLogin();

  return isUserAdmin() ? <Outlet /> : <Navigate to="/map" />;
}

export default AdminUser;
