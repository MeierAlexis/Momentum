import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Login.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import Button from "./Button";
export default function Login() {
  return (
    <div className="Login">
      <div className="headerLogin">
        <img src="/MomentumLogoText.webp" alt="Login" className="imageLogin" />
      </div>
      <div className="formLogin">
        <FontAwesomeIcon icon={faUser} size="2x" className="icon" />
        <h2>Log in to your account</h2>
        <p>Reach your goals with Momentum</p>
        <form>
          <div className="buttonsLogin">
            <Button
              color1="#fff"
              color2="#fff"
              colorText="#111"
              icon={<FontAwesomeIcon icon={faGoogle} size="1x" />}
            />
            <Button
              color1="#fff"
              color2="#fff"
              colorText="#111"
              icon={<FontAwesomeIcon icon={faFacebook} size="1x" />}
            />
            <Button
              color1="#fff"
              color2="#fff"
              colorText="#111"
              icon={<FontAwesomeIcon icon={faApple} size="1x" />}
            />
          </div>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Button text="Log In" color1="#FF5733" color2="#FF1044" />
        </form>
        <p>
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
