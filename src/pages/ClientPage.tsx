import { useState } from "react";
import ClientInfo from "../features/client/ClientInfo";
import ClientTable from "../features/client/ClientTable";

function ClientPage() {
  const [dataa, setData] = useState(0);
  const [flag, setFlag] = useState(false);

  return (
    <div className="flex max-h-9/11 flex-row gap-7 overflow-clip">
      <div
        className={`flex h-fit min-w-fit flex-col overflow-auto rounded-3xl bg-white p-5 ${
          flag ? "w-1/2" : "w-full"
        }`}
      >
        <ClientTable onClientSelect={setData} isOpen={setFlag} />
      </div>
      {flag && (
        <div className="flex max-h-full w-1/2 flex-col overflow-auto rounded-3xl bg-white p-5">
          <ClientInfo clientId={dataa} isClosed={setFlag} />
        </div>
      )}
    </div>
  );
}

export default ClientPage;
