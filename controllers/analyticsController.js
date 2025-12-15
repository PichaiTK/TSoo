// server/controllers/analyticsController.js
const { getDailyAnalytics } = require("../services/analyticsService");

exports.getDaily = async (req, res) => {
  const data = await getDailyAnalytics();
  res.json(data);
};
