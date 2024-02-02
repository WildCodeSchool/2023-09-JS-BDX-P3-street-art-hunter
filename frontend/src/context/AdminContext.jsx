import { createContext, useContext, useEffect, useMemo, useState } from "react";

import PropTypes from "prop-types";
import { useLogin } from "./LoginContext";

const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [streetArt, setStreetArt] = useState([]);
  const [updateArt, setUpdateArt] = useState({});
  const { apiService } = useLogin();

  const fetchUsers = async () => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`
      );
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/artists`
      );
      setArtists(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStreetArt = async () => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/streetart`
      );
      setStreetArt(response.data);
    } catch (err) {
      console.error("erreur de récup", err);
    }
  };

  const removeArtist = async (id) => {
    try {
      await apiService.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/artists/${id}`
      );
      setArtists((currentArtists) =>
        currentArtists.filter((artist) => artist.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeUser = async (id) => {
    try {
      await apiService.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`
      );

      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const removeStreetArt = async (id) => {
    try {
      const response = await apiService.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/streetart/${id}`
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
  };

  const updateUser = async (id, data) => {
    try {
      const response = await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        data
      );
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === id ? { ...user, ...response.data } : user
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateArtist = async (id, data) => {
    try {
      const response = await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/artists/${id}`,
        data
      );
      setArtists((currentArtists) =>
        currentArtists.map((artist) =>
          artist.id === id ? { ...artist, ...response.data } : artist
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateStreetArt = async (id, data) => {
    const loader = { art: null };
    try {
      const response = await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/streetart/${id}`,
        data ?? updateArt
      );

      loader.art = response.data;
    } catch (err) {
      console.error(err);
    }
    return loader;
  };

  useEffect(() => {
    fetchUsers();
    fetchArtists();
    fetchStreetArt();
  }, []);

  const context = useMemo(
    () => ({
      artists,
      removeArtist,
      removeStreetArt,
      removeUser,
      streetArt,
      updateArtist,
      updateUser,
      users,
      updateStreetArt,
      updateArt,
      setUpdateArt,
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
