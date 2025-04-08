import DashboardChart from "../features/dashboard/DashboardChart";
import DashboardStats from "../features/dashboard/DashboardStats";
import DashboardTasks from "../features/dashboard/DashboardTasks";

function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-7 ">
        <div className="flex flex-col p-5 bg-white rounded-3xl">
          <DashboardStats />
        </div>
        <div className="flex gap-7">
          <div className="flex w-full flex-col p-5 bg-white rounded-3xl">
            <DashboardTasks />
          </div>
          <div className="flex max-w-100 w-fit flex-col p-5 bg-white rounded-3xl">
            <DashboardChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
