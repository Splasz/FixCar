import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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

function AppWrapper({
  activePage,
  setActivePage,
  authenticated,
  setAuthenticated,
}: any) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className={`flex ${isHome ? "bg-text" : "bg-background"} min-h-screen`}
    >
      {authenticated && (
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          authenticated={setAuthenticated}
        />
      )}
      <div className={`flex flex-col w-full gap-7 ${isHome ? " " : "p-2.5"}`}>
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
  );
}

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <AppWrapper
        activePage={activePage}
        setActivePage={setActivePage}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      {authenticated && <AddButton />}
    </Router>
  );
}

export default App;
