import { pool } from "../db.ts";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { createAccessToken } from "../libs/jwt.ts";

interface UserRegister {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  lastname: string;
  confirmpassword: string;
}

interface UserLogin {
  email: string;
  password: string;
}

export const loginUser = async (req, res) => {
  const { email, password }: UserLogin = req.body;

  const email_lower = email.toLowerCase();
  try {
    // Find user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email_lower,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result.rows[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create access token
    const token = await createAccessToken({ id: user.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const registerUser = async (req, res) => {
  const {
    name,
    lastname,
    username,
    email,
    password,
    confirmpassword,
  }: UserRegister = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  const email_lower = email.toLowerCase();

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const id = crypto.randomUUID();

    // Insert new user into database
    const result = await pool.query(
      "INSERT INTO users (id, name, username, email, password, created_at,lastname) VALUES ($1, $2, $3, $4, $5,NOW(), $6) RETURNING *",
      [id, name, username, email_lower, passwordHash, lastname]
    );

    // Create token access
    const token = await createAccessToken({ id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const profileUser = async (req, res) => {
  const { id } = req.user;

  try {
    // try find user
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    // if user not found
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // if user found
    const user = result.rows[0];

    return res.status(200).json({
      success: true,
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    });
  } catch (error) {
    console.error("Error in profileUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
