import "../styles/Header.css";

import Logo from "./Logo";
import Navigation from "./Navigation";
import Button from "./Button";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      <Button text="Log In" />
    </header>
  );
};

export default Header;
