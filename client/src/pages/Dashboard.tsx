import "../styles/Dashboard.css";
import { NavButton } from "../components/NavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faGear,
  faHome,
  faMap,
  faQuestion,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { ChartProgression } from "../components/ChartProgression.tsx";
import { CustomPieChart } from "../components/CustomPieChart.tsx";
import { Habit } from "../components/Habit.tsx";

import { motion } from "framer-motion";
import { HabitData } from "../interfaces/HabitData.ts";
import { GoalData } from "../interfaces/GoalData.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Button from "../components/Button";
import { ExpansibleCard } from "../components/ExpansibleCard.tsx";

export function Dashboard() {
  // Initial Dates
  const initialGoals: GoalData[] = [
    {
      id: "1",
      title: "Goal 1",
      description: "Description 1",
      startDate: "2023-01-01",
      endDate: "2023-01-31",
      state: false,
    },
    {
      id: "2",
      title: "Goal 2",
      description: "Description 2",
      startDate: "2023-02-01",
      endDate: "2023-02-28",
      state: false,
    },
    {
      id: "3",
      title: "Goal 3",
      description: "Description 3",
      startDate: "2023-03-01",
      endDate: "2023-03-31",
      state: false,
    },
  ];

  const initialHabits: HabitData[] = [
    {
      id: "4",
      title: "Meditate",
      state: false,
      goalId: initialGoals[0].id,
    },
    {
      id: "5",
      title: "Read",
      state: false,
      goalId: initialGoals[1].id,
    },
    {
      id: "6",
      title: "Exercise",
      state: false,
      goalId: initialGoals[2].id,
    },
    {
      id: "7",
      title: "Jogging",
      state: false,
      goalId: initialGoals[0].id,
    },
  ];

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
    { date: "2023-01-07", completed: 4 },
    { date: "2023-01-08", completed: 5 },
    { date: "2023-01-09", completed: 4 },
    { date: "2023-01-08", completed: 5 },
    { date: "2023-01-09", completed: 4 },
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
  ];

  //states

  const [FailedHabits, setFailedHabits] = useState(0);

  const [weekView, setWeekView] = useState(true);

  const [goalsCompleted, setgoalsCompleted] = useState(0);

  const [streak, setStreak] = useState(0);

  const [goals, setGoals] = useState(initialGoals);

  const [habits, setHabits] = useState(initialHabits);

  const navigate = useNavigate();

  useEffect(() => {
    // Ordenar las fechas y contar los días consecutivos
    const completedDays = WeekData.filter((day) => day.completed === 5) // Verifica si todos los hábitos están completados
      // Filtra los días en los que hubo progreso
      .map((day) => new Date(day.date).getTime()) // Convierte a timestamp
      .sort((a, b) => a - b); // Ordena las fechas

    let currentStreak = 1;
    for (let i = 1; i < completedDays.length; i++) {
      const diff =
        (completedDays[i] - completedDays[i - 1]) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        currentStreak++;
      } else {
        currentStreak = 1; // Si hay un salto, reiniciar el contador
      }
    }
    setStreak(currentStreak);

    if (WeekData[6].completed !== 5) {
      setStreak(0);
    }
  }, [WeekData]); // Se ejecuta cuando los hábitos cambian

  useEffect(() => {
    // Lo puedo sacar de la base de datos con count
    const failedDays = WeekData.filter((day) => day.completed !== 5);
    setFailedHabits(failedDays.length);
  });

  const completeGoal = (id: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, state: true } : goal
      )
    );
    setgoalsCompleted((goalsCompleted) => goalsCompleted + 1);
  };

  // Función para obtener el título de un objetivo

  // Función para alternar el estado de un hábito
  const toggleHabitState = (id: string): void => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, state: !habit.state } : habit
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleButtonGoals = () => {
    navigate("/goals");
  };

  const handleButtonHelp = () => {
    navigate("/help");
  };

  const handleButtonTracker = () => {
    navigate("/tracker");
  };

  // Función para obtener los objetivos (con mensaje si no hay objetivos)
  const getGoals = () => {
    if (goals.length === 0) {
      return [{ id: crypto.randomUUID(), title: "You don't have any goals" }];
    }
    return goals.filter((goal) => !goal.state);
  };

  function getHabitsByGoal() {
    return goals
      .map((goal) => ({
        goal,
        habits: habits.filter(
          (habit) => habit.goalId === goal.id && !habit.state && !goal.state // Show habits that are not completed
        ),
      }))
      .filter(({ habits }) => habits.length > 0);
  }

  const handleButtonClick = () => {
    setWeekView(!weekView);
  };

  return (
    <div className="Dashboard">
      {/* Barra lateral */}
      <div className="SideBar">
        <img
          src="/MomentumLogoText.webp"
          alt="sidebar logo"
          style={{ width: "200px", height: "50px", filter: "invert(1)" }}
        />
        <div className="ButtonsNav">
          <NavButton
            text="Home"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faHome} size="lg" />}
            isSelected
            onClick={() => navigate("/dashboard")}
          />
          <NavButton
            text="Goals"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faBullseye} size="lg" />}
            onClick={handleButtonGoals}
          />

          <NavButton
            text="Tracker"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faMap} size="lg" />}
            onClick={handleButtonTracker}
          />
          <NavButton
            text="Help"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faQuestion} size="lg" />}
            onClick={handleButtonHelp}
          />
          <NavButton
            text="Logout"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faRightFromBracket} size="lg" />}
            onClick={handleLogout}
          />
        </div>
      </div>

      <div className="Analytics">
        <div className="DashboardHeader">
          <h1>Welcome Back, {sessionStorage.getItem("name")}</h1>
          <Button
            text="Add Goal"
            color1="#FF5733"
            color2="#C70039"
            width="180px"
            height="70px"
          ></Button>
        </div>
        <div className="AnalyticsContainer1">
          <div className="SquareDashboard WeeklyProgress">
            <h2>{weekView ? "Weekly" : "Monthly"} Progress</h2>
            <ChartProgression
              data={weekView ? WeekData : MonthData}
              onButtonClick={handleButtonClick}
              view={weekView ? "Month" : "Week"}
            />
          </div>
        </div>
        <div className="AnalyticsContainer2">
          <div className="AnalyticsContainer3">
            <div className="SquareDashboard ViewActiveGoals">
              <h2>Active Goals</h2>
              <ul className="GoalList">
                <motion.div
                  layout
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getGoals().map((goal) => (
                    <ExpansibleCard
                      title={goal.title}
                      description={goal.description}
                      key={goal.id}
                      startDate={goal.startDate}
                      endDate={goal.endDate}
                      state={goal.state}
                      onComplete={() => completeGoal(goal.id)}
                    ></ExpansibleCard>
                  ))}
                </motion.div>
              </ul>
            </div>
            <div className="SquareDashboard ViewCompletedGoals">
              <h2>Completed Goals</h2>
              <p>{goalsCompleted}</p>
            </div>
            <div className="SquareDashboard StreakHabits">
              <h2>Streak Days</h2>
              <p>{streak}</p>
            </div>
            <div className="SquareDashboard FailedHabits">
              <h2>Failed Habits</h2>
              <p>{FailedHabits}</p>
            </div>
          </div>

          <div className="SquareDashboard ViewHabitTracker">
            <h2>Habit Tracker</h2>
            <motion.div layout>
              {getHabitsByGoal().map(({ goal, habits }) => (
                <div key={goal.id} className="habit-container">
                  <h3>{goal.title}</h3>
                  {habits.map((habit) => (
                    <Habit
                      key={habit.id}
                      title={habit.title}
                      state={habit.state}
                      colorText={"#FFF"}
                      onToggle={() => toggleHabitState(habit.id)}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          <div className="SquareDashboard ViewWheelofLife">
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
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
