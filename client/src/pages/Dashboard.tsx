import "../styles/Dashboard.css";
import { SideBar } from "../components/SideBar.tsx";
import { CustomPieChart } from "../components/CustomPieChart.tsx";
import { motion } from "framer-motion";
import { initialGoals, DaylyQuotes } from "../../data/InitialData.tsx";
import { useState, useEffect } from "react";
import Button from "../components/Button.tsx";
import { ExpansibleCard } from "../components/ExpansibleCard.tsx";
import { useAuth } from "../context/AuthContext.tsx";

export function Dashboard() {
  const [goals, setGoals] = useState(initialGoals);
  const { user } = useAuth();

  const completeGoal = (id: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, state: true } : goal
      )
    );
  };

  const getActiveGoals = () => goals.filter((goal) => !goal.state);

  const getCompletedGoalsCount = () =>
    goals.filter((goal) => goal.state).length;

  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(
    null
  );

  useEffect(() => {
    const randomQuote =
      DaylyQuotes[Math.floor(Math.random() * DaylyQuotes.length)];
    setQuote(randomQuote);
  }, []);
  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = date.getFullYear();
    return `${day} ${months[month]} ${year}`;
  };

  const getDay = () => {
    const date = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  return (
    <div className="Dashboard">
      <SideBar />
      <div className="Analytics">
        <div className="DashboardHeader">
          <div className="DashboardHeaderText">
            <h1>Dashboard</h1>
            <h3>
              <span>{getDay()},</span> {getDate()}
            </h3>
          </div>
          <Button
            text="Add Goal"
            color1="#FF5733"
            color2="#C70039"
            width="180px"
            height="70px"
            onClick={() => console.log("Add Goal clicked!")}
          />
        </div>

        <div className="AnalyticsContainer1">
          <div className="PrincipalSquare">
            <img src="./Progress-dashboard.svg" alt="" />
            <div className="PrincipalSquareText">
              <h2>
                Welcome Back, <span>{user?.name}</span>
              </h2>
              <p>Have a great day achieving your goals</p>
            </div>
          </div>
        </div>

        <h1 className="AnalyticsTitle">Analytics</h1>

        <div className="AnalyticsContainer3">
          <div className="AnalyticsGrid">
            <div className="SquareDashboard ViewLastGoalUpdated">
              <h2>Last Goal Updated</h2>
              <ul className="GoalList">
                <p>No goals updated yet</p>
              </ul>
            </div>
            <div className="SquareDashboard ViewCompletedGoals">
              <h2>Completed Goals</h2>
              <p>{getCompletedGoalsCount()}</p>
            </div>
          </div>

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
                {getActiveGoals().length > 0 ? (
                  getActiveGoals().map((goal) => (
                    <ExpansibleCard
                      title={goal.title}
                      description={goal.description}
                      key={goal.id}
                      startDate={goal.startDate}
                      endDate={goal.endDate}
                      state={goal.state}
                      onComplete={() => completeGoal(goal.id)}
                    />
                  ))
                ) : (
                  <p>No active goals</p>
                )}
              </motion.div>
            </ul>
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

          <div className="SquareDashboard InspirationalQuote">
            <h2>Inspirational Quote</h2>
            <p>"{quote?.quote}"</p>
            <span>-{quote?.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
