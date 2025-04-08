import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

interface RepairStats {
  nazwa: string;
  liczba: string;
}
const colors = ["#E53E3E", "#F6AD55", "#61A766", "#3D7DCA", "#813DCA"];

function DashboardChart() {
  const [repairStats, setRepairStats] = useState<RepairStats[]>([]);

  useEffect(() => {
    fetch("http://localhost/react_backend/repairStats.php")
      .then((response) => response.json())
      .then((data) => setRepairStats(data))
      .catch((error) => console.error("Błąd:", error));
  }, []);

  const chartItems = repairStats.map((item, index) => ({
    id: index,
    value: Number(item.liczba),
    label: item.nazwa,
  }));

  return (
    <div className="flex flex-col gap-3 ]">
      <div className=" text-2xl p-2 border-b-1 border-highlight">
        Najczęstrze Naprawy
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
        <PieChart
          colors={colors}
          series={[
            {
              data: chartItems,
              innerRadius: 95,
              outerRadius: 120,
              paddingAngle: 5,
              cornerRadius: 5,
              cx: 150,
            },
          ]}
          slotProps={{
            legend: { hidden: true },
          }}
          width={300}
          height={200}
        />

        <div>
          {chartItems.map((item, index) => (
            <div key={item.id} className="mb-2.5">
              <div className=" opacity-40">{item.label}</div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: colors[index],
                  }}
                />
                <span className="font-bold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;
