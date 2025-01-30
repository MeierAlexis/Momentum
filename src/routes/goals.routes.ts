import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.ts";
import { validationGoal } from "../middlewares/validateGoal.ts";
import { validateHabit } from "../middlewares/validateHabit.ts";
import { validateNote } from "../middlewares/validateNotes.ts";
import {
  getGoals,
  createGoal,
  deleteGoal,
  getGoal,
  getHabitsByGoal,
  deleteHabitByGoal,
  createHabit,
  updateGoal,
  updateHabit,
  updateProgress,
  getProgress,
  createWheel,
  updateWheel,
  getWheel,
  deleteHabits,
  deleteProgress,
  markHabitComplete, // ✅ Nuevo controlador
  markHabitFail, // ✅ Nuevo controlador
  getStreak, // ✅ Nuevo controlador
  getFailedHabits, // ✅ Nuevo controlador
  getTodayHabits, // ✅ Ya estaba definido
} from "../controllers/goalsHabit.controllers.ts";
import {
  getNotes,
  createNote,
  deleteNote,
  deleteNotes,
} from "../controllers/notes.controllers.ts";
import { validateProgress } from "../middlewares/validateProgress.ts";

const router = Router();

// goals endpoints
router.get("/goals", authRequired, getGoals);
router.post("/goals", authRequired, validationGoal, createGoal);
router.put("/goals/:id", authRequired, validationGoal, updateGoal);
router.delete("/goals/:id", authRequired, deleteGoal);
router.get("/goals/:id", authRequired, getGoal);

// habits endpoints
router.get("/goals/:id/habits", authRequired, getHabitsByGoal);
router.post("/goals/:id/habits", authRequired, validateHabit, createHabit);
router.put(
  "/goals/:id/habits/:id_habit",
  authRequired,
  validateHabit,
  updateHabit
);
router.delete("/goals/:id/habits/:id_habit", authRequired, deleteHabitByGoal);
router.delete("/goals/:id_goal/habits", authRequired, deleteHabits);
router.get("/goals/:id_goal/habits/today", authRequired, getTodayHabits);
router.post(
  "goals/:id_goal/habits/:habitId/complete",
  authRequired,
  markHabitComplete
);
router.post("goals/:id_goal/habits/:habitId/fail", authRequired, markHabitFail);
router.get("/streak/:id_user", authRequired, getStreak);
router.get("/failed-habits/:id_user", authRequired, getFailedHabits);

//wheel of life endpoints
router.get("/wheel", authRequired, getWheel);
router.post("/wheel", authRequired, createWheel);
router.put("/wheel", authRequired, updateWheel);

// progress endpoints
router.post(
  "/goals/:id/progress",
  authRequired,
  validateProgress,
  updateProgress
);

router.get("/goals/:id/progress", authRequired, getProgress);
router.delete("/goals/:id/progress", authRequired, deleteProgress);

// notes routes
router.post("/goals/:id_goal/notes", authRequired, validateNote, createNote);
router.get("/goals/:id_goal/notes", authRequired, getNotes);
router.delete("/goals/:id_goal/notes/:id", authRequired, deleteNote);
router.delete("/goals/:id_goal/notes", authRequired, deleteNotes);

export default router;
