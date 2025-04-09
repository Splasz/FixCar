import ClientInfo from "../features/client/ClientInfo";
import ClientTable from "../features/client/ClientTable";

function ClientPage() {
  return (
    <div className="flex flex-row gap-7">
      <div className="flex flex-col min-w-fit w-fit p-5 bg-white rounded-3xl">
        <ClientTable />
      </div>
      <div className="flex flex-col w-full p-5 bg-white rounded-3xl">
        <ClientInfo />
      </div>
    </div>
  );
}

export default ClientPage;
