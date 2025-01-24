export interface GoalData {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  target: number;
  idUser: string;
  state: boolean;
}

export interface GoalUpdate {
  id: string;
  id_goal: string;
  date: string;
  progress: number;
}
