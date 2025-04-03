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
};

function DashboardTasks() {
  const [zlecenia, setZlecenia] = useState<Zlecenie[]>([]);

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
      .then((data) => setZlecenia(data))
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
            <TabPanel>Content 1</TabPanel>
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
                  {zlecenia.map((z) => (
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
            <TabPanel>Content 3</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
}

export default DashboardTasks;
