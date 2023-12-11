import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
