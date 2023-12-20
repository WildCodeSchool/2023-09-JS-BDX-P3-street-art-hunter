import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [connect, setConnect] = useState(false);

  const getLoggedUser = () =>
    JSON.parse(localStorage.getItem("loggedUser") ?? "{}");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    postal: "",
    city: "",
    password: "",
    confirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateUser = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveUserToLocalStorage = () => {
    localStorage.setItem("loggedUser", JSON.stringify(formData));
  };

  const loggedUser = getLoggedUser();

  const login = (credentials) => {
    const allUsers = getLoggedUser();
    const checkUser = allUsers.find(
      (user) =>
        user.pseudo === credentials.pseudo &&
        user.password === credentials.password
    );
    if (!checkUser) {
      alert("Identifiants incorrects !");
    } else {
      alert(`Content de vous revoir ${credentials.pseudo}`);
      setConnect(checkUser);

      return navigate("/");
    }
    return null;
  };

  const logout = () => {
    setConnect();
  };

  const contextValue = useMemo(
    () => ({
      formData,
      setFormData,
      handleChange,
      updateUser,
      saveUserToLocalStorage,
      login,
      logout,
      connect,
      setConnect,
      getLoggedUser,
      loggedUser,
    }),
    [formData, setFormData, connect]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
