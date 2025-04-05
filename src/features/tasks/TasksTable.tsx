import { useEffect, useState } from "react";

type Tasks = {
  zlecenia_id: number;
  data_przyjecia: string;
  imie: string;
  nazwisko: string;
  marka: string;
  model: string;
  nr_rejestracyjny: string;
  usluga: string;
  notatki: string;
  status: string;
  data_zakonczenia: string;
  dni_do_konca: number;
};

function TasksTable() {
  const [allTasks, setAllTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    fetch("http://localhost/react_backend/allTasks.php")
      .then((response) => response.json())
      .then((data) => setAllTasks(data))
      .catch((error) => console.error("Błąd:", error));
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
        return { color: "#fff", backgroundColor: "rgba(229, 62, 62, 0.2)" };
      case "anulowane":
        return { color: "#E53E3E", backgroundColor: "rgba(229, 62, 62, 0.2)" };
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
              <th>Data Przyjęcia</th>
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
            {allTasks.map((z) => (
              <tr key={z.zlecenia_id}>
                <td>ZL/{z.zlecenia_id}</td>
                <td>{z.data_przyjecia}</td>
                <td>{z.imie}</td>
                <td>{z.nazwisko}</td>
                <td>{z.marka}</td>
                <td>{z.model}</td>
                <td>{z.nr_rejestracyjny}</td>
                <td>{z.usluga}</td>
                <td>{z.notatki}</td>
                <td>
                  <div
                    className="status w-fit p-1 rounded-2xl"
                    style={getStatusStyle(z.status)}
                  >
                    {z.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksTable;
