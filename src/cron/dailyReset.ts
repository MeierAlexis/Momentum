import cron from "node-cron";
import { pool } from "../db.ts";
import {
  markHabitFail,
  updateHabitsCompleted,
} from "../controllers/goalsHabit.controllers.ts";

// Ejecutar diariamente a las 00:00 (huso horario del servidor)
export const scheduleDailyReset = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      // 1. Resetear estados de hábitos
      await pool.query("UPDATE habit SET state = false");

      // 2. Obtener hábitos no completados del día anterior
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dayName = yesterday.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "America/New_York",
      });

      // 3. Marcar hábitos fallidos en habit_log
      const { rows } = await pool.query(
        `
        SELECT id, id_goal 
        FROM habit 
        WHERE 
          days LIKE $1 
          AND state = false
      `,
        [`%${dayName}%`]
      );

      const { rows: rows_user } = await pool.query("SELECT id FROM users");

      if (rows) {
        for (const habit of rows) {
          const habitId = habit.id;
          await markHabitFail(habitId);
        }
      }
      if (rows_user) {
        for (const user of rows_user) {
          await updateHabitsCompleted(user.id);
        }
      }
    } catch (error) {
      console.error("Error en CRON job:", error);
    }
  });
};
