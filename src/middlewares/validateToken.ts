import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.ts";

export const authRequired = (req, res, next) => {
  // Get token from request
  const token = req.cookies?.token;

  //Check if token exists

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    // Attach user to request
    req.user = decoded; // decoded contains the user id or payload
    next();
  });
};
