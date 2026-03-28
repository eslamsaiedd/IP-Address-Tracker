import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Header/NavBar";

function App() {
  return (
    <div className="dark:bg-[var(--second-primary-color)] h-[100vh] bg-[#F7F9FB] ">
    <NavBar/>
      <Outlet/>
    </div>
  );
}

export default App;
