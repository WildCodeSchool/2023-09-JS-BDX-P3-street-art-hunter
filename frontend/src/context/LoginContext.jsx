import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
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

  const login = useCallback(async (credentials) => {
    try {
      const data = await apiService.post(
        "http://localhost:3310/api/login/",
        credentials
      );
      localStorage.setItem("token", data.token);

      apiService.setToken(data.token);

      const result = await apiService.get("http://localhost:3310/api/users/me");

      alert(`Coucou ${result.data.email}`);
      setUser(result.data);
      if (result.data.isAdmin === 1) {
        return navigate("/administration");
      }
      return navigate("/map");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    return null;
  }, []);

  const register = async (formData) => {
    try {
      setUser(await axios.post("http://localhost:3310/api/users/", formData));
      alert(`Bienvenu ${formData.username}, ton inscription est validée`);
      navigate("/connexion");
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.clear();
    return navigate("/titlescreen");
  };

  const context = useMemo(
    () => ({
      login,
      isUserConnected,
      isUserAdmin,
      logout,
      user,
      ApiService,
      register,
    }),
    []
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
