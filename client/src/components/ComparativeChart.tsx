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
  date: string; // Mantén el formato original (YYYY-MM-DD)
  completed: number;
};

interface PropsComparativeChart {
  dataCurrentWeek: DataPoint[];
  dataPreviousWeek: DataPoint[];
}

// Formatea la fecha como "Day 1", "Day 2", ..., "Day 7"
const formatDate = (index: number) => `Day ${index + 1}`;

export function ComparativeChart(props: PropsComparativeChart) {
  const [mergedData, setMergedData] = useState<any[]>([]);

  useEffect(() => {
    // Ordenar los datos por fecha
    const sortedCurrent = [...props.dataCurrentWeek].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const sortedPrevious = [...props.dataPreviousWeek].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Construir el dataset unificado
    const merged: any[] = Array.from({ length: 7 }, (_, i) => ({
      date: formatDate(i),
      currentWeek: sortedCurrent[i]?.completed || 0,
      previousWeek: sortedPrevious[i]?.completed || 0,
    }));

    setMergedData(merged);
  }, [props.dataCurrentWeek, props.dataPreviousWeek]);

  return (
    <div style={{ width: "100%", height: 250, position: "relative" }}>
      <ResponsiveContainer>
        <AreaChart data={mergedData}>
          <XAxis dataKey="date" tickMargin={10} />
          <YAxis tickMargin={10} />
          <Tooltip
            formatter={(value: number) => value}
            labelFormatter={(label: string) => label}
          />

          {/* Área para la semana actual */}
          <Area
            type="monotone"
            dataKey="currentWeek"
            stroke="#ff5733"
            fill="rgba(255,87,51,0.3)"
            strokeWidth={2}
          />

          {/* Área para la semana anterior */}
          <Area
            type="monotone"
            dataKey="previousWeek"
            stroke="#4287f5"
            fill="rgba(66,135,245,0.3)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
