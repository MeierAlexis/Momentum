import { SideBar } from "../components/SideBar";
import "../styles/Goals.css";
import { initialHabits, initialUpdates } from "../../data/InitialData.tsx";
import { useState, useEffect } from "react";
import { ExpansibleCard } from "../components/ExpansibleCard.tsx";
import { ChartProgression } from "../components/ChartProgression.tsx";
import { CustomPieChart } from "../components/CustomPieChart.tsx";
import { ProgressBar } from "../components/ProgressBar.tsx";
import { ExpansibleCardInput } from "../components/ExpansibleCardInput.tsx";
import { GoalData, GoalUpdate } from "../interfaces/GoalData";
import { HabitData } from "../interfaces/HabitData.ts";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";

export function Goals() {
  const [habits, setHabits] = useState<HabitData[]>(initialHabits);
  const [updates, setUpdates] = useState<GoalUpdate[]>(initialUpdates);
  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState<GoalData[]>([]);

  const { getGoals, updateGoal, deleteGoal } = useGoalHabit();

  // Obtener las metas al cargar el componente
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await getGoals();
        setGoals(goalsData.goals);
      } catch (error) {
        console.error("Error al obtener las metas:", error);
      }
    };

    fetchGoals();
  }, [getGoals]);

  function getActiveGoals() {
    return goals.filter((goal) => !goal.state);
  }

  const getCompletedGoals = () => {
    return goals.filter((goal) => goal.state);
  };
  const getProgressData = (goalId: string) => {
    return updates
      .filter((update) => update.id_goal === goalId)
      .map((update) => ({
        date: update.date,
        completed: update.progress,
      }));
  };

  const calculateGoalProgress = (goalId: string) => {
    const goalUpdates = updates.filter((update) => update.id_goal === goalId);
    if (goalUpdates.length === 0) return 0;
    return goalUpdates[goalUpdates.length - 1].progress;
  };

  const handleDelete = (goal: GoalData) => {
    deleteGoal(goal.id);
  };

  const handleComplete = (goal: GoalData) => {
    goal.state = true;
    updateGoal(goal);
  };

  return (
    <div className="GoalSection">
      <SideBar />
      <div className="Goals">
        <h2 className="GoalsTitle">Goals</h2>

        <div className="GoalAnalytics">
          <div className="GoalsContainer">
            {/* Active Goals */}
            <div className="SquareDashboard ActiveGoals">
              <h2>Active Goals</h2>
              {getActiveGoals().map((goal) => (
                <ExpansibleCard
                  key={goal.id}
                  {...goal}
                  onComplete={() => handleComplete(goal)}
                  onDelete={() => handleDelete(goal)}
                />
              ))}
              <button
                className="AddGoal"
                onClick={() => setShowForm(!showForm)}
              >
                <span>+</span> Add Goal
              </button>
              {showForm && <ExpansibleCardInput />}
            </div>

            <div className="SquareDashboard ProgressGoal">
              <h2>Progress</h2>
              {getActiveGoals().map((goal) => (
                <ProgressBar
                  key={goal.id}
                  habitName={goal.title}
                  completedHabits={calculateGoalProgress(goal.id)}
                  totalHabits={Number(goal.target)}
                />
              ))}
            </div>

            <div className="SquareDashboard AchievedGoal">
              <h2>Achieved Goals</h2>
              {getCompletedGoals().map((goal) => (
                <ExpansibleCard
                  key={goal.id}
                  {...goal}
                  id={goal.id}
                  onComplete={() => handleDelete(goal)}
                  onDelete={() => handleDelete(goal)}
                />
              ))}
            </div>
          </div>

          <div className="GoalsContainer4">
            <div className="GoalsContainer2">
              <div className="SquareDashboard WheelOfLife">
                <h2>Wheel of Life</h2>
                <CustomPieChart
                  data={{
                    labels: [
                      "Friends",
                      "Fun",
                      "Money",
                      "Family",
                      "Spirituality",
                      "Love",
                      "Career",
                      "Health",
                    ],
                    datasets: [
                      {
                        label: "Life Balance",
                        data: [0, 8, 5, 8, 0, 8, 5, 8],
                        backgroundColor: "rgba(255, 87, 51, 0.2)",
                        borderColor: "#ff5733",
                        borderWidth: 3,
                      },
                    ],
                    width: 400,
                    height: 400,
                  }}
                />
                <button className="AddGoal">Modify Wheel</button>
              </div>
              <div className="SquareDashboard Notes">
                <h2>Notes</h2>
                <textarea placeholder="Add a note" className="Notes"></textarea>
                <h5>Recent Notes</h5>
              </div>
            </div>

            {goals.length > 0 && (
              <div className="SquareDashboard GoalProgress">
                <h2>Progress: {goals[0].title}</h2>
                <ChartProgression
                  data={getProgressData(goals[0].id)}
                  view={"Week"}
                  height={200}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
