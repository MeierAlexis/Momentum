import { pool } from "../db.ts";
import crypto from "node:crypto";

export const createNote = async (req, res) => {
  const { title, note } = req.body;
  const { id_goal } = req.params;
  const id = crypto.randomUUID();
  const date = new Date().toISOString();

  try {
    const dbRes = await pool.query(
      "INSERT INTO notes(id , id_goal ,date, note, title) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, id_goal, date, note, title]
    );
    res.status(200).json({
      message: "Note created",
      note: dbRes.rows[0],
    });
  } catch (error) {
    console.error("Something went wrong while creating note", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getNotes = async (req, res) => {
  const { id_goal } = req.params;

  try {
    const dbRes = await pool.query("SELECT * FROM notes WHERE id_goal = $1", [
      id_goal,
    ]);
    res.status(200).json(dbRes.rows);
  } catch (error) {
    console.error("Something went wrong while fetching notes", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteNote = async (req, res) => {
  const { id, id_goal } = req.params;
  try {
    await pool.query("DELETE FROM notes WHERE id = $1 AND id_goal = $2", [
      id,
      id_goal,
    ]);
    res.status(200).json({
      message: "Note deleted",
    });
  } catch (error) {
    console.error("Something went wrong while deleting note", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
