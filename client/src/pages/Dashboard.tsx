import "../styles/Dashboard.css";
import { NavButton } from "../components/NavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faGear,
  faHome,
  faQuestion,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export function Dashboard() {
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
            text="Analytics"
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
            text="Profile"
            colorText="white"
            width="100%"
            icon={<FontAwesomeIcon icon={faUser} size="lg" />}
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
      </div>
    </div>
  );
}
