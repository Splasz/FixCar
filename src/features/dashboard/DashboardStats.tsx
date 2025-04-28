import { SiBitcoincash } from "react-icons/si";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import supabase from "../../api/supabase";

function DashboardStats() {
  type StatsType = {
    new_clients: number;
    income: number;
    tasks: number;
    repairsts: number;
  };

  const [clientStats, setClientStats] = useState<StatsType | null>(null);

  const fetchClients = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc("new_clients", {
        uid: userId,
      });

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        setClientStats((prev) => ({
          ...(prev ?? { income: 0, tasks: 0, repairsts: 0 }),
          new_clients: data[0].new_clients,
        }));
      }
    } catch (err: any) {
      console.error("Błąd pobierania klientów:", err.message);
    }
  };

  const fetchIncome = async () => {
    try {
      const { data, error } = await supabase.rpc("income");

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        setClientStats((prev) => ({
          ...(prev ?? { new_clients: 0, tasks: 0, repairsts: 0 }),
          income: data[0].income ?? 0,
        }));
      }
    } catch (err: any) {
      console.error("Błąd pobierania przychodu:", err.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.rpc("tasksdata");

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        setClientStats((prev) => ({
          ...(prev ?? { new_clients: 0, income: 0, repairsts: 0 }),
          tasks: data[0].tasks,
        }));
      }
    } catch (err: any) {
      console.error("Błąd pobierania zadań:", err.message);
    }
  };

  const fetchRepairs = async () => {
    try {
      const { data, error } = await supabase.rpc("repaired_cars");

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        setClientStats((prev) => ({
          ...(prev ?? { new_clients: 0, income: 0, tasks: 0 }),
          repairsts: data[0].repairs,
        }));
      }
    } catch (err: any) {
      console.error("Błąd pobierania napraw:", err.message);
    }
  };

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("Użytkownik niezalogowany");

        // Wywołujemy wszystkie funkcje
        await Promise.all([
          fetchClients(user.id),
          fetchIncome(),
          fetchTasks(),
          fetchRepairs(),
        ]);
      } catch (err: any) {
        console.error("Błąd inicjalizacji statystyk:", err.message);
      }
    };

    fetchAllStats();
  }, []);

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col border-r border-r-gray-300 p-2.5">
        <div className="flex items-center gap-6 p-2.5 pl-3.5 text-2xl font-medium">
          <div>
            <SiBitcoincash className="text-accent2 size-10" />
          </div>
          <div className="opacity-50">Przychód</div>
        </div>
        <div className="flex items-center justify-center gap-2.5 p-2.5 text-5xl">
          <div className="opacity-50">zł</div>
          <div>{clientStats?.income}</div>
        </div>
      </div>

      <div className="flex w-full flex-col border-r border-r-gray-300 p-2.5">
        <div className="flex items-center gap-6 p-2.5 pl-3.5 text-2xl font-medium">
          <div>
            <MdOutlineTaskAlt className="text-accent size-10" />
          </div>
          <div className="opacity-50">Zlecenia</div>
        </div>
        <div className="flex items-center justify-center gap-2.5 p-2.5 text-5xl">
          <div>{clientStats?.tasks}</div>
        </div>
      </div>

      <div className="flex w-full flex-col border-r border-r-gray-300 p-2.5">
        <div className="flex items-center gap-6 p-2.5 pl-3.5 text-2xl font-medium">
          <div>
            <FiUserPlus className="text-secondary size-10" />
          </div>
          <div className="opacity-50">Nowi Klienci</div>
        </div>
        <div className="flex items-center justify-center gap-2.5 p-2.5 text-5xl">
          <div className="opacity-50">+</div>
          <div>{clientStats?.new_clients ?? "0"}</div>
        </div>
      </div>

      <div className="flex w-full flex-col p-2.5">
        <div className="flex items-center gap-6 p-2.5 pl-3.5 text-2xl font-medium">
          <div>
            <FaCarAlt className="text-primary size-10" />
          </div>
          <div className="opacity-50">Naprawione Auta</div>
        </div>
        <div className="flex items-center justify-center gap-2.5 p-2.5 text-5xl">
          <div>{clientStats?.repairsts}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
