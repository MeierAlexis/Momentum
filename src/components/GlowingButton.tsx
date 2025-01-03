import "../styles/GlowingButton.css";

interface ButtonProps {
  text: string;
}

function GlowingButton(props: ButtonProps) {
  const { text } = props;
  return <button className="glowing-button">{text}</button>;
}

export default GlowingButton;
