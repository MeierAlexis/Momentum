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
  console.log("Id:", id);
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
  console.log("id_goal", id_goal, "id_habit", id_habit);
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
  const { date, progress } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO goal_update (date, progress, id_goal) VALUES ($1, $2, $3) RETURNING *",
      [date, progress, id_goal]
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
  console.log(id_habit);
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
