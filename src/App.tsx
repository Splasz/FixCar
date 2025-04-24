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
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Wrapper from "./pages/Wrapper";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function AppWrapper({
  activePage,
  setActivePage,
  authenticated,
  setAuthenticated,
}: any) {
  const location = useLocation();
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/rejestracja";

  return (
    <div
      className={`flex ${isHome ? "bg-text" : "bg-background"} min-h-screen`}
    >
      {authenticated && <Sidebar authenticated={setAuthenticated} />}
      <div
        className={`flex h-screen w-full flex-col gap-7 overflow-hidden ${isHome ? " " : "p-2.5"}`}
      >
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
          <Route path="/rejestracja" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
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
