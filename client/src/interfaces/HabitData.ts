export interface HabitData {
  id?: string;
  title: string;
  state: boolean;
  goalId: string;
  createdAt?: string;
  goalPerWeek: number;
  completed: number;
  days: string;
}
