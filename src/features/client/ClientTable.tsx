import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

type Info = {
  klient_id: number;
  imie: string;
  nazwisko: string;
  telefon: string;
  email: string;
  data: string;
  notatki: string;
  przycisk: string;
};
type dataTypeProps = {
  onClientSelect: (newValue: number) => void;
  isOpen: (value: boolean) => void;
};

function ClientTable({ onClientSelect, isOpen }: dataTypeProps) {
  const [clients, setClients] = useState<Info[]>([]);

  useEffect(() => {
    fetch("http://localhost/react_backend/allClients.php")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Błąd:", error));
  }, []);

  const handleClick = (klient_id: number) => {
    onClientSelect(klient_id);
    isOpen(true);
  };

  return (
    <div>
      <div className="text-2xl p-2.5 ">Wszyscy Klienci</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Data Rejestracji</th>
              <th>Notatki</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((z) => (
              <tr
                onClick={() => handleClick(z.klient_id)}
                className="rounded-2xl border-b-1 border-highlight hover:bg-highlight hover:cursor-pointer"
                key={z.klient_id}
              >
                <td className="rounded-s-2xl">{z.imie}</td>
                <td>{z.nazwisko}</td>
                <td>{z.telefon}</td>
                <td>{z.email}</td>
                <td>{z.data}</td>
                <td>{z.notatki}</td>
                <td className="rounded-e-2xl">
                  <button className="bg-highlight text-gray-500 p-1 rounded-2xl cursor-pointer hover:opacity-70 hover:text-gray-400">
                    <BsThreeDots />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientTable;
