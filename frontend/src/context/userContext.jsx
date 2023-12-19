import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userDb, setUserDb] = useState({
    id: 1,
    pseudo: "Damien Jean",
    mail: "damien@jean.fr",
    postalCode: "33000",
    city: "Bordeaux",
    password: "abdc123",
    points: "1000",
  });

  const userMemo = useMemo(() => ({ userDb, setUserDb }), [userDb]);
  useEffect(() => {
    // check localstorage here then emit in app
  }, []);

  return (
    <UserContext.Provider value={userMemo}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
