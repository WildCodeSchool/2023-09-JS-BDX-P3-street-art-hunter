import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

function LogoutUser() {
  const { isUserConnected } = useLogin();
  const { userCaptures } = useLoaderData();

  return !isUserConnected() ? (
    <Navigate to="/map" />
  ) : (
    <Outlet context={{ userCaptures }} />
  );
}

export default LogoutUser;
