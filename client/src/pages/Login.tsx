import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Login.css";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserLogin } from "../interfaces/auth";
import { useAuth } from "../context/AuthContext.tsx";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, errors: LoginErrors, isAuthenticated } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const onSubmit = async (data: UserLogin) => {
    login(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();
  return (
    <div className="Login">
      <div className="headerLogin">
        <img src="/MomentumLogoText.webp" alt="Login" className="imageLogin" />
      </div>
      <div className="formLogin">
        <FontAwesomeIcon icon={faUser} size="2x" className="icon" />
        <h2>Log in to your account</h2>
        <p className="subtitle">Reach your goals with Momentum</p>
        {LoginErrors.map((error, index) => (
          <p key={index} className="error">
            {error}
          </p>
        ))}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={errors.email ? "input-error" : ""}
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={errors.password ? "input-error" : ""}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-visibility-icon"
              color={errors.password ? "red" : "white"}
            />
          </div>
          <Button text="Log In" color1="#FF5733" color2="#FF1044" />
        </form>
        <p>
          Don't have an account?{" "}
          <a onClick={handleSignUpClick} className="loginLink">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
