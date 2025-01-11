import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.ts";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}
