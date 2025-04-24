import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import supabase from "../../api/supabase";

type ClientInfo = {
  Klienci: {
    imie: string;
    nazwisko: string;
    telefon: string;
    email: string;
    notatka: string;
  };
  Pojazd_id: number;
  marka: string;
  model: string;
  rok_produkcji: string;
  nr_rejestracyjny: string;
  przebieg: string;
};

type dataType = {
  clientId: number;
  isClosed: (value: boolean) => void;
};

function ClientInfo({ clientId, isClosed }: dataType) {
  const [clientVehicles, setClientVehicles] = useState<ClientInfo[]>([]);
  const clientData = clientVehicles[0];

  const fetchClientsInfo = async () => {
    const { data, error } = await supabase
      .from("Pojazdy")
      .select("*, Klienci(*)")
      .eq("Klient_id", clientId);

    if (error) {
      throw error;
    }
    if (data && data.length > 0) {
      setClientVehicles(data);
    }
  };

  const deleteHandle = async (carId: number) => {
    const { error } = await supabase
      .from("Pojazdy")
      .delete()
      .eq("Pojazd_id", carId);

    if (error) {
      console.error("Błąd podczas usuwania:", error.message);
      return;
    }

    fetchClientsInfo();
  };

  useEffect(() => {
    console.log("ID klienta: ", clientId);
    fetchClientsInfo();
  }, [clientId]);

  return (
    <div className="relative flex h-full max-h-[90vh] flex-col overflow-hidden">
      <div className="border-highlight border-b-1 p-2.5 text-2xl">
        Informacje
      </div>
      <div className="flex flex-col gap-2.5 overflow-auto p-2.5">
        <div className="flex w-full gap-2.5 pt-2.5 pb-2.5 text-sm font-light">
          <div className="flex w-full flex-col gap-2.5">
            <div className="flex w-full gap-2.5">
              <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-[rgba(33,37,41,0.05)] p-2.5">
                <div>Imię</div>
                <div className="text-base font-medium">
                  {clientData?.Klienci?.imie}
                </div>
              </div>
              <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-[rgba(33,37,41,0.05)] p-2.5">
                <div>Nazwisko</div>
                <div className="text-base font-medium">
                  {clientData?.Klienci?.nazwisko}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-[rgba(33,37,41,0.05)] p-2.5">
                <div>Telefon</div>
                <div className="text-base font-medium">
                  {clientData?.Klienci?.telefon}
                </div>
              </div>
              <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-[rgba(33,37,41,0.05)] p-2.5">
                <div>Email</div>
                <div className="text-base font-medium">
                  {clientData?.Klienci?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2.5 overflow-clip rounded-2xl bg-[rgba(33,37,41,0.05)] p-2.5">
            <div>Notatka</div>
            <div className="text-base font-normal">
              {clientData?.Klienci?.notatka}
            </div>
          </div>
        </div>
        <div className="space-y-3 overflow-auto">
          {clientVehicles.map((vehicle, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[rgba(33,37,41,0.05)] p-3"
            >
              <div className="mb-3 flex items-center justify-between text-sm font-light">
                <div>Samochód {index + 1}</div>
                <div className="flex gap-3">
                  <button className="cursor-pointer">
                    <div className="bg-text/7 hover:bg-secondary text-secondary rounded-2xl p-2 hover:text-white">
                      <FaRegEdit className="size-4" />
                    </div>
                  </button>
                  <button
                    onClick={() => deleteHandle(vehicle.Pojazd_id)}
                    className="cursor-pointer"
                  >
                    <div className="bg-text/7 hover:bg-accent text-accent rounded-2xl p-2 hover:text-white">
                      <FaRegTrashAlt className="size-4" />
                    </div>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div>
                  <div className="text-xs">Marka</div>
                  <div className="font-medium">{vehicle.marka}</div>
                </div>
                <div>
                  <div className="text-xs">Model</div>
                  <div className="font-medium">{vehicle.model}</div>
                </div>
                <div>
                  <div className="text-xs">Rocznik</div>
                  <div className="font-medium">{vehicle.rok_produkcji}</div>
                </div>
                <div>
                  <div className="text-xs">Rejestracja</div>
                  <div className="font-medium">{vehicle.nr_rejestracyjny}</div>
                </div>
                <div>
                  <div className="text-xs">Przebieg</div>
                  <div className="font-medium">{vehicle.przebieg} km</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-2 right-2" onClick={() => isClosed(false)}>
        <IoIosCloseCircleOutline className="hover:text-accent size-7 hover:cursor-pointer" />
      </div>
    </div>
  );
}

export default ClientInfo;
