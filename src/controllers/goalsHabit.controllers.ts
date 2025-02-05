import { pool } from "../db.ts";
import crypto from "node:crypto";
export interface GoalData {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  target: number;
  idUser: string;
  state: boolean;
}

export const getGoals = async (req, res) => {
  const id_user = req.user.id;

  try {
    const result = await pool.query("SELECT * FROM goal WHERE id_user = $1", [
      id_user,
    ]);
    res.status(200).json({
      success: true,
      message: "Get goals",
      goals: result.rows,
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(404).json({
      message: "Goal not found",
      success: false,
      error: err.message || err,
    });
  }
};

export const deleteHabitLogRequest = async (req, res) => {
  const { habitId } = req.params;

  try {
    await pool.query("DELETE FROM habit_log WHERE id_habit = $1", [habitId]);
    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({
      message: "An error occurred while deleting the habit",
      success: false,
      error: err,
    });
  }
};

export const getHabitLog = async (req, res) => {
  const { habitId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM habit_log WHERE id_habit = $1",
      [habitId]
    );
    res.status(200).json({
      success: true,
      message: "Get habit log",
      habitLog: result.rows,
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(404).json({
      message: "Habit log not found",
      success: false,
      error: err,
    });
  }
};

export const createGoal = async (req, res) => {
  const { title, description, start_date, end_date, target }: GoalData =
    req.body;

  try {
    const id = crypto.randomUUID();
    const id_user = req.user.id;
    const state = false;

    const result = await pool.query(
      "INSERT INTO goal (id, title, description, start_date, end_date, state, id_user, target) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        id,
        title,
        description,
        start_date,
        end_date,
        state,
        id_user,
        Number(target),
      ]
    );

    res.status(201).json({
      success: true,
      message: "Goal created successfully",
      goal: result.rows[0],
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({
      message: "An error occurred while creating the goal",
      success: false,
      error: err.message || err,
    });
  }
};

export const deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM goal WHERE id = $1", [id]);
    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(404).json({
      message: "Goal not found",
      success: false,
    });
  }
};

export const getGoal = async (req, res) => {
  // goal id
  const { id } = req.params;

  // find id goal
  const result = await pool.query("SELECT * FROM goal WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: "Goal not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Get goal",
    goal: result.rows[0],
  });
};

export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, description, start_date, end_date, target, state }: GoalData =
    req.body;

  try {
    const result = await pool.query(
      "UPDATE goal SET title= $1, description= $2, start_date= $3, end_date= $4, target= $5, state= $6 WHERE id = $7 RETURNING *",
      [title, description, start_date, end_date, target, state, id]
    );
    return res.status(200).json({
      success: true,
      message: "Goal updated successfully",
      goal: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while updating the goal",
      success: false,
    });
  }
};

export const createHabit = async (req, res) => {
  const { id: id_goal } = req.params;
  const { title, days } = req.body;
  const id_habit = crypto.randomUUID();
  const state = false;

  const completed = 0;
  const goal_per_week = days.split(",").length; // Cuenta la cantidad de dias

  try {
    // Inserción en la base de datos con retorno de datos creados
    const result = await pool.query(
      "INSERT INTO habit (id, id_goal, title, state, goal_per_week, completed, days) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id_habit, id_goal, title, state, goal_per_week, completed, days]
    );

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      habit: result.rows[0], // Devuelve el habit creado
    });
  } catch (err) {
    console.error("Error creating habit:", err); // Agrega un log del error
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteHabitByGoal = async (req, res) => {
  const { id: id_goal, id_habit } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM habit WHERE id_goal = $1 AND id = $2",
      [id_habit, id_goal]
    );
    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(404).json({
      message: "Habit not found",
      success: false,
    });
  }
};

export const getHabitsByGoal = async (req, res) => {
  const { id: id_goal } = req.params;

  try {
    const result = await pool.query("SELECT * FROM habit WHERE id_goal = $1", [
      id_goal,
    ]);
    return res.status(200).json({
      success: true,
      message: "Get habits",
      habits: result.rows,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Habit not found",
    });
  }
};

