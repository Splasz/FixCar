import { useState } from "react";
import ClientInfo from "../features/client/ClientInfo";
import ClientTable from "../features/client/ClientTable";

function ClientPage() {
  const [data, setData] = useState(0);
  const [flag, setFlag] = useState(false);

  return (
    <div className="flex flex-row gap-7">
      <div
        className={`flex flex-col min-w-fit p-5 bg-white rounded-3xl ${
          flag ? "w-1/2" : "w-full"
        }`}
      >
        <ClientTable onClientSelect={setData} isOpen={setFlag} />
      </div>
      {flag && (
        <div className="flex flex-col w-1/2 h-fit p-5 bg-white rounded-3xl">
          <ClientInfo clientId={data} isClosed={setFlag} />
        </div>
      )}
    </div>
  );
}

export default ClientPage;
