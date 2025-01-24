import { GoalData } from "../interfaces/GoalData";

import axios from "./axios";

export const addGoalRequest = (goal: GoalData) => axios.post(`/goals`, goal);

export const deleteGoalRequest = (id: string) => axios.delete(`/goals/${id}`);

export const updateGoalRequest = (goal: GoalData) =>
  axios.put(`/goals/${goal.id}`, goal);

export const getGoalsRequest = () => axios.get(`/goals`);

export const getGoalRequest = (goalId: string) => axios.get(`/goals/${goalId}`);
