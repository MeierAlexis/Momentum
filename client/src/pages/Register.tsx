import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import "../styles/Register.css";
import {
  faRightToBracket,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.tsx";
import { UserRegister } from "../interfaces/auth.ts";
import { useEffect } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, isAuthenticated, errors: AuthErrors } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>();

  const HandleBack = () => {
    navigate("/login");
  };

  // Manejo de formulario asíncrono
  const onSubmit = async (data: UserRegister) => {
    signup(data);
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
        {AuthErrors.map((error, index) => (
          <p key={index} className="error">
            {error}
          </p>
        ))}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="personalDataContainer">
            <input
              type="text"
              placeholder="First Name"
              {...register("name", { required: "First name is required" })}
            />
            {errors.name && <p className="error">"Name is required"</p>}{" "}
            {/* Show a error message */}
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <p className="error">"Last Name is required"</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className="error">"Username is required"</p>}
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="error">"Email is required"</p>}
          <div className="passwordContainer">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="error">"Password is required"</p>}
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
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            {errors.confirmPassword && (
              <p className="error">"Please confirm your password"</p>
            )}
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
