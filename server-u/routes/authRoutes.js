import express from "express";
import { register, login } from "../controllers/authController.js";
import { displayLogs } from "../middleware/displayLogs.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/displaylogs",protectRoute,displayLogs)
export default router;
