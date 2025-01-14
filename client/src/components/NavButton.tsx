import "../styles/NavButton.css";

interface NavButtonProps {
  text: string;
  color1?: string;
  color2?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  colorText?: string;
  width?: string;
  srcsvg?: string;
  isSelected?: boolean;
}

export function NavButton(props: NavButtonProps) {
  return (
    <button
      className={`Navbutton ${props.isSelected ? "selected" : ""}`}
      style={{
        background: `linear-gradient(145deg, ${props.color1}, ${props.color2})`,
        color: props.colorText,
        width: props.width,
      }}
      onClick={props.onClick}
      type="submit"
    >
      {props.icon && (
        <span
          className={`buttonnav-icon ${props.isSelected ? "selected" : ""}`}
        >
          {props.icon}
        </span>
      )}
      {props.srcsvg && (
        <img
          src={props.srcsvg}
          alt="icon"
          className={`buttonnav-icon ${props.isSelected ? "selected" : ""}`}
        />
      )}

      {/* Renderizar el ícono si existe */}
      {props.text && <span className="buttonav-text">{props.text}</span>}
    </button>
  );
}
