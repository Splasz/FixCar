import TasksTable from "../features/tasks/TasksTable";

function TasksPage() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col p-5 bg-white rounded-3xl">
        <TasksTable />
      </div>
    </div>
  );
}

export default TasksPage;
