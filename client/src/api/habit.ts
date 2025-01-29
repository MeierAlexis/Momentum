import { HabitData } from "../interfaces/HabitData";

import axios from "./axios";

export const addHabitRequest = (goalId: string, habit: HabitData) =>
  axios.post(`/goals/${goalId}/habits`, habit);

export const updateHabitRequest = (goalId: string, habit: HabitData) =>
  axios.put(`/goals/${goalId}/habits/${habit.id}`, habit);

export const deleteHabitRequest = (goalId: string, habitId: string) =>
  axios.delete(`/goals/${goalId}/habits/${habitId}`);

export const getHabitsRequest = (id: string) =>
  axios.get(`/goals/${id}/habits`);

export const deleteHabitsRequest = (id_goal: string) =>
  axios.delete(`/goals/${id_goal}/habits`);
