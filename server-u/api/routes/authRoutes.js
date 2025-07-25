const express = require("express");
const { register, login, current, logoutUser } = require("../controllers/authController");
const { displayLogs } = require("../middleware/displayLogs");
const { protectRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", protectRoute, current);
router.get("/displaylogs", protectRoute, displayLogs);
router.get("/logout", protectRoute, logoutUser);

module.exports = router;
