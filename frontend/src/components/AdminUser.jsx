import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogin } from "../context/LoginContext";

function AdminRoute({ children }) {
  const { isUserAdmin } = useLogin();

  return isUserAdmin() ? children : <Navigate to="/" />;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
