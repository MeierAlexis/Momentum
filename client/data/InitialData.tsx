import { GoalData } from "../src/interfaces/GoalData.ts";
import { HabitData } from "../src/interfaces/HabitData.ts";

export const initialGoals: GoalData[] = [
  {
    id: "1",
    title: "Goal 1",
    description: "Description 1",
    startDate: "2023-01-01",
    endDate: "2023-01-31",
    state: false,
  },
  {
    id: "2",
    title: "Goal 2",
    description: "Description 2",
    startDate: "2023-02-01",
    endDate: "2023-02-28",
    state: false,
  },
  {
    id: "3",
    title: "Goal 3",
    description: "Description 3",
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    state: false,
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
  },
  {
    id: "5",
    title: "Read",
    state: false,
    goalId: initialGoals[1].id,
    goalPerWeek: 5,
    completed: 2,
  },
  {
    id: "6",
    title: "Exercise",
    state: false,
    goalId: initialGoals[2].id,
    goalPerWeek: 3,
    completed: 0,
  },
  {
    id: "7",
    title: "Jogging",
    state: false,
    goalId: initialGoals[0].id,
    goalPerWeek: 3,
    completed: 1,
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
