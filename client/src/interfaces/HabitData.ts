export interface HabitData {
  id: string;
  title: string;
  state: boolean;
  goalId: string;
  goalPerWeek?: number;
  completed?: number;
}
