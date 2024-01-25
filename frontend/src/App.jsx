import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const isTitleScreen = location.pathname === "/";

  return (
    <>
      <main>
        <Outlet />
      </main>
      {!isTitleScreen && <Navbar />}
    </>
  );
}

export default App;
