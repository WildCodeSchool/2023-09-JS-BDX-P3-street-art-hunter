import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allUsers = await response.json();
      setUsers(allUsers);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const removeUser = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3310/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Échec de la suppression de l’utilisateur");
      }
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const context = useMemo(() => ({ users, removeUser }), [users]);

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AdminContext, AdminContextProvider };
export const useAdminContext = () => useContext(AdminContext);
