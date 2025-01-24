import { HabitData } from "../interfaces/HabitData";

import axios from "./axios";

export const addHabitRequest = (goalId: string, habit: HabitData) =>
  axios.post(`/goals/${goalId}/habits`, habit);

export const updateHabitRequest = (
  goalId: string,
  habitId: string,
  habit: HabitData
) => axios.put(`/goals/${goalId}/habits/${habitId}`, habit);

export const deleteHabitRequest = (goalId: string, habitId: string) =>
  axios.delete(`/goals/${goalId}/habits/${habitId}`);

export const getHabitsRequest = (id: string) =>
  axios.get(`/goals/${id}/habits`);
