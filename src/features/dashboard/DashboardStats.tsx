import { SiBitcoincash } from "react-icons/si";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import React from "react";

type Stats = {
  income: number;
  tasks: number;
  new_clients: number;
  repair_cars: number;
};

function DashboardStats() {
  const [statistics, setStatistics] = useState<Stats[]>([]);

  useEffect(() => {
    fetch("http://localhost/react_backend/statistics.php")
      .then((response) => response.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error("Błąd:", error));
  }, []);

  return (
    <div className="flex w-full">
      {statistics.map((z, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col p-2.5 w-full border-r border-r-gray-300">
            <div className="flex items-center text-2xl font-medium gap-6 p-2.5 pl-3.5">
              <div>
                <SiBitcoincash className="size-10 text-accent2" />
              </div>
              <div className="opacity-50">Przychód</div>
            </div>
            <div className="flex items-center justify-center text-5xl p-2.5 gap-2.5">
              <div className="opacity-50">zł</div>
              <div>{z.income}</div>
            </div>
          </div>

          <div className="flex flex-col p-2.5 w-full border-r border-r-gray-300">
            <div className="flex items-center text-2xl font-medium gap-6 p-2.5 pl-3.5">
              <div>
                <MdOutlineTaskAlt className="size-10 text-accent" />
              </div>
              <div className="opacity-50">Zlecenia</div>
            </div>
            <div className="flex items-center justify-center text-5xl p-2.5 gap-2.5">
              <div>{z.tasks}</div>
            </div>
          </div>

          <div className="flex flex-col p-2.5 w-full border-r border-r-gray-300">
            <div className="flex items-center text-2xl font-medium gap-6 p-2.5 pl-3.5">
              <div>
                <FiUserPlus className="size-10 text-secondary" />
              </div>
              <div className="opacity-50">Nowi Klienci</div>
            </div>
            <div className="flex items-center justify-center text-5xl p-2.5 gap-2.5">
              <div className="opacity-50">+</div>
              <div>{z.new_clients}</div>
            </div>
          </div>

          <div className="flex flex-col p-2.5 w-full">
            <div className="flex items-center text-2xl font-medium gap-6 p-2.5 pl-3.5">
              <div>
                <FaCarAlt className="size-10 text-primary" />
              </div>
              <div className="opacity-50">Naprawione Auta</div>
            </div>
            <div className="flex items-center justify-center text-5xl p-2.5 gap-2.5">
              <div>{z.repair_cars}</div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DashboardStats;
