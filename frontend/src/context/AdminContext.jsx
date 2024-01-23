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
  const [artists, setArtists] = useState([]);
  const [streetArt, setStreetArt] = useState([]);

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

  const fetchArtists = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3310/api/artists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allArtists = await response.json();
      setArtists(allArtists);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const removeArtist = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3310/api/artists/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Échec de la suppression de l’artiste");
      }
      setArtists((currentArtists) =>
        currentArtists.filter((artist) => artist.id !== id)
      );
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

  const fetchStreetArt = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3310/api/streetart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allStreetArt = await response.json();
      setStreetArt(allStreetArt);
    } catch (err) {
      console.error("erreur de récup", err);
    }
  }, []);

  const removeStreetArt = useCallback(async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/streetart/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Échec de la suppression du street art");
      }

      setStreetArt((prevStreetArt) =>
        prevStreetArt.filter((artOne) => artOne.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const updateUser = useCallback(async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3310/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l’utilisateur");
      }
      const updatedUser = await response.json();
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const updateArtist = useCallback(async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3310/api/artists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l’artiste");
      }
      const updatedArtist = await response.json();
      setArtists((currentArtists) =>
        currentArtists.map((artist) =>
          artist.id === id ? { ...artist, ...updatedArtist } : artist
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchArtists();
    fetchStreetArt();
  }, [fetchUsers, fetchArtists, fetchStreetArt]);

  const context = useMemo(
    () => ({
      users,
      removeUser,
      artists,
      removeArtist,
      streetArt,
      removeStreetArt,
      updateUser,
      updateArtist,
    }),
    [users, streetArt]
  );

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AdminContext, AdminContextProvider };
export const useAdminContext = () => useContext(AdminContext);
