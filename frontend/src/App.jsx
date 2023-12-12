import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}

export default App;
