import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type CustomPieChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
    width: number;
    height: number;
  };
};

export const CustomPieChart: React.FC<CustomPieChartProps> = ({ data }) => {
  return (
    <div
      style={{
        width: data.width ? data.width : 300,
        margin: "0 auto",
        height: data.height ? data.height : 280,
      }}
    >
      <Radar
        data={data}
        options={{
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 10,
              grid: { color: "#666" },
              angleLines: { color: "#666" },
              ticks: { display: false },
              pointLabels: {
                font: {
                  size: 18,
                },
                color: "#ddd",
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
};
