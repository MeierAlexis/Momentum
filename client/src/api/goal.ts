import { GoalData } from "../interfaces/GoalData";
import { ProgressData } from "../interfaces/ProgressData";

import axios from "./axios";

export const addGoalRequest = (goal: GoalData) => axios.post(`/goals`, goal);

export const deleteGoalRequest = (id: string) => axios.delete(`/goals/${id}`);

export const updateGoalRequest = (goal: GoalData) =>
  axios.put(`/goals/${goal.id}`, goal);

export const getGoalsRequest = () => axios.get(`/goals`);

export const getGoalRequest = (goalId: string) => axios.get(`/goals/${goalId}`);

export const addProgressRequest = (progress: ProgressData, id_goal: string) =>
  axios.post(`/goals/${id_goal}/progress`, progress);

export const getProgressRequest = (id_goal: string) =>
  axios.get(`/goals/${id_goal}/progress`);
