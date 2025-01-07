import React from "react";
import "../styles/Button.css";

interface ButtonProps {
  text?: string;
  color1?: string;
  color2?: string;
  onClick?: () => void;
  icon?: React.ReactNode; // Nueva propiedad para el ícono
  colorText?: string;
  width?: string;
  srcsvg?: string;
}

function Button(props: ButtonProps) {
  const {
    text,
    color1 = "#292929",
    color2 = "#111",
    colorText = "#fff",
    icon,
    onClick,
    width,
    srcsvg,
  } = props; // Colores por defecto

  return (
    <button
      className="button"
      style={{
        background: `linear-gradient(145deg, ${color1}, ${color2})`,
        color: colorText,
        width: width,
      }}
      onClick={onClick}
    >
      {icon && <span className="button-icon">{icon}</span>}{" "}
      {srcsvg && <img src={srcsvg} alt="icon" className="button-icon" />}
      {/* Renderizar el ícono si existe */}
      {text && <span className="button-text">{text}</span>}
    </button>
  );
}

export default Button;
