import { pool } from "../db.ts";
import crypto from "node:crypto";
import { createAccessToken } from "../libs/jwt.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.ts";

interface UserRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  lastname: string;
  confirmPassword: string;
}

interface UserLogin {
  email: string;
  password: string;
}

export const loginUser = async (req, res) => {
  const { email, password }: UserLogin = req.body;
  const email_lower = email.toLowerCase().trim();
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
        message: "Invalid Password",
      });
    }

    // Create access token
    const token = await createAccessToken({ id: user.id });

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
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
    confirmPassword,
  }: UserRegister = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: ["Passwords do not match"],
    });
  }

  const email_lower = email.toLowerCase().trim();

  try {
    const userFound = await pool.query("SELECT * FROM users WHERE email = $1", [
      email_lower,
    ]);

    if (userFound.rowCount > 0) {
      return res.status(400).json({
        message: ["User email already exists"],
      });
    }
    const usernameFound = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (usernameFound.rowCount > 0) {
      return res.status(400).json({
        message: ["Username already exists"],
      });
    }
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
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
      name: result.rows[0].name,
    });
  } catch (error) {
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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyToken = async (req, res) => {
  // get token
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  // verify token
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    // recover user from token
    const AuthenticatedUser = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.id]
    );

    // token valid, but user not found
    if (!AuthenticatedUser.rows[0]) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // responde user
    return res.status(200).json({
      id: AuthenticatedUser.rows[0].id,
      name: AuthenticatedUser.rows[0].name,
      lastName: AuthenticatedUser.rows[0].lastname,
      email: AuthenticatedUser.rows[0].email,
    });
  });
};
