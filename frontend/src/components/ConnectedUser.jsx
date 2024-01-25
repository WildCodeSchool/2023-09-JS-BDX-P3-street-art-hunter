import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogin } from "../context/LoginContext";

function LoggedUser({ children }) {
  const { isUserConnected } = useLogin();

  return isUserConnected() ? <Navigate to="/map" /> : children;
}

LoggedUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoggedUser;
