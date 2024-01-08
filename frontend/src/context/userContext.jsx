import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  // const navigate = useNavigate();

  // Récupère les infos de l'utilisateur actuellement connecté
  // const getLoggedUser = () =>
  //   JSON.parse(localStorage.getItem("loggedUser") ?? "{}");

  // const [loggedUser, setLoggedUser] = useState(getLoggedUser());
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    postcode: "",
    city: "",
    password: "",
    confirmation: "",
  });

  const updateRegisterForm = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  // Récupère tous les utilisateurs stockés en BDD
  // const getUsersFromDatabase = () => {
  //   return JSON.parse(localStorage.getItem("users") ?? "[]");
  // };
  // const users = getUsersFromDatabase();

  // Enregistre un nouvel utilisateur en BDD
  // const registerUser = () => {
  //   const existingUsers = getUsersFromDatabase();
  //   existingUsers.push(formData);
  //   localStorage.setItem("users", JSON.stringify(existingUsers));
  //   navigate("/connexion");
  // };

  // Enregistre l'utilisateur qui vient de se connecter dans le localStorage
  // const saveLoggedUser = (user) => {
  //   localStorage.setItem("loggedUser", JSON.stringify(user));
  //   setLoggedUser(user);
  // };

  // Vérifie si l'utilisateur existe en BDD
  // const login = (credentials) => {
  //   const allUsers = getUsersFromDatabase();
  //   const checkUser = allUsers.find(
  //     (user) =>
  //       user.pseudo === credentials.pseudo &&
  //       user.password === credentials.password
  //   );
  //   if (!checkUser) {
  //     console.error("Identifiants incorrects !");
  //   } else {
  //     // saveLoggedUser(checkUser);
  //     console.error(`Content de vous revoir ${credentials.pseudo}`);

  //     return navigate("/");
  //   }
  //   return null;
  // };

  // Déconnecte l'utilisateur actuellement connecté
  // const logout = () => {
  //   localStorage.removeItem("loggedUser");
  //   setLoggedUser(undefined);
  //   navigate("/");
  //   alert("Vous venez de vous déconnecter !");
  // };

  // Vérifie si un utilisateur est actuellement connecté
  // function isLocalStorageKeyExists(key) {
  //   return localStorage.getItem(key) !== null;
  // }

  // Exemple d'utilisation :
  const keyToCheck = "loggedUser";
  // const keyExists = isLocalStorageKeyExists(keyToCheck);

  const contextValue = useMemo(
    () => ({
      formData,
      setFormData,
      // saveLoggedUser,
      // login,
      // logout,
      // getLoggedUser,
      // loggedUser,
      // registerUser,
      updateRegisterForm,
      // users,
      // isLocalStorageKeyExists,
      keyToCheck,
    }),
    [formData, setFormData]
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
