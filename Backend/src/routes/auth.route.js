import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", login).post("/register", register);

// module.exports = { authRouter };
