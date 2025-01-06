import "../styles/Button.css";

interface ButtonProps {
  text: string;
  color1?: string;
  color2?: string;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { text, color1, color2 } = props;
  return (
    <button
      className="button"
      style={{ background: `linear-gradient(145deg, ${color1}, ${color2})` }}
      onClick={props.onClick}
    >
      {text}
    </button>
  );
}

export default Button;
