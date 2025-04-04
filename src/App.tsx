import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/tasksPage";

function App() {
  return (
    <>
      <Router>
        <div className="flex  ">
          <div className="">
            <Sidebar />
          </div>
          <div className="flex flex-col w-full p-2.5 gap-7">
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/zlecenia" element={<TasksPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
