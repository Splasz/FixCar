import { useState } from "react";
import ClientInfo from "../features/client/ClientInfo";
import ClientTable from "../features/client/ClientTable";

function ClientPage() {
  const [data, setData] = useState(0);

  return (
    <div className="flex flex-row gap-7">
      <div className="flex flex-col min-w-fit w-fit p-5 bg-white rounded-3xl">
        <ClientTable onClientSelect={setData} />
      </div>
      <div className="flex flex-col w-3xl h-fit p-5 bg-white rounded-3xl">
        <ClientInfo clientId={data} />
      </div>
    </div>
  );
}

export default ClientPage;
