import React from "react";
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

interface AreaChartExampleProps {
  data: DataPoint[];
  view: string;
  onButtonClick: (action: string) => void;
  height?: number;
}

export const ChartProgression: React.FC<AreaChartExampleProps> = ({
  data,
  onButtonClick,
  view,
  height,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: height ? height : 300,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
        {onButtonClick && (
          <button
            onClick={() => onButtonClick("day")}
            style={{
              marginRight: 10,
              background: "#333",
              border: "1px solid #fff",
              color: "#fff",
            }}
          >
            {view}
          </button>
        )}
      </div>
      <ResponsiveContainer>
        <AreaChart
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
          <Area
            type="natural"
            dataKey="completed"
            stroke="#ff5733"
            fill="rgba(255, 87, 51, 0.1)"
            strokeWidth={3}
            activeDot={{ r: 10 }}
            dot={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
