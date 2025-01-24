import { GoalData } from "../src/interfaces/GoalData.ts";
import { HabitData } from "../src/interfaces/HabitData.ts";

export const initialGoals: GoalData[] = [
  {
    id: "1",
    title: "Loss 10 kg in 3 months",
    description: "Description 1",
    startDate: "2023-01-01",
    endDate: "2023-01-31",
    state: false,
    idUser: "1",
    target: 10,
  },
  {
    id: "2",
    title: "Goal 2",
    description: "Description 2",
    startDate: "2023-02-01",
    endDate: "2023-02-28",
    state: true,
    idUser: "1",
    target: 10,
  },
  {
    id: "3",
    title: "Goal 3",
    description: "Description 3",
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    state: false,
    idUser: "1",
    target: 10,
  },
  {
    id: "4",
    title: "Goal 4",
    description: "Description 4",
    startDate: "2023-04-01",
    endDate: "2023-04-30",
    state: false,
    idUser: "1",
    target: 10,
  },
  {
    id: "5",
    title: "Goal 5",
    description: "Description 5",
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    state: false,
    idUser: "1",
    target: 10,
  },
  {
    id: "6",
    title: "Goal 6",
    description: "Description 6",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    state: false,
    idUser: "1",
    target: 10,
  },
  {
    id: "7",
    title: "Goal 7",
    description: "Description 7",
    startDate: "2023-07-01",
    endDate: "2023-07-31",
    state: false,
    idUser: "1",
    target: 10,
  },
  {
    id: "8",
    title: "Goal 8",
    description: "Description 8",
    startDate: "2023-08-01",
    endDate: "2023-08-31",
    state: false,
    idUser: "1",
    target: 10,
  },
];

export const initialHabits: HabitData[] = [
  {
    id: "4",
    title: "Meditate",
    state: false,
    goalId: initialGoals[0].id,
    goalPerWeek: 7,
    completed: 0,
    createdAt: "2023-01-01",
    days: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
  },
  {
    id: "5",
    title: "Read",
    state: false,
    goalId: initialGoals[1].id,
    goalPerWeek: 5,
    completed: 2,
    createdAt: "2023-01-01",
    days: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
  },
  {
    id: "6",
    title: "Exercise",
    state: false,
    goalId: initialGoals[2].id,
    goalPerWeek: 3,
    completed: 0,
    createdAt: "2023-01-01",
    days: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
  },
  {
    id: "7",
    title: "Jogging",
    state: false,
    goalId: initialGoals[0].id,
    goalPerWeek: 3,
    completed: 1,
    createdAt: "2023-01-01",
    days: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
  },
];

export const DaylyQuotes = [
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "I don't stop when I'm tired; I stop when I'm done.",
    author: "David Goggins",
  },
];

export const initialUpdates = [
  {
    id: "1",
    id_goal: "1",
    date: "2023-01-01",
    progress: 5,
  },
  {
    id: "2",
    id_goal: "2",
    date: "2023-01-02",
    progress: 10,
  },
  {
    id: "3",
    id_goal: "1",
    date: "2023-01-03",
    progress: 15,
  },
  {
    id: "4",
    id_goal: "1",
    date: "2023-01-04",
    progress: 20,
  },
  {
    id: "5",
    id_goal: "1",
    date: "2023-01-05",
    progress: 25,
  },
  {
    id: "6",
    id_goal: "1",
    date: "2023-01-06",
    progress: 30,
  },
];
