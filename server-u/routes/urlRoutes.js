const express = require("express");
const {
  shortenUrl,
  redirectUrl,
  getStats,
  getStatsList
} = require("../controllers/urlController");
const { protectRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/shorturls", protectRoute, shortenUrl);
router.get("/:code", redirectUrl);
router.get("/shorturls/getAll", protectRoute, getStatsList);
router.get("/shorturls/:code", protectRoute, getStats);

module.exports = router;
