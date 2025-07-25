import express from "express";
import { register, login,current, logoutUser } from "../controllers/authController.js";
import { displayLogs } from "../middleware/displayLogs.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/current-user",protectRoute,current)
router.get("/displaylogs",protectRoute,displayLogs)
router.get("/logout",protectRoute,logoutUser)
export default router;
