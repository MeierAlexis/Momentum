import "../styles/Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <a href="#Features" className="navLink">
        Features
      </a>
      <Link to="/product" className="navLink">
        Product
      </Link>
      <a href="#Pricing" className="navLink">
        Pricing
      </a>
      <a href="#Cases" className="navLink">
        Cases
      </a>
    </nav>
  );
}

export default Navigation;
