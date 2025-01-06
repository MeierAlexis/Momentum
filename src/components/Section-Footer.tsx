import "../styles/Section-Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
export default function SectionFooter() {
  return (
    <footer className="footer">
      <div className="containerFooter2">
        <div className="containerFooter">
          <div className="logoContainer">
            <img
              src="/MomentumLogoText.webp"
              alt="Company Logo"
              className="logo"
              style={{ filter: "invert(1)", width: "250px", height: "60px" }}
            />
          </div>
          <Button text="Try Momentum" color1="#FF5733" color2="#FF1044" />
          <div className="socialLinks">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              className="icon"
              id="facebook"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              className="icon"
              id="twitter"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              className="icon"
              id="instagram"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              className="icon"
              id="linkedin"
            />
          </div>
        </div>

        <div className="navLinks">
          <a href="/about" className="link">
            About Us
          </a>
          <a href="/services" className="link">
            Services
          </a>
          <a href="/contact" className="link">
            Contact
          </a>
          <a href="/privacy-policy" className="link">
            Privacy Policy
          </a>
        </div>
      </div>
      {/* Copyright Notice */}
      <div className="copyright">© 2025 Momentum. All Rights Reserved.</div>
    </footer>
  );
}
