import { useNavigate, useLocation } from "react-router";
import { NavButton } from "./NavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faHome,
  faMap,
  faQuestion,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/AuthContext.tsx";
import "../styles/SideBar.css";

export function SideBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentPath = useLocation().pathname;
  const handleLogout = () => {
    logout();
    navigate("/home");
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
  return (
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
          isSelected={currentPath === "/dashboard"}
          onClick={() => navigate("/dashboard")}
        />
        <NavButton
          text="Goals"
          colorText="white"
          width="100%"
          icon={<FontAwesomeIcon icon={faBullseye} size="lg" />}
          onClick={handleButtonGoals}
          isSelected={currentPath === "/goals"}
        />

        <NavButton
          text="Tracker"
          colorText="white"
          width="100%"
          icon={<FontAwesomeIcon icon={faMap} size="lg" />}
          onClick={handleButtonTracker}
          isSelected={currentPath === "/tracker"}
        />
        <NavButton
          text="Help"
          colorText="white"
          width="100%"
          icon={<FontAwesomeIcon icon={faQuestion} size="lg" />}
          onClick={handleButtonHelp}
          isSelected={currentPath === "/help"}
        />
        <NavButton
          text="Logout"
          colorText="white"
          width="100%"
          icon={<FontAwesomeIcon icon={faRightFromBracket} size="lg" />}
          onClick={handleLogout}
          isSelected={false}
        />
      </div>
    </div>
  );
}
