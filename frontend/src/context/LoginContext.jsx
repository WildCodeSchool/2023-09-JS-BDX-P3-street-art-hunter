// import { createContext, useContext, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

// const loginContext = createContext();

// function LoginProvider({ children }) {
//   // const [connect, setConnect] = useState(false);
//   // const getUsers = () => JSON.parse(localStorage.getItem("users") ?? "[]");
//   // const navigate = useNavigate();

//   // const login = (credentials) => {
//   //   const allUsers = getUsers();
//   //   const checkUser = allUsers.find(
//   //     (user) =>
//   //       user.pseudo === credentials.pseudo &&
//   //       user.password === credentials.password
//   //   );
//   //   if (!checkUser) {
//   //     alert("Identifiants incorrects !");
//   //   } else {
//   //     alert(`Content de vous revoir ${credentials.pseudo}`);
//   //     setConnect(checkUser);

//   //     return navigate("/");
//   //   }
//   //   return null;
//   // };

//   const context = useMemo(() => ({ login, connect, setConnect }), [connect]);

//   return (
//     <loginContext.Provider value={context}>{children}</loginContext.Provider>
//   );
// }

// LoginProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default LoginProvider;
// export const useLogin = () => useContext(loginContext);
