import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Login.css";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Login">
      <div className="headerLogin">
        <img src="/MomentumLogoText.webp" alt="Login" className="imageLogin" />
      </div>
      <div className="formLogin">
        <FontAwesomeIcon icon={faUser} size="2x" className="icon" />
        <h2>Log in to your account</h2>
        <p className="subtitle">Reach your goals with Momentum</p>
        <form>
          <input type="text" placeholder="Email" />
          <div className="password-container">
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
          <Button text="Log In" color1="#FF5733" color2="#FF1044" />
          <div className="separator">Or continue with</div>
          <div className="buttonsLogin">
            <Button
              color1="#fff"
              color2="#fff"
              colorText="#111"
              srcsvg="/google-icon.svg"
              text="Google"
              width="150px"
            />
            <Button
              color1="#fff"
              color2="#fff"
              colorText="#111"
              srcsvg="/apple-logo.svg"
              text="Apple"
              width="150px"
            />
            <Button
              color1="#fff"
              color2="#fff"
              colorText="#111"
              srcsvg="/microsoft-logo.svg"
              width="150px"
              text="Microsoft"
            />
            <Button
              color1="#fff"
              color2="#fff"
              colorText="#111"
              srcsvg="/slack-logo.svg"
              width="150px"
              text="Slack"
            />
          </div>
        </form>
        <p>
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
