export interface HabitData {
  id?: string;
  title: string;
  state: boolean;
  id_goal: string;
  created_at?: string;
  goal_per_week: number;
  completed: number;
  days: string;
}
