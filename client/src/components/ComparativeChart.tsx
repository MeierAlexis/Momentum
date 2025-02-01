import React, { useEffect, useState } from "react";
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // Nombre abreviado del mes
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export function ComparativeChart(props: PropsComparativeChart) {
  const [formattedCurrentMonth, setFormattedCurrentMonth] = useState<
    DataPoint[]
  >([]);
  const [formattedPreviousMonth, setFormattedPreviousMonth] = useState<
    DataPoint[]
  >([]);

  useEffect(() => {
    // Formatear los datos del mes actual
    const formattedCurrent = props.dataCurrentMonth.map((item) => ({
      ...item,
      date: formatDate(item.date),
    }));
    setFormattedCurrentMonth(formattedCurrent);

    // Formatear los datos del mes anterior
    const formattedPrevious = props.dataPreviousMonth.map((item) => ({
      ...item,
      date: formatDate(item.date),
    }));
    setFormattedPreviousMonth(formattedPrevious);
  }, [props.dataCurrentMonth, props.dataPreviousMonth]);

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
            data={formattedCurrentMonth}
            dataKey="completed"
            stroke="#ff5733"
            fill="rgba(255,87,51,0.3)"
            strokeWidth={2}
          />

          {/* Área para el mes anterior */}
          <Area
            type="monotone"
            data={formattedPreviousMonth}
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
