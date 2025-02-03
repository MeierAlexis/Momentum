export interface ProgressData {
  date?: string;
  progress: number;
  id_goal?: string;
}

export interface WeeklyProgress {
  day: string;
  completed: number;
}

export interface HabitLog {
  id: string;
  id_habit: string;
  date: string;
  completed: boolean;
}
