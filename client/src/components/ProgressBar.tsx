import { useState } from "react";
import { initialHabits } from "../../data/InitialData";

export const ProgressBar = () => {
  const [habits, setHabits] = useState(initialHabits);

  return (
    <div className="progress-bar">
      {habits.map((habit) => (
        <div key={habit.title}>
          <p>{habit.title}</p>
          <progress value={habit.completed} max={habit.goalPerWeek}></progress>
          <span>
            {((habit.completed / habit.goalPerWeek) * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
};
