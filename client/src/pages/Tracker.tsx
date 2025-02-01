// Corrected CSS import (was already correct)
import "../styles/Tracker.css";
import { SideBar } from "../components/SideBar";
import { ChartProgression } from "../components/ChartProgression";
import { Habit } from "../components/Habit";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ProgressBar } from "../components/ProgressBar.tsx";
import { ComparativeChart } from "../components/ComparativeChart.tsx";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";
import { HabitData } from "../interfaces/HabitData.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { getProgressRequest } from "../api/goal.ts";

export function Tracker() {
  const [goals, setGoals] = useState([]);
  const [streak, setStreak] = useState(0);
  const [failedHabits, setFailedHabits] = useState(0);
  const [todayHabits, setTodayHabits] = useState<HabitData[]>([]);
  const [habitsWeek, setHabitsWeek] = useState<HabitData[]>([]);
  const [progressWeek, setProgressWeek] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const {
    getGoals,
    getHabits,
    updateHabit,
    markHabitComplete,
    getStreak,
    getFailedHabits,
    getTodayHabits,
    getProgressWeekly,
    getProgressLastWeekly,
  } = useGoalHabit();

  const { user } = useAuth();

  const initialGoals = async () => {
    try {
      const goalsData = await getGoals();
      setGoals(goalsData.goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleCompleteHabit = async (habit: HabitData, goalId: string) => {
    // Create new object instead of mutating
    const updatedHabit = {
      ...habit,
      state: true,
      completed: habit.completed + 1,
    };

    try {
      await updateHabit(updatedHabit, goalId);
      await markHabitComplete(goalId, habit.id);

      // Update local state
      setTodayHabits((prev) =>
        prev.map((h) => (h.id === habit.id ? updatedHabit : h))
      );
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  useEffect(() => {
    const getStreakTracker = async () => {
      try {
        const res = await getStreak(user.id);
        setStreak(res.data.streak);
      } catch (error) {
        console.error("Error fetching streak:", error);
      }
    };
    getStreakTracker();
  }, [user.id, getStreak]);

  useEffect(() => {
    const getFailedHabitsTracker = async () => {
      try {
        const res = await getFailedHabits(user.id);
        setFailedHabits(res.data.failedHabits.failed_habits);
      } catch (error) {
        console.error("Error fetching failed habits:", error);
      }
    };
    getFailedHabitsTracker();
  }, [user.id, getFailedHabits]);

  useEffect(() => {
    const getCurrentProgress = async () => {
      try {
        const res = await getProgressWeekly(user.id);
        const res_last = await getProgressLastWeekly(user.id);
        if (
          res.success &&
          res.progress &&
          res_last.success &&
          res_last.progress
        ) {
          const formattedLastWeek = res_last.progress.map((item) => ({
            date: item.date,
            completed: item.total_completed,
          }));
          setLastWeek(formattedLastWeek);
          const formattedProgress = res.progress.map((item) => ({
            date: item.date,
            completed: item.total_completed,
          }));
          setProgressWeek(formattedProgress);
        }
      } catch (error) {
        console.error("Error fetching weekly progress:", error);
      }
    };
    getCurrentProgress();
  }, [user.id, getProgressWeekly, getProgressLastWeekly]);

  const initialHabits = async () => {
    try {
      const todayHabits: HabitData[] = [];
      const allHabits: HabitData[] = [];

      for (const goal of goals) {
        const habitsData = await getTodayHabits(goal.id);
        const habitsWeekData = await getHabits(goal.id);
        allHabits.push(...habitsWeekData.habits);
        todayHabits.push(...habitsData.habits);
      }
      setHabitsWeek(allHabits);
      setTodayHabits(todayHabits);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    initialGoals();
  }, []);

  useEffect(() => {
    if (goals.length > 0) {
      initialHabits();
    }
  }, [goals]);

  function getHabitsByGoal() {
    if (!goals || !todayHabits) return [];

    return goals
      .map((goal) => ({
        goal,
        habits: todayHabits.filter(
          // Fixed variable name
          (habit) => habit.id_goal === goal.id && !habit.state && !goal.state
        ),
      }))
      .filter(({ habits }) => habits.length > 0);
  }

  useEffect(() => {
    const checkDayChange = () => {
      const today = new Date().toDateString();
      const lastUpdate = localStorage.getItem("lastUpdate");

      if (lastUpdate !== today) {
        // Refresh data
        initialGoals();
        localStorage.setItem("lastUpdate", today);
      }
    };

    checkDayChange();
  }, [goals]); // Added dependency

  return (
    <div className="Tracker">
      <SideBar />

      <div className="TrackerAnalytics">
        <h2 className="TrackerTitle">Tracker</h2>
        <div className="SquareDashboard Progress">
          <h2>Weekly Progress</h2>
          <ChartProgression
            data={progressWeek}
            view="week"
            onButtonClick={() => {}}
          />
        </div>
        <h2 className="TrackerTitle">Tracker Analytics</h2>
        <div className="TrackerDetail">
          <div className="ContainerDetailPerformance">
            <div className="SquareDashboard StreakHabits">
              <h2>Streak Days</h2>
              <p>{streak}</p>
            </div>
            <div className="SquareDashboard FailedHabits">
              <h2>Failed Habits</h2>
              <p>{failedHabits}</p>
            </div>
          </div>

          <div className="SquareDashboard CompletedHabits">
            <h2>Week Progress</h2>
            {habitsWeek.map((habit) => (
              <ProgressBar
                key={habit.id}
                habitName={habit.title}
                completedHabits={habit.completed}
                totalHabits={habit.goal_per_week}
              />
            ))}
          </div>

          <div className="SquareDashboard ComparativeChart">
            <h2>Current vs Previous</h2>
            <ComparativeChart
              dataCurrentMonth={progressWeek}
              dataPreviousMonth={lastWeek}
            />
          </div>

          <div className="SquareDashboard HabitTracker">
            <h2>Habit Tracker</h2>
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getHabitsByGoal().length > 0 ? (
                getHabitsByGoal().map(
                  (
                    { goal, habits } // Fixed destructuring
                  ) => (
                    <div key={goal.id} className="habit-container">
                      <h3>{goal.title}</h3>
                      {habits.map((habit) => (
                        <Habit
                          key={habit.id}
                          title={habit.title}
                          state={habit.state}
                          colorText="#FFF"
                          onToggle={() => handleCompleteHabit(habit, goal.id)}
                        />
                      ))}
                    </div>
                  )
                )
              ) : (
                <div>No habits available</div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
