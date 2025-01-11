import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Register.css";
import {
  faRightToBracket,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const HandleBack = () => {
    navigate("/login");
  };
  return (
    <div className="register">
      <div className="headerRegister">
        <img src="/MomentumLogoText.webp" alt="Login" className="imageLogin" />
      </div>
      <div className="formRegister">
        <FontAwesomeIcon icon={faRightToBracket} size="2x" className="icon" />
        <h2>Sign up for free</h2>
        <p className="subtitle">Reach your goals with Momentum</p>
        <form>
          <div className="personalDataContainer">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email" />
          <div className="passwordContainer">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-visibility-icon"
            />
          </div>
          <div className="passwordContainer">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={toggleConfirmPasswordVisibility}
              className="password-visibility-icon"
            />
          </div>
          <Button
            text="Sign up"
            color1="#FF5733"
            color2="#FF1044"
            colorText="#fff"
          />
          <p className="loginLink">
            Already have an account? <a onClick={HandleBack}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
