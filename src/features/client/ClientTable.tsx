import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import supabase from "../../api/supabase";

type Info = {
  Klient_id: number;
  imie: string;
  nazwisko: string;
  telefon: string;
  email: string;
  data_rejestracji: string;
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
    const fetchClients = async () => {
      const { data, error } = await supabase.from("Klienci").select("*");
      if (data) {
        setClients(data);
      } else {
        console.error(error.message);
      }
    };
    fetchClients();
  }, []);

  const handleClick = (Klient_id: number) => {
    onClientSelect(Klient_id);
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
                onClick={() => handleClick(z.Klient_id)}
                className="rounded-2xl border-b-1 border-highlight hover:bg-highlight hover:cursor-pointer"
                key={z.Klient_id}
              >
                <td className="rounded-s-2xl">{z.imie}</td>
                <td>{z.nazwisko}</td>
                <td>{z.telefon}</td>
                <td>{z.email}</td>
                <td>{z.data_rejestracji}</td>
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
