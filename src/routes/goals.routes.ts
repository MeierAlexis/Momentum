import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.ts";
import { validationGoal } from "../middlewares/validateGoal.ts";
import { validateHabit } from "../middlewares/validateHabit.ts";
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
} from "../controllers/goalsHabit.controllers.ts";

const router = Router();

router.get("/goals", authRequired, getGoals); // get all goals
router.post("/goals", authRequired, validationGoal, createGoal); // create goal
router.put("/goals/:id", authRequired, validationGoal, updateGoal); //update goal
router.delete("/goals/:id", authRequired, deleteGoal); // delete goal
router.get("/goals/:id", authRequired, getGoal); // get goal

router.get("/goals/:id/habits", authRequired, getHabitsByGoal); // get habits by goal
router.delete(
  "/goals/:id/habits/:id_habit",
  authRequired,
  validateHabit,
  deleteHabitByGoal
); // delete habit by goal
router.post("/goals/:id/habits", authRequired, validateHabit, createHabit); // create habit

router.put(
  "/goals/:id/habits/:id_habit",
  authRequired,
  validateHabit,
  updateHabit
); //update habit

export default router;
