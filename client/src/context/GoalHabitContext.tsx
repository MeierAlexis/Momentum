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
import { NoteData } from "../interfaces/NoteData.ts";
import {
  getNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
} from "../api/note.ts";

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

    goalId: string
  ) => Promise<void>;
  deleteHabit: (habitId: string, goalId: string) => Promise<void>;
  getHabits: (goalId: string) => Promise<HabitData[]>;

  //Notes Functions
  createNote: (note: NoteData, id_goal: string) => Promise<void>;
  getNotes: (id_goal: string) => Promise<NoteData[]>;
  deleteNote: (id_note: string, id_goal: string) => Promise<void>;

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

  const updateHabit = async (habit: HabitData, goalId: string) => {
    console.log(habit);
    try {
      const res = await updateHabitRequest(goalId, habit);
      setHabits(res.data);
    } catch (error) {
      console.error("Something went wrong while updating habit", error);
    }
  };
  const deleteHabit = async (habitId: string, goalId: string) => {
    try {
      await deleteHabitRequest(habitId, goalId);
    } catch (error) {
      console.error("Something went wrong while deleting habit", error);
    }
  };
  const UpdateProgress = async (progress: GoalUpdate) => {};

  const createNote = async (note: NoteData, id_goal: string) => {
    console.log(note, id_goal);
    try {
      const res = await createNoteRequest(note, id_goal);
      console.log(res);
    } catch (error) {
      console.error("Something went wrong while creating note", error);
    }
  };

  const getNotes = async (id_goal: string) => {
    try {
      const Notes = await getNotesRequest(id_goal);
      return Notes;
    } catch (error) {
      console.log("Something went wrong while fetching notes", error);
    }
  };

  const deleteNote = async (id: string, id_goal: string) => {
    try {
      await deleteNoteRequest(id, id_goal);
    } catch (error) {
      console.error("Something went wrong while deleting note", error);
    }
  };
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
        getNotes,
        createNote,
        deleteNote,
      }}
    >
      {children}
    </GoalHabitContext.Provider>
  );
};
