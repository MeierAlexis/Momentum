import { createContext, useState, useContext } from "react";

import {
  addGoalRequest,
  updateGoalRequest,
  deleteGoalRequest,
  getGoalsRequest,
  getGoalRequest,
} from "../api/goal.ts";

import {
  addHabitRequest,
  getHabitsRequest,
  updateHabitRequest,
  deleteHabitRequest,
} from "../api/habit.ts";

import { GoalData, GoalUpdate } from "../interfaces/GoalData";
import { HabitData } from "../interfaces/HabitData";

interface GoalHabitContextType {
  // State
  goals: GoalData[];
  habits: HabitData[];
  // Errors
  errors: string[];

  // Goals Functions
  addGoal: (goal: GoalData) => Promise<void>;
  updateGoal: (goal: GoalData) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  getGoals: () => Promise<GoalData[]>;
  getGoal: (goalId: string) => Promise<GoalData>;

  // Habits Functions
  addHabit: (habit: HabitData, goalId: string) => Promise<void>;
  updateHabit: (
    habit: HabitData,
    habitId: string,
    goalId: string
  ) => Promise<void>;
  deleteHabit: (habitId: string, goalId: string) => Promise<void>;
  getHabits: (goalId: string) => Promise<HabitData[]>;

  // Updates Functions

  UpdateProgress(progress: GoalUpdate): Promise<void>;
}

export const GoalHabitContext = createContext<GoalHabitContextType | null>(
  null
);

export const useGoalHabit = () => {
  const context = useContext(GoalHabitContext);
  if (!context) {
    throw new Error("useGoalHabit must be used within a GoalHabitProvider");
  }
  return context;
};

export const GoalHabitProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [habits, setHabits] = useState<HabitData[]>([]);

  const getGoal = async (goalId: string) => {
    try {
      const res = await getGoalRequest(goalId);
      return res.data;
    } catch (error) {
      console.error("Error al obtener la meta:", error);
    }
  };
  const getGoals = async () => {
    try {
      const res = await getGoalsRequest();
      setGoals(res.data);
      return res.data;
    } catch (error) {
      console.error("Error al obtener las metas:", error);
    }
  };

  const addGoal = async (goal: GoalData) => {
    console.log(goal);
    goal.target = Number(goal.target);

    try {
      await addGoalRequest(goal);
    } catch (error) {
      console.error("Error al crear la meta:", error);
      setErrors(["Error al crear la meta. Por favor, inténtalo de nuevo."]);
    }
  };

  const updateGoal = async (goal: GoalData) => {
    console.log(goal);
    try {
      const res = await updateGoalRequest(goal);
      setGoals(res.data);
    } catch (error) {
      console.error("Error al actualizar la meta:", error);
      setErrors([
        "Error al actualizar la meta. Por favor, inténtalo de nuevo.",
      ]);
    }
  };
  const deleteGoal = async (id: string) => {
    try {
      const res = await deleteGoalRequest(id);
      console.log(res.data);
      setGoals([...goals.filter((goal) => goal.id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };

  const addHabit = async (habit: HabitData, goalId: string) => {
    try {
      const res = await addHabitRequest(goalId, habit);

      setHabits([...habits, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getHabits = async (id: string) => {
    try {
      const res = await getHabitsRequest(id);
      setHabits(res.data);
      return res.data;
    } catch (error) {
      console.error("Something went wrong while fetching habits", error);
    }
  };

  const updateHabit = async (
    habit: HabitData,
    habitId: string,
    goalId: string
  ) => {};
  const deleteHabit = async (habitId: string, goalId: string) => {};
  const UpdateProgress = async (progress: GoalUpdate) => {};

  return (
    <GoalHabitContext.Provider
      value={{
        goals,
        habits,
        errors,
        addGoal,
        updateGoal,
        deleteGoal,
        addHabit,
        updateHabit,
        deleteHabit,
        UpdateProgress,
        getGoals,
        getGoal,
        getHabits,
      }}
    >
      {children}
    </GoalHabitContext.Provider>
  );
};
