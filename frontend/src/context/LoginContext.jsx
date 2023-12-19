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
      const data = await response.json();

      if (response.ok) {
        alert(`Content de vous revoir ${credentials.username}`);
        setConnect(data);
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
