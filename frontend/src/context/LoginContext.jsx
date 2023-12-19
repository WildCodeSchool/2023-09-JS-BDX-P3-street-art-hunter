import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const loginContext = createContext();

function LoginProvider({ children }) {
  const [connect, setConnect] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const users = await response.json();

      const foundUser = users.find(
        (user) =>
          user.username === credentials.pseudo &&
          user.password === credentials.password
      );

      if (foundUser) {
        alert(`Content de vous revoir ${credentials.pseudo}`);
        setConnect(foundUser);
        navigate("/");
      } else {
        alert("Identifiants incorrects !");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const context = useMemo(() => ({ login, connect, setConnect }), [connect]);

  return (
    <loginContext.Provider value={context}>{children}</loginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
export const useLogin = () => useContext(loginContext);
