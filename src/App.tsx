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
import Wrapper from "./pages/Wrapper";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <div className="flex  ">
          {authenticated && (
            <div className="">
              <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                authenticated={setAuthenticated}
              />
            </div>
          )}
          <div className="flex flex-col w-full p-2.5 gap-7">
            {authenticated && <Navbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <Wrapper setAuthenticatedState={setAuthenticated}>
                    <DashboardPage />
                  </Wrapper>
                }
              />
              <Route
                path="/zlecenia"
                element={
                  <Wrapper setAuthenticatedState={setAuthenticated}>
                    <TasksPage />
                  </Wrapper>
                }
              />
              <Route
                path="/klienci"
                element={
                  <Wrapper setAuthenticatedState={setAuthenticated}>
                    <ClientPage />
                  </Wrapper>
                }
              />
              <Route path="/rejestracja" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
        {authenticated && <AddButton />}
      </Router>
    </>
  );
}

export default App;
