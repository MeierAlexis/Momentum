export interface ProgressData {
  date?: string;
  progress: number;
  id_goal?: string;
}

export interface WeeklyProgress {
  day: string;
  completed: number;
}
