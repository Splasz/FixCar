import { SiBitcoincash } from "react-icons/si";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import supabase from "../../api/supabase";

type StatsType = {
  income: number;
  tasks: number;
  new_clients: number;
  repairs: number;
};

type NewClientsStats = {
  new_clients: number;
};

function DashboardStats() {
  const [incomeStats, setIncomeStats] = useState<StatsType | null>(null);
  const [tasksStats, setTasksStats] = useState<StatsType | null>(null);
  const [clientStats, setClientStats] = useState<NewClientsStats | null>(null);
  const [repairStats, setRepairStats] = useState<StatsType | null>(null);

  useEffect(() => {
    const fetchIncome = async () => {
      const { data, error } = await supabase
        .from("income")
        .select("*")
        .single();

      if (data) {
        setIncomeStats(data);
      }
      if (error) {
        console.error(`Błąd połączenia z bazą: ${error.message}`);
      }
    };

    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasksdata")
        .select("*")
        .single();

      if (data) {
        setTasksStats(data);
      }
      if (error) {
        console.error(`Błąd połączenia z bazą: ${error.message}`);
      }
    };

    const fetchClients = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("Użytkownik niezalogowany");

        const { data, error } = await supabase.rpc("new_clients", {
          uid: user.id,
        });

        if (error) throw error;

        setClientStats({ new_clients: data[0].new_clients });
      } catch (err: any) {
        console.error("Błąd pobierania danych:", err.message);
      }
    };

    const fetchRepairs = async () => {
      const { data, error } = await supabase
        .from("repaired_cars")
        .select("*")
        .single();

      if (data) {
        setRepairStats(data);
      }
      if (error) {
        console.error(`Błąd połączenia z bazą: ${error.message}`);
      }
    };

    fetchIncome();
    fetchClients();
    fetchTasks();
    fetchRepairs();
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
          <div>{incomeStats?.income}</div>
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
          <div>{tasksStats?.tasks}</div>
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
          <div>{repairStats?.repairs}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
