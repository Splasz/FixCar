import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import { useState } from "react";
import TasksPage from "./pages/TasksPage";
import AddButton from "./components/AddButton";
import ClientPage from "./pages/ClientPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <>
      <Router>
        <div className="flex  ">
          <div className="">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
          </div>
          <div className="flex flex-col w-full p-2.5 gap-7">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/zlecenia" element={<TasksPage />} />
              <Route path="/klienci" element={<ClientPage />} />
              <Route path="/rejestracja" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
        <AddButton />
      </Router>
    </>
  );
}

export default App;
