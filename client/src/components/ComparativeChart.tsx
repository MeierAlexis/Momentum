import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  date: string;
  completed: number;
};

interface PropsComparativeChart {
  dataCurrentMonth: DataPoint[];
  dataPreviousMonth: DataPoint[];
}

export function ComparativeChart(props: PropsComparativeChart) {
  return (
    <div style={{ width: "100%", height: 250, position: "relative" }}>
      <ResponsiveContainer>
        <AreaChart>
          {/* Eje X y Y comunes para ambos conjuntos de datos */}
          <XAxis dataKey="date" tickMargin={10} />
          <YAxis tickMargin={10} />
          <Tooltip />

          {/* Área para el mes actual */}
          <Area
            type="monotone"
            data={props.dataCurrentMonth}
            dataKey="completed"
            stroke="#ff5733"
            fill="rgba(255,87,51,0.3)"
            strokeWidth={2}
          />

          {/* Área para el mes anterior */}
          <Area
            type="monotone"
            data={props.dataPreviousMonth}
            dataKey="completed"
            stroke="#4287f5"
            fill="rgba(66,135,245,0.3)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
