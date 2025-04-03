import DashboardStats from "../features/dashboard/DashboardStats";
import DashboardTasks from "../features/dashboard/DashboardTasks";

function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-7 ">
        <div className="flex flex-col p-5 bg-white rounded-3xl">
          <DashboardStats />
        </div>
        <div className="flex flex-col p-5 bg-white rounded-3xl">
          <DashboardTasks />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
