import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogin } from "../context/LoginContext";

function LoginRoute({ children }) {
  const { isUserConnected } = useLogin();

  return isUserConnected() ? <Navigate to="/map" /> : children;
}

LoginRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginRoute;
