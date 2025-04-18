import { useEffect, useState } from "react";
import supabase from "../../api/supabase";

type Tasks = {
  zlecenia_id: number;
  imie: string;
  nazwisko: string;
  marka: string;
  model: string;
  nr_rejestracyjny: string;
  nazwa: string;
  notatki: string;
  status: string;
}[];

function TasksTable() {
  const [allTasks, setAllTasks] = useState<Tasks>([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchAllTask = async () => {
      const { data, error } = await supabase
        .from("all_orders_info")
        .select("*");

      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        setAllTasks(data);
      } else {
        setErrMsg("Brak Danych");
      }
    };

    fetchAllTask();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "przyjęte":
        return {
          color: "#813DCA",
          backgroundColor: "rgba(129, 61, 202, 0.2)",
        };
      case "w diagnozie":
        return { color: "#F6AD55", backgroundColor: "rgba(246, 173, 85, 0.2)" };
      case "w realizacji":
        return { color: "#3D7DCA", backgroundColor: "rgba(61, 125, 202, 0.2)" };
      case "gotowe do odbioru":
        return { color: "#61A766", backgroundColor: "rgba(97, 167, 102, 0.2)" };
      case "zakończone":
        return { color: "#e53e3e", backgroundColor: "rgba(229, 62, 62, 0.2)" };
      default:
        return { color: "#000000", backgroundColor: "#e0e0e0" };
    }
  };

  return (
    <div>
      <div className="text-2xl p-2.5 ">Wszystkie Zlecenia</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Nr Rej</th>
              <th>Usługa</th>
              <th>Notatka</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map((item, index) => (
              <tr key={index}>
                <td>ZL/{item.zlecenia_id}</td>
                <td>{item.imie}</td>
                <td>{item.nazwisko}</td>
                <td>{item.marka}</td>
                <td>{item.model}</td>
                <td>{item.nr_rejestracyjny}</td>
                <td>{item.nazwa}</td>
                <td>{item.notatki}</td>
                <td>
                  <div
                    className="status w-fit p-1.5 rounded-2xl"
                    style={getStatusStyle(item.status)}
                  >
                    {item.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {errMsg && <p>{errMsg}</p>}
        </table>
      </div>
    </div>
  );
}

export default TasksTable;
