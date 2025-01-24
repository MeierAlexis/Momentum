import { HabitData } from "./HabitData";
export interface ExtensibleCardProps {
  id?: string;
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  target?: string;
  state?: boolean;
  style?: React.CSSProperties;
  Habits?: HabitData[];
}
