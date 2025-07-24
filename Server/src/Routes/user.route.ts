import express from "express";
import { chackauth, createUser, login } from "../Controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.mid";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/test", authMiddleware , chackauth);

export default router;