import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogin } from "../context/LoginContext";

function LogoutUser({ children }) {
  const { isUserConnected } = useLogin();

  return !isUserConnected() ? <Navigate to="/map" /> : children;
}

LogoutUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LogoutUser;
