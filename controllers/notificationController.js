// server/controllers/notificationController.js
const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  const notifs = await Notification.find().sort({ createdAt: -1 }).limit(50);
  res.json(notifs);
};

exports.createNotification = async (req, res) => {
  const notif = await Notification.create(req.body);
  // broadcast realtime
  const io = req.app.get("io");
  io.emit("notification", notif);
  res.json(notif);
};
