import { createContext, useState, useContext } from "react";
import {
  createWheelRequest,
  updateWheelRequest,
  getWheelRequest,
} from "../api/wheel.ts";
import {
  addGoalRequest,
  updateGoalRequest,
  deleteGoalRequest,
  getGoalsRequest,
  getGoalRequest,
  addProgressRequest,
  getProgressRequest,
  deleteProgressRequest,
} from "../api/goal.ts";

import {
  addHabitRequest,
  getHabitsRequest,
  updateHabitRequest,
  deleteHabitRequest,
  deleteHabitsRequest,
  getStreakRequest,
  getFailedHabitsRequest,
  markHabitCompleteRequest,
  markHabitFailRequest,
  getTodayHabitsRequest,
  getLastWeeklyProgressRequest,
  getWeeklyProgressRequest,
} from "../api/habit.ts";

import { GoalData } from "../interfaces/GoalData";
import { ProgressData, WeeklyProgress } from "../interfaces/ProgressData.ts";
import { HabitData } from "../interfaces/HabitData";
import { NoteData } from "../interfaces/NoteData.ts";
import {
  getNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  deleteNotesRequest,
} from "../api/note.ts";
import { WheelOfLifeData } from "../interfaces/WheelOfLifeData.ts";

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
  deleteHabits: (goalId: string) => Promise<void>;
  getTodayHabits: (goalId: string) => Promise<HabitData[]>;
  markHabitComplete: (goalId: string, habitId: string) => Promise<void>;
  markHabitFailed: (goalId: string, habitId: string) => Promise<void>;
  getStreak: (userId: string) => Promise<number>;
  getFailedHabits: (userId: string) => Promise<number>;

  //Notes Functions
  createNote: (note: NoteData, id_goal: string) => Promise<void>;
  getNotes: (id_goal: string) => Promise<NoteData[]>;
  deleteNote: (id_note: string, id_goal: string) => Promise<void>;
  deleteNotes: (id_goal: string) => Promise<void>;

  // Updates Functions

  addProgress(progress: ProgressData, id_goal: string): Promise<void>;
  getProgress(id_goal: string): Promise<ProgressData[]>;
  deleteProgress(id_goal: string): Promise<void>;
  getProgressWeekly(userId: string): Promise<WeeklyProgress[]>;
  getProgressLastWeekly(userId: string): Promise<WeeklyProgress[]>;

  // Wheel Functions
  createWheel: (wheel: WheelOfLifeData) => Promise<void>;
  updateWheel: (wheel: WheelOfLifeData) => Promise<void>;
  getWheel: () => Promise<WheelOfLifeData>;
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
    goal.target = Number(goal.target);

    try {
      await addGoalRequest(goal);
    } catch (error) {
      console.error("Error al crear la meta:", error);
      setErrors(["Error al crear la meta. Por favor, inténtalo de nuevo."]);
    }
  };

  const updateGoal = async (goal: GoalData) => {
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
      await deleteGoalRequest(id);
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

  const getTodayHabits = async (goalId: string) => {
    try {
      const TodayHabits = await getTodayHabitsRequest(goalId);

      return TodayHabits.data;
    } catch (error) {
      console.error("Somenthing went wrong while fetching today habits", error);
    }
  };

  const markHabitComplete = async (goalId: string, habitId: string) => {
    try {
      await markHabitCompleteRequest(goalId, habitId);
    } catch (error) {
      console.error("Something went wrong while mark habit completed", error);
    }
  };

  const markHabitFailed = async (goalId: string, habitId: string) => {
    try {
      await markHabitFailRequest(goalId, habitId);
    } catch (error) {
      console.error("Something went wrong while mark habit failed", error);
    }
  };

  const getStreak = async (userId: string) => {
    try {
      const res = getStreakRequest(userId);

      return res;
    } catch (error) {
      console.error("Something went wrong while fetching streak", error);
    }
  };

  const getFailedHabits = async (userId: string) => {
    try {
      const res = getFailedHabitsRequest(userId);
      return res;
    } catch (error) {
      console.error("Something went wrong while getting failed habits", error);
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

  const deleteHabits = async (goalID: string) => {
    try {
      await deleteHabitsRequest(goalID);
    } catch (error) {
      console.error("Something went wrong while deleting habits", error);
    }
  };

  const addProgress = async (progress: ProgressData, id_goal: string) => {
    try {
      await addProgressRequest(progress, id_goal);
    } catch (error) {
      console.error("Something went wrong while updating progress", error);
    }
  };
  const getProgress = async (id_goal: string) => {
    try {
      const res = await getProgressRequest(id_goal);
      return res.data;
    } catch (error) {
      console.error("Something went wrong while fetching progress", error);
    }
  };

  const deleteProgress = async (id_goal: string) => {
    try {
      await deleteProgressRequest(id_goal);
    } catch (error) {
      console.log("Something went wrong while deleting progress", error);
    }
  };

  const getProgressWeekly = async (userId: string) => {
    try {
      const res = await getWeeklyProgressRequest(userId);

      return res.data;
    } catch (error) {
      console.error("Something went wrong while fetching progress", error);
    }
  };

  const getProgressLastWeekly = async (userId: string) => {
    try {
      const res = await getLastWeeklyProgressRequest(userId);

      return res.data;
    } catch (error) {
      console.error("Something went wrong while fetching progress", error);
    }
  };

  const createNote = async (note: NoteData, id_goal: string) => {
    try {
      await createNoteRequest(note, id_goal);
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

  const deleteNotes = async (id_goal: string) => {
    try {
      await deleteNotesRequest(id_goal);
    } catch (error) {
      console.error("Something went wrong while deleting notes", error);
    }
  };

  const createWheel = async (wheel: WheelOfLifeData) => {
    try {
      await createWheelRequest(wheel);
    } catch (error) {
      console.error("Something went wrong while creating wheel", error);
    }
  };

  const getWheel = async () => {
    try {
      const res = await getWheelRequest();
      return res.data;
    } catch (error) {
      console.error("Something went wrong while fetching wheel", error);
    }
  };

  const updateWheel = async (wheel: WheelOfLifeData) => {
    try {
      await updateWheelRequest(wheel);
    } catch (error) {
      console.error("Something went wrong while updating wheel", error);
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
        addProgress,
        getProgress,
        getGoals,
        getGoal,
        getHabits,
        getProgressWeekly,
        getNotes,
        getTodayHabits,
        getFailedHabits,
        markHabitComplete,
        getStreak,
        markHabitFailed,
        createNote,
        getProgressLastWeekly,
        deleteNote,
        createWheel,
        getWheel,
        updateWheel,
        deleteNotes,
        deleteHabits,
        deleteProgress,
      }}
    >
      {children}
    </GoalHabitContext.Provider>
  );
};
