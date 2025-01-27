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
} from "../controllers/goalsHabit.controllers.ts";
import {
  createNote,
  getNotes,
  deleteNote,
} from "../controllers/notes.controllers.ts";
import { validateProgress } from "../middlewares/validateProgress.ts";

const router = Router();

router.get("/goals", authRequired, getGoals); // get all goals
router.post("/goals", authRequired, validationGoal, createGoal); // create goal
router.put("/goals/:id", authRequired, validationGoal, updateGoal); //update goal
router.delete("/goals/:id", authRequired, deleteGoal); // delete goal
router.get("/goals/:id", authRequired, getGoal); // get goal

router.get("/goals/:id/habits", authRequired, getHabitsByGoal); // get habits by goal
router.delete("/goals/:id/habits/:id_habit", authRequired, deleteHabitByGoal); // delete habit by goal
router.post("/goals/:id/habits", authRequired, validateHabit, createHabit); // create habit

router.put(
  "/goals/:id/habits/:id_habit",
  authRequired,
  validateHabit,
  updateHabit
); //update habit

router.post(
  "/goals/:id/progress",
  authRequired,
  validateProgress,
  updateProgress
);

// notes routes
router.post("/goals/:id_goal/notes", authRequired, validateNote, createNote);
router.get("/goals/:id_goal/notes", authRequired, getNotes);
router.delete("/goals/:id_goal/notes/:id", authRequired, deleteNote);

export default router;
