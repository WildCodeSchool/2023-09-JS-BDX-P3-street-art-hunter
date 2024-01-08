import axios from "axios";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const loginContext = createContext();

export default function LoginProvider({ children }) {
  const navigate = useNavigate();

  const isUserConnected = () => {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  };

  const isUserAdmin = () => {
    if (localStorage.getItem("token")) {
      const data = localStorage.getItem("token");
      const user = jwtDecode(data);
      if (user.admin === 1) {
        return true;
      }
    }
    return false;
  };

  const login = useCallback(async (credentials) => {
    try {
      axios
        .post("http://localhost:3310/api/login/", credentials)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const context = useMemo(
    () => ({ login, isUserConnected, isUserAdmin, logout }),
    []
  );

  return (
    <loginContext.Provider value={context}>{children}</loginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { loginContext, LoginProvider };
export const useLogin = () => useContext(loginContext);
