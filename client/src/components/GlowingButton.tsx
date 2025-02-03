import { useNavigate } from "react-router";
import "../styles/GlowingButton.css";

interface ButtonProps {
  text: string;
}

function GlowingButton({ text }: ButtonProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/register");
  };
  return (
    <button className="glowing-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default GlowingButton;
