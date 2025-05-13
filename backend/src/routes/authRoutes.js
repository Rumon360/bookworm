import express from "express";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { authRateLimiter } from "../lib/ratelimit.js";

const router = express.Router();

router.post("/register", authRateLimiter, register);

router.post("/login", authRateLimiter, login);

export default router;
