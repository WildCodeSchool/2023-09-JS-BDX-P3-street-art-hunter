import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const loginContext = createContext();

export default function LoginProvider({ children }) {
  const navigate = useNavigate();

  const isUserConnected = () => {
    if (localStorage.getItem("user")) {
      return true;
    }
    return false;
  };

  const isUserAdmin = () => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.is_admin === 1) {
        return true;
      }
    }
    return false;
  };

  const login = useCallback(async (credentials) => {
    try {
      const response = await fetch("http://localhost:3310/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        alert(`Content de vous revoir ${credentials.pseudo}`);
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        alert("Identifiants incorrects !");
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
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
