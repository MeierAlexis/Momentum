import pg from "pg";

export const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "Alexismeier123",
  port: 5432,
});
