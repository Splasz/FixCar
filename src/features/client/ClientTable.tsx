import { useEffect, useState } from "react";

type Info = {
  klient_id: number;
  imie: string;
  nazwisko: string;
};
type dataType = {
  onClientSelect: (newValue: number) => void;
};

function ClientTable({ onClientSelect }: dataType) {
  const [clients, setClients] = useState<Info[]>([]);

  useEffect(() => {
    fetch("http://localhost/react_backend/allClients.php")
      .then((response) => response.json())
      .then((data) => setClients(data))
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
            {clients.map((z) => (
              <tr
                onClick={() => onClientSelect(z.klient_id)}
                className="rounded-2xl hover:bg-highlight hover:cursor-pointer"
                key={z.klient_id}
              >
                <td className="rounded-s-2xl">{z.imie}</td>
                <td className="rounded-e-2xl">{z.nazwisko}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientTable;
