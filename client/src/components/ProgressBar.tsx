// ProgressBar.tsx
import React from "react";
import "../styles/ProgressBar.css";

interface ProgressBarProps {
  habitName: string;
  completedHabits: number;
  totalHabits: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  habitName,
  completedHabits,
  totalHabits,
}) => {
  const progress = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-header">
        <span className="habit-name">{habitName}</span>
        <span className="habit-percentage">{progress.toFixed(2)}%</span>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
          aria-label={`Progreso: ${progress.toFixed(2)}%`}
        ></div>
      </div>
    </div>
  );
};
