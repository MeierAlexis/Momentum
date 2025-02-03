import { useState, useEffect } from "react";
import { useGoalHabit } from "../context/GoalHabitContext.tsx";
import { SideBar } from "../components/SideBar";
import "../styles/Goals.css";
import { ExpansibleCard } from "../components/ExpansibleCard.tsx";
import { ChartProgression } from "../components/ChartProgression.tsx";
import { CustomPieChart } from "../components/CustomPieChart.tsx";
import { ProgressBar } from "../components/ProgressBar.tsx";
import { ExpansibleCardInput } from "../components/ExpansibleCardInput.tsx";
import { ExpansibleCardNotes } from "../components/ExpansibleCardNotes.tsx";
import { ExpansibleCardInputNotes } from "../components/ExpansibleCardInputNotes.tsx";
import { GoalData } from "../interfaces/GoalData";
import { ProgressData } from "../interfaces/ProgressData.ts";
import { NoteData } from "../interfaces/NoteData.ts";
import { AddProgressForm } from "../components/AddProgressForm.tsx";
import confetti from "canvas-confetti";
import { WheelOfLifeForm } from "../components/WheelOfLifeForm.tsx";
import { HabitData } from "../interfaces/HabitData.ts";

export function Goals() {
  const [updates, setUpdates] = useState<ProgressData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormNotes, setShowFormNotes] = useState(false);
  const [habitsDelete, setHabitsDelete] = useState<HabitData[]>([]);
  const [habits, setHabits] = useState<HabitData[]>([]);
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [selectedGoalProgressId, setSelectedGoalProgressId] = useState<
    string | null
  >(null);
  const [showFormProgress, setShowFormProgress] = useState(false);
  const {
    getGoals,
    updateGoal,
    deleteGoal,
    getNotes,
    getProgress,
    getWheel,
    deleteHabits,
    deleteProgress,
    deleteNotes,
    deleteHabitLog,
    getHabitLog,
    getHabits,
  } = useGoalHabit();

  const [showFormWheel, setShowFormWheel] = useState(false);

  const [wheel, setWheel] = useState<number[] | null>(null);
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await getGoals();
        setGoals(goalsData.goals);
        if (goalsData.goals.length > 0) {
          setSelectedGoalProgressId(goalsData.goals[0].id);
        }
      } catch (error) {
        console.error("Error al obtener las metas:", error);
      }
    };

    fetchGoals();
  }, []);
  useEffect(() => {
    const fetchWheel = async () => {
      try {
        const wheelData = await getWheel();

        const {
          career,
          family,
          friends,
          fun,
          health,
          love,
          money,
          spirituality,
        } = wheelData.wheel[0];
        const arrayWheelData = [
          friends,
          fun,
          money,
          family,
          spirituality,
          love,
          career,
          health,
        ];
        setWheel(arrayWheelData);
      } catch (error) {
        console.error("Error fetching wheel:", error);
      }
    };

    fetchWheel();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const allNotes: NoteData[] = [];
        for (const goal of goals) {
          const notesData = await getNotes(goal.id);
          allNotes.push(...notesData.data);
        }
        setNotes(allNotes);
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };

    if (goals.length > 0) {
      fetchNotes();
    }
  }, [goals]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const allProgress: ProgressData[] = [];
        for (const goal of goals) {
          const progressData = await getProgress(goal.id);
          allProgress.push(...progressData.progress);
        }
        setUpdates(allProgress);
      } catch (error) {
        console.error("Error al obtener el progreso:", error);
      }
    };

    if (goals.length > 0) {
      fetchProgress();
    }
  }, [goals]);

  const getActiveGoals = () => goals.filter((goal) => !goal.state);
  const getCompletedGoals = () => goals.filter((goal) => goal.state);

  const getProgressChartData = (goalId: string) => {
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

  const handleDelete = async (goalID: string) => {
    try {
      const res = await getHabits(goalID);
      const habitsToDelete = res.habits;

      for (const habit of habitsToDelete) {
        // Verificar si existen registros en habit_log antes de eliminarlos
        const habitLogCount = await getHabitLog(habit.id, goalID);

        if (habitLogCount) {
          await deleteHabitLog(habit.id, goalID);
        }
      }

      await deleteHabits(goalID);
      await deleteProgress(goalID);
      await deleteNotes(goalID);
      await deleteGoal(goalID);

      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalID));
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.id_goal !== goalID)
      );
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id_goal !== goalID)
      );
      setUpdates((prevUpdates) =>
        prevUpdates.filter((update) => update.id_goal !== goalID)
      );
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleComplete = (goal: GoalData) => {
    goal.state = true;
    confetti();
    updateGoal(goal);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGoalProgressId(e.target.value);
  };

  return (
    <div className="GoalSection">
      <SideBar />
      <div className="Goals">
        <h2 className="GoalsTitle">Goals</h2>
        <div className="GoalAnalytics">
          <div className="GoalsContainer">
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
                        data: wheel ? wheel : [0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: "rgba(255, 87, 51, 0.2)",
                        borderColor: "#ff5733",
                        borderWidth: 3,
                      },
                    ],
                    width: 400,
                    height: 400,
                  }}
                />
                <button
                  className="AddGoal"
                  onClick={() => setShowFormWheel(!showFormWheel)}
                >
                  Modify Wheel
                </button>
                {showFormWheel && <WheelOfLifeForm />}
              </div>
              <div className="NotesProgress">
                <div className="SquareDashboard Notes">
                  <h2>Notes</h2>
                  <div
                    style={{
                      overflowY: "auto",
                      overflowX: "hidden",
                      scrollbarColor: "#ff5733 #333",
                      scrollbarWidth: "thin",
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
                  {updates.length === 0 && (
                    <p
                      style={{
                        color: "#ddd",
                        fontSize: "16px",
                        margin: "10px 10px",
                      }}
                    >
                      No progress updates yet
                    </p>
                  )}
                  {updates.length > 0 && (
                    <p
                      style={{
                        color: "#ddd",
                        fontSize: "35px",
                        margin: "10px 10px",
                        alignSelf: "center",
                      }}
                    >
                      {new Date(
                        updates[updates.length - 1].date
                      ).toLocaleDateString()}
                    </p>
                  )}
                  <button
                    className="AddGoal"
                    onClick={() => setShowFormProgress(!showFormProgress)}
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    <span>+</span> Add Progress
                  </button>
                  {showFormProgress && (
                    <AddProgressForm
                      goals={goals}
                      selectedGoalId={selectedGoalId}
                      onSelectGoal={setSelectedGoalId}
                    />
                  )}
                </div>
              </div>
            </div>

            {goals.length > 0 && (
              <div className="SquareDashboard GoalProgress">
                <select
                  value={selectedGoalProgressId || ""}
                  onChange={handleGoalChange}
                >
                  {getActiveGoals().map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title || "Goal"}
                    </option>
                  ))}
                </select>
                <ChartProgression
                  data={getProgressChartData(selectedGoalProgressId || "")}
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
