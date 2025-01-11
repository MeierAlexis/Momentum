import { pool } from "../db.ts";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

interface Goal {
  id: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date | null;
  state: boolean;
  id_user: string;
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
  const { title, description, start_date, end_date }: Goal = req.body;

  try {
    const id = crypto.randomUUID();
    const id_user = req.user.id;
    const state = false;
    const endDate = null;
    // Convierte start_date a Date
    const startDate = new Date(start_date);

    if (end_date) {
      const endDate = new Date(end_date);
    }

    const result = await pool.query(
      "INSERT INTO goal (id, title, description, start_date, end_date, state, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, title, description, startDate, endDate, state, id_user]
    );

    res.status(201).json({
      success: true,
      message: "Goal created successfully",
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
    const result = await pool.query("DELETE FROM goal WHERE id = $1", [id]);
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
  const { title, description, start_date, end_date }: Goal = req.body;

  try {
    const result = await pool.query(
      "UPDATE goal SET title= $1, description= $2, start_date= $3, end_date= $4 WHERE id = $5 RETURNING *",
      [title, description, start_date, end_date, id]
    );
    return res.status(200).json({
      sucess: true,
      message: "Goal update successfully",
      goal: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error ocurred while updating the goal",
      success: false,
    });
  }
};

export const createHabit = async (req, res) => {
  const { id: id_goal } = req.params;
  const { title, frequency } = req.body;

  try {
    const id_habit = crypto.randomUUID();
    const state = false;

    // Inserción en la base de datos con retorno de datos creados
    const result = await pool.query(
      "INSERT INTO habit (id, id_goal, frequency, title, state) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_habit, id_goal, frequency, title, state]
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
      "DELETE * FROM habit WHERE id_goal = $1 AND id = $2",
      [id_goal, id_habit]
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
  console.log(id_goal);
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

export const updateHabit = async (req, res) => {
  const { id: id_goal, id_habit } = req.params;
  console.log(id_habit);
  const { frequency, title, state } = req.body;

  try {
    const result = await pool.query(
      "UPDATE habit SET frequency = $1, title = $2, state = $3 WHERE id = $4 AND id_goal = $5 RETURNING *",
      [frequency, title, state, id_habit, id_goal] // Pasar los dos IDs en la consulta
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
