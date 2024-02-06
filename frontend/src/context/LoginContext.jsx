import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import ApiService from "../services/api.services";

const loginContext = createContext();

export default function LoginProvider({ children, apiService }) {
  const navigate = useNavigate();
  const givenData = useLoaderData();
  const [user, setUser] = useState(givenData?.preloadUser?.data);

  const isUserConnected = () => {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  };

  const isUserAdmin = () => {
    if (localStorage.getItem("token")) {
      const data = localStorage.getItem("token");
      const userData = jwtDecode(data);
      if (userData.admin === 1) {
        return true;
      }
    }
    return false;
  };

  const notify = (message) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const login = useCallback(async (credentials) => {
    try {
      const data = await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        credentials
      );
      localStorage.setItem("token", data.token);

      apiService.setToken(data.token);

      const result = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
      );
      setUser(result.data);
      notify(`Bonjour ${result.data.username} !`);
      if (result.data.is_admin === 1) {
        return navigate("/administration");
      }
      return navigate("/map");
    } catch (err) {
      console.error(err);
    }
    return null;
  }, []);

  const register = async (formData) => {
    try {
      setUser(
        await apiService.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
          formData
        )
      );
      notify(`Inscription validée !`);
      navigate("/connexion");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.clear();
    notify("Vous avez bien été déconnecté !");
    return navigate("/");
  };

  const context = useMemo(
    () => ({
      login,
      isUserConnected,
      isUserAdmin,
      logout,
      user,
      apiService,
      register,
      setUser,
    }),
    [isUserConnected, isUserAdmin, logout, user, apiService, register]
  );

  return (
    <loginContext.Provider value={context}>{children}</loginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
  apiService: PropTypes.instanceOf(ApiService).isRequired,
};

export { loginContext, LoginProvider };
export const useLogin = () => useContext(loginContext);
