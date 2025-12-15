// server/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/authMiddleware");
const { getNotifications, createNotification } = require("../controllers/notificationController");

router.get("/", auth, requireRole(["admin", "editor"]), getNotifications);
router.post("/", auth, requireRole(["admin"]), createNotification);

module.exports = router;