export const updateProgress = async (req, res) => {
  const { id: id_goal } = req.params;
  const { progress } = req.body;
  const date = new Date().toISOString();
  const id = crypto.randomUUID();
  try {
    const result = await pool.query(
      "INSERT INTO goal_update (id,date, progress, id_goal) VALUES ($1,$2, $3, $4) RETURNING *",
      [id, date, progress, id_goal]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating progress:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating progress" });
  }
};
export const updateHabit = async (req, res) => {
  const { id: id_goal, id_habit } = req.params;

  const { goal_per_week, title, state, days, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE habit SET goal_per_week= $1, title= $2, state= $3, days= $4, completed= $5 WHERE id_goal = $6 AND id = $7 RETURNING *",
      [goal_per_week, title, state, days, completed, id_goal, id_habit]
    );

    return res.status(200).json({
      success: true,
      message: "The habit was updated successfully",
      habit: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error ocurred while updating the habit",
      success: false,
    });
  }
};

export const getProgress = async (req, res) => {
  const { id: id_goal } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM goal_update WHERE id_goal = $1",
      [id_goal]
    );
    return res.status(200).json({
      success: true,
      message: "Get progress",
      progress: result.rows,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Progress not found",
    });
  }
};

export const deleteProgress = async (req, res) => {
  const { id: id_goal } = req.params;

  try {
    await pool.query("DELETE FROM goal_update WHERE id_goal = $1", [id_goal]);

    return res.status(200).json({
      success: true,
      message: "Delete progress",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Progress not found",
    });
  }
};

export const deleteHabits = async (req, res) => {
  const { id_goal } = req.params;

  try {
    await pool.query("DELETE FROM habit WHERE id_goal = $1", [id_goal]);

    res.status(200).json({
      success: true,
      message: "Deleted all habits",
    });
  } catch (error) {
    console.error("Something went wrong while deleting habits", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete habits",
    });
  }
};

export const getTodayHabits = async (req, res) => {
  const { goalId } = req.params;
  const today = new Date().toLocaleString("en-US", { weekday: "long" });

  try {
    const habits = await pool.query(
      `SELECT * FROM habit 
       WHERE id_goal = $1 
       AND days LIKE $2`,
      [goalId, `%${today}%`]
    );

    res.status(200).json({
      message: "Habits finded",
      habits: habits.rows,
    });
  } catch (error) {
    console.error("Something went wrong while fetching daily habits", error);
  }
};

export const markHabitComplete = async (req, res) => {
  const { habitId } = req.params;
  const id = crypto.randomUUID();
  const date = new Date().toISOString().split("T")[0];
  try {
    await pool.query(
      "INSERT INTO habit_log (id, id_habit, date, completed) VALUES ($1,$2,$3,$4) ",
      [id, habitId, date, true]
    );
    res.status(200).json({
      success: true,
      message: "New habit completed",
    });
  } catch (error) {
    console.error(
      "Something went wrong while inserting a new habit completed",
      error
    );
  }
};

