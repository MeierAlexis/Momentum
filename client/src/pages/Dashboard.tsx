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

export function Dashboard() {
  const initialData = [
    { date: "2023-01-01", completed: 5 },
    { date: "2023-01-02", completed: 4 },
    { date: "2023-01-03", completed: 4 },
    { date: "2023-01-04", completed: 5 },
    { date: "2023-01-05", completed: 3 },
    { date: "2023-01-06", completed: 4 },
    { date: "2023-01-07", completed: 4 },
  ];

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  return (
    <div className="Dashboard">
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
          />
          <NavButton
            text="Goals"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faBullseye} size="lg" />}
          />
          <NavButton
            text="Settings"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faGear} size="lg" />}
          />

          <NavButton
            text="Tracker"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faMap} size="lg" />}
          />
          <NavButton
            text="Help"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faQuestion} size="lg" />}
          />
          <NavButton
            text="Logout"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faRightFromBracket} size="lg" />}
          />
        </div>
      </div>

      <div className="Analytics">
        <h1>Hi {sessionStorage.getItem("name")}</h1>
        <div className="AnalyticsContainer1">
          <div className="SquareDashboard WeeklyProgress">
            <h2>Weekly Progress</h2>
            <ChartProgression data={initialData} />
          </div>
        </div>
        <div className="AnalyticsContainer2">
          <div className="SquareDashboard ViewActiveGoals">
            <h2>Active Goals</h2>
            <ul className="GoalList">
              <li className="Goal">Goal 1</li>
              <li className="Goal">Goal 2</li>
              <li className="Goal">Goal 3</li>
            </ul>
          </div>
          <div className="SquareDashboard ViewHabitTracker">
            <h2>Habit Tracker</h2>
          </div>
          <div className="SquareDashboard ViewWheelofLife">
            <h2>Wheel of Life</h2>
            <CustomPieChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
