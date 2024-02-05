import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isTitleScreen = location.pathname === "/";

  return (
    <>
      <main>
        <Outlet />
        <ToastContainer />
      </main>
      {!isTitleScreen && <Navbar />}
    </>
  );
}

export default App;
