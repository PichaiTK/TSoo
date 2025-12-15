// server/routes/analyticsRoutes.js
const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/authMiddleware");
const { getDaily } = require("../controllers/analyticsController");

router.get("/daily", auth, requireRole(["admin"]), getDaily);

module.exports = router;
