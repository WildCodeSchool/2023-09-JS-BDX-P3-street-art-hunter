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
import { CaptureContextProvider } from "./context/CaptureContext"; // eslint-disable-line
import ResetPasswordForm from "./pages/ResetPassword";
import rootAppLoader from "./loaders/root-app.loader";
import getLocalisation from "./services/localisation.service";
import getStreetArtByIdLoader from "./loaders/get-street-art-by-id.loader";
import accountLoader from "./loaders/account.loader";

const apiService = new ApiService();

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => rootAppLoader(apiService),
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
        element: <LogoutUser />,
        loader: async () => accountLoader(apiService),
        children: [
          {
            path: "/mon-compte/informations",
            element: <Account />,
          },
          {
            path: "/mon-compte/arts",
            element: <Account />,
          },
          {
            path: "/mon-compte/modifier",
            element: <UpdateUser />,
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
        element: <AdminUser />,
        children: [
          {
            path: "/administration",
            loader: async () => {
              try {
                const response = await apiService.get(
                  `${import.meta.env.VITE_BACKEND_URL}/api/admin/pendingImages`
                );

                return { validations: response?.data ?? [] };
              } catch (error) {
                return { validations: [] };
              }
            },
            element: <Administration />,
          },
          {
            path: "/administration/modifier-artistes/:artistId",
            element: <UpdateArtist />,
          },
          {
            path: "/administration/modifier/:id",
            loader: async ({ params }) =>
              getStreetArtByIdLoader(apiService, params.id),
            element: <UpdateStreetArt />,
          },
        ],
      },
      {
        path: "/",
        element: <TitleScreen />,
      },
      {
        path: "/changer-mot-de-passe",
        element: <ResetPasswordForm />,
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
