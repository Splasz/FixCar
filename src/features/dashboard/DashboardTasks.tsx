import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import "./DashboardTasks.css";

type Zlecenie = {
  zlecenia_id: number;
  imie: string;
  nazwisko: string;
  marka: string;
  model: string;
  usluga: string;
  status: string;
  data_zakonczenia: string;
  dni_do_konca: number;
};

function DashboardTasks() {
  const [zlecenia_nowe, setZlecenia_nowe] = useState<Zlecenie[]>([]);
  const [zlecenia_pilne, setZlecenia_pilne] = useState<Zlecenie[]>([]);
  const [zlecenia_zalegle, setZlecenia_zalegle] = useState<Zlecenie[]>([]);

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

  useEffect(() => {
    fetch("http://localhost/react_backend/tasksNew.php")
      .then((response) => response.json())
      .then((data) => setZlecenia_nowe(data))
      .catch((error) => console.error("Błąd:", error));

    fetch("http://localhost/react_backend/tasksImportant.php")
      .then((response) => response.json())
      .then((data) => setZlecenia_pilne(data))
      .catch((error) => console.error("Błąd:", error));

    fetch("http://localhost/react_backend/tasksOver.php")
      .then((response) => response.json())
      .then((data) => setZlecenia_zalegle(data))
      .catch((error) => console.error("Błąd:", error));
  }, []);

  return (
    <>
      <div>
        <TabGroup>
          <TabList className="text-xl flex gap-2.5">
            <div className="text-2xl p-2.5 ">Zlecenia</div>
            <Tab className="p-2.5 data-[hover]:bg-highlight rounded-full data-[selected]:bg-secondary data-[selected]:shadow-xl">
              Pilne
            </Tab>
            <Tab className="p-2.5 data-[hover]:bg-highlight rounded-full  data-[selected]:bg-secondary data-[selected]:shadow-xl">
              Nowe
            </Tab>
            <Tab className="p-2.5 data-[hover]:bg-highlight rounded-full  data-[selected]:bg-secondary data-[selected]:shadow-xl">
              Zaległe
            </Tab>
          </TabList>
          <TabPanels className="text-xl flex gap-2.5 p-2.5 p-">
            <TabPanel>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Usługa</th>
                    <th>Status</th>
                    <th>Koniec Za</th>
                  </tr>
                </thead>
                <tbody>
                  {zlecenia_pilne.map((z) => (
                    <tr key={z.zlecenia_id}>
                      <td>ZL/{z.zlecenia_id}</td>
                      <td>{z.imie}</td>
                      <td>{z.nazwisko}</td>
                      <td>{z.marka}</td>
                      <td>{z.model}</td>
                      <td>{z.usluga}</td>
                      <td>
                        <div
                          className="status w-fit p-1 rounded-2xl"
                          style={getStatusStyle(z.status)}
                        >
                          {z.status}
                        </div>
                      </td>
                      <td>{z.dni_do_konca} dni</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Usługa</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {zlecenia_nowe.map((z) => (
                    <tr key={z.zlecenia_id}>
                      <td>ZL/{z.zlecenia_id}</td>
                      <td>{z.imie}</td>
                      <td>{z.nazwisko}</td>
                      <td>{z.marka}</td>
                      <td>{z.model}</td>
                      <td>{z.usluga}</td>
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
            </TabPanel>
            <TabPanel>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Usługa</th>
                    <th>Status</th>
                    <th>Data Zakończenia</th>
                  </tr>
                </thead>
                <tbody>
                  {zlecenia_zalegle.map((z) => (
                    <tr key={z.zlecenia_id}>
                      <td>ZL/{z.zlecenia_id}</td>
                      <td>{z.imie}</td>
                      <td>{z.nazwisko}</td>
                      <td>{z.marka}</td>
                      <td>{z.model}</td>
                      <td>{z.usluga}</td>
                      <td>
                        <div
                          className="status w-fit p-1 rounded-2xl"
                          style={getStatusStyle(z.status)}
                        >
                          {z.status}
                        </div>
                      </td>
                      <td>{z.data_zakonczenia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
}

export default DashboardTasks;
