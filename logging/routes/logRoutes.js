const express = require("express");
const { createLog, displayLogs } = require("../controllers/logController");
const router = express.Router();

router.post("/", createLog);
router.get("/display", displayLogs);

module.exports = router;
