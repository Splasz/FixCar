import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <div className="flex  ">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full p-2.5 gap-7">
          <Navbar />
          <DashboardPage />
        </div>
      </div>
    </>
  );
}

export default App;
