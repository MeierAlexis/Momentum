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

export const getTodayHabitsRequest = (goalId: string) =>
  axios.get(`/goals/${goalId}/habits/today`);

export const markHabitCompleteRequest = (goalId: string, habitId: string) =>
  axios.post(`/goals/${goalId}/habits/${habitId}/complete`);

export const markHabitFailRequest = (goalId: string, habitId: string) =>
  axios.post(`/goals/${goalId}/habits/${habitId}/fail`);

export const getStreakRequest = (userId: string) =>
  axios.get(`/streak/${userId}`);

export const getFailedHabitsRequest = (userId: string) =>
  axios.get(`/failed-habits/${userId}`);

export const getWeeklyProgressRequest = (userId: string) =>
  axios.get(`/goals/progress/weekly/${userId}`);

export const getLastWeeklyProgressRequest = (userId: string) =>
  axios.get(`/goals/progress/last-weekly/${userId}`);

export const deleteHabitLogRequest = (habitId: string, goalId: string) =>
  axios.delete(`/
goals/${goalId}/habits/${habitId}/delete`);

export const getHabitLogRequest = (habitId: string, goalId: string) =>
  axios.get(`/goals/${goalId}/habits/${habitId}/log`);
