import express from "express";
import { createLog,displayLogs } from "../controllers/logController.js";
const router = express.Router();

router.post("/", createLog);
router.get("/display",displayLogs)
export default router;
