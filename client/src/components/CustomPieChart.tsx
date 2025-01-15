import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Tipo para los puntos de datos
type DataPoint = {
  name: string;
  value: number;
};

interface PieChartProps {
  data: DataPoint[];
  colors?: string[]; // Opcional: si se quiere pasar colores personalizados
}

const RADIAN = Math.PI / 180;

// Función para personalizar las etiquetas dentro del gráfico
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Componente PieChart que recibe los datos y colores como props
export const CustomPieChart: React.FC<PieChartProps> = ({
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
