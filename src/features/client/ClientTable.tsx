import { useEffect, useState } from "react";

type Info = {
  imie: string;
  nazwisko: string;
};

function ClientTable() {
  const [clientInfo, setClientInfo] = useState<Info[]>([]);

  useEffect(() => {
    fetch("http://localhost/react_backend/allTasks.php")
      .then((response) => response.json())
      .then((data) => setClientInfo(data))
      .catch((error) => console.error("Błąd:", error));
  }, []);

  return (
    <div>
      <div className="text-2xl p-2.5 ">Wszyscy Klienci</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Imię</th>
              <th>Nazwisko</th>
            </tr>
          </thead>
          <tbody>
            {clientInfo.map((z, index) => (
              <tr key={index}>
                <td>{z.imie}</td>
                <td>{z.nazwisko}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientTable;
