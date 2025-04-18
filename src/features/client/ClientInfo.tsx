import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

type ClientInfo = {
  imie: string;
  nazwisko: string;
  telefon: string;
  email: string;
  notatka: string;
  marka: string;
  model: string;
  rocznik: string;
  rejestracja: string;
  przebieg: string;
};

type dataType = {
  clientId: number;
  isClosed: (value: boolean) => void;
};

function ClientInfo({ clientId, isClosed }: dataType) {
  const [clientVehicles, setClientVehicles] = useState<ClientInfo[]>([]);
  const clientData = clientVehicles[0];

  useEffect(() => {
    console.log("ID klienta: ", clientId);
    const fetchData = async () => {
      if (clientId === 0) {
        setClientVehicles([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost/react_backend/clientInfo.php?query=${clientId}`
        );
        if (Array.isArray(response.data)) {
          setClientVehicles(response.data);
        } else {
          setClientVehicles([response.data]);
        }
        console.log("API:", clientVehicles);
      } catch (error) {
        console.error("Bład poczas pobiernaia danych", error);
      }
    };

    fetchData();
  }, [clientId]);

  return (
    <div className="h-full relative">
      <div className="text-2xl border-b-1 border-highlight p-2.5">
        Informacje
      </div>
      <div className="flex flex-col gap-2.5 w-full h-full">
        <div className="flex gap-2.5 w-full  pt-2.5 pb-2.5 text-sm font-light">
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex gap-2.5 w-full">
              <div className="bg-[rgba(33,37,41,0.05)] flex flex-col w-full p-2.5 gap-2.5 rounded-2xl">
                <div>Imię</div>
                <div className="text-base font-medium">{clientData?.imie}</div>
              </div>
              <div className="bg-[rgba(33,37,41,0.05)] flex flex-col w-full p-2.5 gap-2.5 rounded-2xl">
                <div>Nazwisko</div>
                <div className="text-base font-medium">
                  {clientData?.nazwisko}
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-2.5 w-full">
              <div className="bg-[rgba(33,37,41,0.05)] flex flex-col w-full p-2.5 gap-2.5 rounded-2xl">
                <div>Telefon</div>
                <div className="text-base font-medium">
                  {clientData?.telefon}
                </div>
              </div>
              <div className="bg-[rgba(33,37,41,0.05)] flex flex-col w-full p-2.5 gap-2.5 rounded-2xl">
                <div>Email</div>
                <div className="text-base font-medium">{clientData?.email}</div>
              </div>
            </div>
          </div>
          <div className="bg-[rgba(33,37,41,0.05)] flex flex-col overflow-clip w-full p-2.5 gap-2.5 rounded-2xl">
            <div>Notatka</div>
            <div className="text-base font-normal">{clientData?.notatka}</div>
          </div>
        </div>
        <div className="space-y-3">
          {clientVehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-[rgba(33,37,41,0.05)] p-3 rounded-2xl"
            >
              <div className="text-sm mb-2">Samochód {index + 1}</div>
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
                  <div className="font-medium">{vehicle.rocznik}</div>
                </div>
                <div>
                  <div className="text-xs">Rejestracja</div>
                  <div className="font-medium">{vehicle.rejestracja}</div>
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
        <IoIosCloseCircleOutline className="size-7 hover:text-accent hover:cursor-pointer" />
      </div>
    </div>
  );
}

export default ClientInfo;
