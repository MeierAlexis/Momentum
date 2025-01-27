import { useState, useEffect, useCallback } from "react";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";
import { SideBar } from "../components/SideBar";
import "../styles/Goals.css";
import { initialHabits, initialUpdates } from "../../data/InitialData.tsx";
import { ExpansibleCard } from "../components/ExpansibleCard.tsx";
import { ChartProgression } from "../components/ChartProgression.tsx";
import { CustomPieChart } from "../components/CustomPieChart.tsx";
import { ProgressBar } from "../components/ProgressBar.tsx";
import { ExpansibleCardInput } from "../components/ExpansibleCardInput.tsx";
import { ExpansibleCardNotes } from "../components/ExpansibleCardNotes.tsx";
import { ExpansibleCardInputNotes } from "../components/ExpansibleCardInputNotes.tsx";
import { GoalData, GoalUpdate } from "../interfaces/GoalData";
import { HabitData } from "../interfaces/HabitData.ts";
import { NoteData } from "../interfaces/NoteData.ts";

export function Goals() {
  const [habits, setHabits] = useState<HabitData[]>(initialHabits);
  const [updates, setUpdates] = useState<GoalUpdate[]>(initialUpdates);
  const [showForm, setShowForm] = useState(false);
  const [showFormNotes, setShowFormNotes] = useState(false);
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [notes, setNotes] = useState<NoteData[]>([]);

  const { getGoals, updateGoal, deleteGoal, createNote, deleteNote, getNotes } =
    useGoalHabit();

  // Obtener las metas al cargar el componente (solo una vez)
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
  }, []); // Array vacío para que se ejecute solo una vez

  // Obtener las notas de las metas cuando `goals` cambie
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const allNotes: NoteData[] = [];
        for (const goal of goals) {
          const notesData = await getNotes(goal.id);
          allNotes.push(...notesData.data); // Acumula las notas
        }
        setNotes(allNotes); // Actualiza el estado una sola vez
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };

    if (goals.length > 0) {
      fetchNotes();
    }
  }, [goals]); // Dependencia: goals

  const getActiveGoals = () => goals.filter((goal) => !goal.state);
  const getCompletedGoals = () => goals.filter((goal) => goal.state);

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

  const handleDelete = (goalID: string) => {
    try {
      deleteGoal(goalID);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalID));
    } catch (error) {
      console.error("Something went wrong:", error);
    }
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
                  onDelete={() => handleDelete(goal.id)}
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
                  onComplete={() => handleDelete(goal.id)}
                  onDelete={() => handleDelete(goal.id)}
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
              <div className="NotesProgress">
                <div className="SquareDashboard Notes">
                  <h2>Notes</h2>
                  <div
                    style={{
                      overflowY: "auto",
                      overflowX: "hidden",
                      scrollbarColor: "#ff5733 #333", // Standardized property for Firefox
                      scrollbarWidth: "thin", // Standardized property for Firefox
                    }}
                  >
                    {showFormNotes && <ExpansibleCardInputNotes />}
                    {notes.map((note) => (
                      <ExpansibleCardNotes key={note.id} {...note} />
                    ))}
                  </div>
                  <button
                    className="AddGoal"
                    onClick={() => setShowFormNotes(!showFormNotes)}
                  >
                    <span>+</span> Add Note
                  </button>
                </div>

                <div className="SquareDashboard ProgressGoals">
                  <h2>Last Progress Update</h2>
                  <button
                    className="AddGoal"
                    onClick={() => setShowForm(!showForm)}
                  >
                    <span>+</span> Add Progress
                  </button>
                </div>
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
