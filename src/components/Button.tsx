import "../styles/Button.css";

interface ButtonProps {
  text: string;
}

function Button(props: ButtonProps) {
  const { text } = props;
  return <button className="button">{text}</button>;
}

export default Button;
