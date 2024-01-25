import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ranking from "./pages/Ranking";
import Administration from "./pages/Administration";
import TitleScreen from "./pages/TitleScreen";
import { LoginProvider } from "./context/LoginContext";
import { AdminContextProvider } from "./context/AdminContext";
import ApiService from "./services/api.services";
import AdminUser from "./components/AdminUser";
import LoggedUser from "./components/ConnectedUser";
import LogoutUser from "./components/DisconnectedUser";
import UpdateUser from "./pages/UpdateUser";
import UpdateStreetArt from "./pages/UpdateStreetArt";
import UpdateArtist from "./pages/UpdateArtist";
import Art from "./pages/Art";
import CaptureContextProvider from "./context/captureContext";// eslint-disable-line

const apiService = new ApiService();

function getLocalisation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve({ lat: null, lng: null });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

const getStreetArt = async () => {
  try {
    const data = await apiService.get("http://localhost:3310/api/streetart");
    return { streetArtData: data ?? null };
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      if (!localStorage.getItem("token")) {
        return null;
      }
      try {
        const userData = await apiService.get(
          "http://localhost:3310/api/users/me"
        );
        const streetArtData = await getStreetArt();

        return {
          preloadUser: userData ?? null,
          preloadStreetArt: streetArtData ?? null,
        };
      } catch (err) {
        console.error(err.message);
        return null;
      }
    },
    element: (
      <LoginProvider apiService={apiService}>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </LoginProvider>
    ),
    children: [
      {
        path: "/map",
        loader: () => getLocalisation(),
        element: (
          <CaptureContextProvider>
            <Home />
          </CaptureContextProvider>
        ),
      },
      {
        path: "/galerie/arts",
        element: <Gallery />,
      },
      {
        path: "/galerie/artistes",
        element: <Gallery />,
      },
      {
        path: "/galerie/artistes/:artistId",
        element: <Art />,
      },
      {
        path: "/mon-compte",
        children: [
          {
            path: "/mon-compte/informations",
            element: (
              <LogoutUser>
                <Account />
              </LogoutUser>
            ),
          },
          {
            path: "/mon-compte/arts",
            element: (
              <LogoutUser>
                <Account />
              </LogoutUser>
            ),
          },
          {
            path: "/mon-compte/modifier",
            element: (
              <LogoutUser>
                <UpdateUser />
              </LogoutUser>
            ),
          },
        ],
      },
      {
        path: "/connexion",
        element: (
          <LoggedUser>
            <Login />
          </LoggedUser>
        ),
      },
      {
        path: "/inscription",
        element: (
          <LoggedUser>
            <Register />
          </LoggedUser>
        ),
      },
      {
        path: "/classement",
        element: <Ranking />,
      },
      {
        path: "/administration",
        loader: async () => {
          try {
            const response = await apiService.get(
              "http://localhost:3310/api/admin/pendingImages"
            );

            return { validations: response?.data ?? [] };
          } catch (error) {
            return { validations: [] };
          }
        },
        element: (
          <AdminUser>
            <Administration />
          </AdminUser>
        ),
      },
      {
        path: "/administration/modifier-artistes/:artistId",
        element: (
          <AdminUser>
            <UpdateArtist />
          </AdminUser>
        ),
      },
      {
        path: "/administration/modifier/:id",
        element: (
          <AdminUser>
            <UpdateStreetArt />,
          </AdminUser>
        ),
      },
      {
        path: "/",
        element: <TitleScreen />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
