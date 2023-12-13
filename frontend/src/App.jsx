import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Navbar />
    </>
  );
}

export default App;