export const getProgressWeekly = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM habits_completed WHERE id_user = $1 ORDER BY date DESC LIMIT 7;
      `,
      [userId]
    );
    return res.status(200).json({
      message: "Get progress weekly",
      success: true,
      progress: result.rows,
    });
  } catch (error) {
    console.error("Something went wrong while fetching progress weekly", error);
  }
};

export const getProgressLastWeekly = async (req, res) => {
  const { userId } = req.params;

  // Obtener la fecha actual
  const currentDate = new Date();

  // Calcular la fecha de hace 7 días
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  const sevenDaysAgoString = sevenDaysAgo.toISOString().split("T")[0];

  try {
    const result = await pool.query(
      `SELECT * FROM habits_completed 
       WHERE id_user = $1 
       AND date >= $2 
       ORDER BY date ASC LIMIT 7;`,
      [userId, sevenDaysAgoString]
    );

    return res.status(200).json({
      message: "Get progress last weekly",
      success: true,
      progress: result.rows,
    });
  } catch (error) {
    console.error(
      "Something went wrong while fetching progress last weekly",
      error
    );
  }
};

export const updateHabitsCompleted = async (id_user: string) => {
  try {
    const id = crypto.randomUUID();
    const date = new Date().toISOString().split("T")[0];

    const completed = await pool.query(
      `SELECT COUNT(*) FROM habit_log WHERE completed = TRUE AND date = $1`,
      [date]
    );
    const completedCount = completed.rows[0].count;

    await pool.query(
      `
      INSERT INTO habits_completed (id, id_user, date, total_completed)
      VALUES ($1,$2,$3,$4);
    `,
      [id, id_user, date, completedCount]
    );
  } catch (error) {
    console.error("Error updating habits_completed:", error);
  }
};

export const markHabitFail = async (habitId: string) => {
  const id = crypto.randomUUID();
  const date = new Date().toLocaleString("en");
  try {
    await pool.query(
      "INSERT INTO habit_log(id, id_habit, date, completed) VALUES ($1,$2,$3,$4) ",
      [id, habitId, date, false]
    );
  } catch (error) {
    console.error(
      "Something went wrong while inserting a new habit failed",
      error
    );
  }
};

export const getStreak = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      WITH RECURSIVE 
        -- Obtener todas las fechas únicas donde el usuario completó hábitos
        dates AS (
          SELECT DISTINCT hl.date
          FROM habit_log hl
          JOIN habit h ON hl.id_habit = h.id
          JOIN goal g ON h.id_goal = g.id
          WHERE g.id_user = $1 AND hl.completed = TRUE
        ),
        -- Encontrar la fecha más reciente
        latest_date AS (
          SELECT MAX(date) AS date FROM dates
        ),
        -- Calcular la racha actual de forma recursiva
        streak AS (
          SELECT date, 1 AS count
          FROM latest_date
          UNION ALL
          SELECT d.date, s.count + 1
          FROM streak s
          JOIN dates d ON d.date = s.date - INTERVAL '1 day'
        )
      -- Retornar la racha máxima encontrada (0 si no hay datos)
      SELECT COALESCE(MAX(count), 0) AS streak FROM streak
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      message: "Current streak calculated",
      streak: result.rows[0].streak,
    });
  } catch (error) {
    console.error("Error fetching streak:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getFailedHabits = async (req, res) => {
  const { userId } = req.params;

  try {
    const failedHabits = await pool.query(
      `SELECT COUNT (*) as failed_habits FROM habit_log WHERE completed = FALSE AND id_habit IN (SELECT id FROM habit WHERE id_goal IN (SELECT id FROM goal WHERE id_user = $1))
            AND date BETWEEN CURRENT_DATE - INTERVAL '7 days' AND CURRENT_DATE;
        `,
      [userId]
    );

    res.status(200).json({
      message: "Failed habits was sucessfully finded",
      success: true,
      failedHabits: failedHabits.rows[0],
    });
  } catch (error) {
    console.error("Something went wrong while fetching failed habits", error);
  }
};

export const getWheel = async (req, res) => {
  const id_user = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM wheel_of_life WHERE id_user = $1",
      [id_user]
    );
    return res.status(200).json({
      success: true,
      message: "Get wheel",
      wheel: result.rows,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Wheel not found",
    });
  }
};

export const updateWheel = async (req, res) => {
  const id_user = req.user.id;

  const { friends, health, fun, career, money, love, family, spirituality } =
    req.body;
  const date = new Date().toISOString();

  try {
    const result = await pool.query(
      "UPDATE wheel_of_life SET date = $1, friends = $2, health = $3, fun = $4, career = $5, money = $6, love = $7, family = $8, spirituality = $9 WHERE id_user = $10 RETURNING *",
      [
        date,
        friends,
        health,
        fun,
        career,
        money,
        love,
        family,
        spirituality,
        id_user,
      ]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Wheel updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating wheel:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the wheel" });
  }
};

export const createWheel = async (req, res) => {
  const id_user = req.user.id;
  const { friends, health, fun, career, money, love, family, spirituality } =
    req.body;
  const date = new Date().toISOString();
  const id = crypto.randomUUID();
  try {
    await pool.query(
      "INSERT INTO wheel_of_life (id,id_user, date, friends, health, fun, career, money, love, family, spirituality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        id,
        id_user,
        date,
        friends,
        health,
        fun,
        career,
        money,
        love,
        family,
        spirituality,
      ]
    );
    res.status(200).json({
      success: true,
      message: "Wheel created successfully",
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(404).json({
      message: "Wheel not found",
      success: false,
    });
  }
};
