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
import Style from "./pages/Style";
import { LoginProvider } from "./context/LoginContext";
import { UserContextProvider } from "./context/userContext";
import { AdminContextProvider } from "./context/AdminContext";

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
    element: (
      <UserContextProvider>
        <LoginProvider>
          <AdminContextProvider>
            <App />
          </AdminContextProvider>
        </LoginProvider>
      </UserContextProvider>
    ),
    children: [
      {
        path: "/",
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
        path: "/mon-compte",

        children: [
          {
            path: "/mon-compte/informations",
            element: <Account />,
          },
          {
            path: "/mon-compte/arts",
            element: <Account />,
          },
        ],
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/inscription",
        element: <Register />,
      },
      {
        path: "/classement",
        element: <Ranking />,
      },
      {
        path: "/administration",
        element: <Administration />,
      },
      {
        path: "/style",
        element: <Style />,
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
