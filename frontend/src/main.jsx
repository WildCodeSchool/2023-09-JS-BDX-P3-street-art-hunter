import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
// import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ranking from "./pages/Ranking";
import Administration from "./pages/Administration";
import TitleScreen from "./pages/TitleScreen";
import { LoginProvider } from "./context/LoginContext";
import { AdminContextProvider } from "./context/AdminContext";
import ApiService from "./services/api.services";
import AdminRoute from "./components/AdminUser";
import LoginRoute from "./components/ConnectedUser";

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

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      if (!localStorage.getItem("token")) {
        return null;
      }
      try {
        const data = await apiService.get("http://localhost:3310/api/users/me");
        return { preloadUser: data ?? null };
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
        element: <Home />,
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
        // path: "/mon-compte",
        // children: [
        //   {
        //     path: "/mon-compte/informations",
        //     element: <Account />,
        //   },
        //   {
        //     path: "/mon-compte/arts",
        //     element: <Account />,
        //   },
        // ],
      },
      {
        path: "/connexion",
        element: (
          <LoginRoute>
            <Login />
          </LoginRoute>
        ),
      },
      {
        path: "/inscription",
        element: (
          <LoginRoute>
            <Register />
          </LoginRoute>
        ),
      },
      {
        path: "/classement",
        element: <Ranking />,
      },
      {
        path: "/administration",
        element: (
          <AdminRoute>
            <Administration />,
          </AdminRoute>
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
