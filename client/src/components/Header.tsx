import "../styles/Header.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <header className="header">
      <Logo onClick={handleLogoClick} />
      <Navigation />
      <Button text="Log In" onClick={handleLoginClick} />
    </header>
  );
};

export default Header;
