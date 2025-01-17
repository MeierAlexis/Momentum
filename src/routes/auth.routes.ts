import { Router } from "express";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validationAuth.ts";

import { authRequired } from "../middlewares/validateToken.ts";

import {
  loginUser,
  registerUser,
  logoutUser,
  profileUser,
  verifyToken,
} from "../controllers/auth.controllers.ts";

const router = Router();

router.post("/login", validateLogin, loginUser);
router.post("/register", validateRegister, registerUser);
router.post("/logout", authRequired, logoutUser);
router.get("/profile", authRequired, profileUser); //This is a protected route
router.get("/verify-token", verifyToken);

export default router;
