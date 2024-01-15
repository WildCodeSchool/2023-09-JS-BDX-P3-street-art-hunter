import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogin } from "../context/LoginContext";

function AdminUser({ children }) {
  const { isUserAdmin } = useLogin();

  return isUserAdmin() ? children : <Navigate to="/map" />;
}

AdminUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminUser;
