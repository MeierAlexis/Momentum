import "../styles/Tracker.css";
import { SideBar } from "../components/SideBar";
import { ChartProgression } from "../components/ChartProgression";
import { Habit } from "../components/Habit";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { initialHabits, initialGoals } from "../../data/InitialData.tsx";
import { ProgressBar } from "../components/ProgressBar.tsx";
import { ComparativeChart } from "../components/ComparativeChart.tsx";

// Datos estáticos movidos fuera del componente
const WeekData = [
  { date: "2023-01-01", completed: 5 },
  { date: "2023-01-02", completed: 4 },
  { date: "2023-01-03", completed: 4 },
  { date: "2023-01-04", completed: 4 },
  { date: "2023-01-05", completed: 5 },
  { date: "2023-01-06", completed: 5 },
  { date: "2023-01-08", completed: 5 },
];

const MonthData = [
  { date: "2023-01-01", completed: 5 },
  { date: "2023-01-02", completed: 4 },
  { date: "2023-01-03", completed: 4 },
  { date: "2023-01-04", completed: 5 },
  { date: "2023-01-05", completed: 3 },
  { date: "2023-01-06", completed: 4 },
];

const PreviousMonthData = [
  { date: "2023-02-01", completed: 2 },
  { date: "2023-02-02", completed: 3 },
  { date: "2023-02-03", completed: 4 },
  { date: "2023-02-04", completed: 1 },
  { date: "2023-02-05", completed: 4 },
  { date: "2023-02-06", completed: 5 },
];

export function Tracker() {
  const [goals, setGoals] = useState(initialGoals);
  const [streak, setStreak] = useState(0);
  const [failedHabits, setFailedHabits] = useState(0);
  const [weekView, setWeekView] = useState(true);
  const [habits, setHabits] = useState(initialHabits);

  const handleButtonClick = () => {
    setWeekView(!weekView);
  };

  function getHabitsByGoal() {
    return goals
      .map((goal) => ({
        goal,
        habits: habits.filter(
          (habit) => habit.goalId === goal.id && !habit.state && !goal.state
        ),
      }))
      .filter(({ habits }) => habits.length > 0);
  }

  const toggleHabitState = (id: string): void => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, state: !habit.state } : habit
      )
    );
  };

  useEffect(() => {
    const completedDays = WeekData.filter((day) => day.completed === 5)
      .map((day) => new Date(day.date).getTime())
      .sort((a, b) => a - b);

    let currentStreak = 1;
    for (let i = 1; i < completedDays.length; i++) {
      const diff =
        (completedDays[i] - completedDays[i - 1]) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    }
    setStreak(WeekData[6].completed === 5 ? currentStreak : 0);
  }, []);

  useEffect(() => {
    const failedDays = WeekData.filter((day) => day.completed !== 5);
    setFailedHabits(failedDays.length);
  }, []);

  return (
    <div className="Tracker">
      <SideBar />

      <div className="TrackerAnalytics">
        <h2 className="TrackerTitle">Tracker</h2>
        <div className="SquareDashboard Progress">
          <h2>{weekView ? "Weekly" : "Monthly"} Progress</h2>
          <ChartProgression
            data={weekView ? WeekData : MonthData}
            onButtonClick={handleButtonClick}
            view={weekView ? "Month" : "Week"}
          />
        </div>
        <h2 className="TrackerTitle">Tracker Analytics</h2>
        <div className="TrackerDetail">
          <div className="ContainerDetailPerfomance">
            <div className="SquareDashboard StreakHabits">
              <h2>Streak Days</h2>
              <p>{streak}</p>
            </div>
            <div className="SquareDashboard  FailedHabits">
              <h2>Failed Habits</h2>
              <p>{failedHabits}</p>
            </div>
          </div>
          <div className="SquareDashboard  CompletedHabits">
            <h2>Week Progress</h2>
            {habits.map((habit) => (
              <ProgressBar
                key={habit.id}
                habitName={habit.title}
                completedHabits={habit.state ? 1 : 0}
                totalHabits={7}
              />
            ))}
          </div>

          <div className="SquareDashboard  ComparativeChart">
            <h2>Current vs Previous</h2>
            <ComparativeChart
              dataCurrentMonth={MonthData}
              dataPreviousMonth={PreviousMonthData}
            />
          </div>
          <div className="SquareDashboard  HabitTracker">
            <h2>Habit Tracker</h2>
            {motion ? (
              <motion.div layout>
                {getHabitsByGoal().map(({ goal, habits }) => (
                  <div key={goal.id} className="habit-container">
                    <h3>{goal.title}</h3>
                    {habits.map((habit) => (
                      <Habit
                        key={habit.id}
                        title={habit.title}
                        state={habit.state}
                        colorText="#FFF"
                        onToggle={() => toggleHabitState(habit.id)}
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
            ) : (
              <div>No habits available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
