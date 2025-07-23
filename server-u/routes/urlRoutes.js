import express from "express";
import { shortenUrl, redirectUrl, getStats } from "../controllers/urlController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/shorturls",protectRoute, shortenUrl);
router.get("/:code", redirectUrl);
router.get("/shorturls/:code", protectRoute,getStats);

export default router;
