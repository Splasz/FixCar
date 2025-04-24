import { useEffect, useState } from "react";
import supabase from "../../api/supabase";
import ClientDropdownMenu from "./ClientDropDownMenu";

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
    <div className="flex h-full max-h-[90vh] flex-col overflow-auto">
      <div className="p-2.5 text-2xl">Wszyscy Klienci</div>
      <div className="overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Imię</th>
              <th className="p-2 text-left">Nazwisko</th>
              <th className="p-2 text-left">Telefon</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Data Rejestracji</th>
              <th className="p-2 text-left">Notatki</th>
              <th className="p-2 text-left">...</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((z) => (
              <tr
                onClick={() => handleClick(z.Klient_id)}
                className="border-highlight hover:bg-highlight rounded-2xl border-b-1 hover:cursor-pointer"
                key={z.Klient_id}
              >
                <td className="p-2">{z.imie}</td>
                <td className="p-2">{z.nazwisko}</td>
                <td className="p-2">{z.telefon}</td>
                <td className="p-2">{z.email}</td>
                <td className="p-2">{z.data_rejestracji}</td>
                <td className="p-2">{z.notatki}</td>
                <td className="p-2">
                  <ClientDropdownMenu clientId={z.Klient_id} />
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
