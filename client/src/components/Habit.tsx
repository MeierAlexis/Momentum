import "../styles/Habit.css";

interface HabitProps {
  title: string;
  state: boolean;
  onToggle: () => void;
  colorText?: string;
}

export function Habit({ title, state, onToggle, colorText }: HabitProps) {
  return (
    <div className={state ? "habit-active" : "habit"}>
      <button onClick={onToggle}>{state ? "" : ""}</button>
      <p style={{ color: colorText }}>{title}</p>
    </div>
  );
}
