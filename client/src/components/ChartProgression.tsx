import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Definimos el tipo de cada punto de datos
type DataPoint = {
  date: string;
  completed: number;
};

// Definimos las props que el componente acepta
interface LineChartExampleProps {
  data: DataPoint[];
}

export const ChartProgression: React.FC<LineChartExampleProps> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" tickMargin={10} />
          <YAxis tickMargin={10} />
          <Tooltip />
          <Legend />
          <Line
            type="natural"
            dataKey="completed"
            stroke="#ff5733"
            strokeWidth={2}
            activeDot={{ r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
