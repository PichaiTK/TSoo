// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY_CHANGE_ME", {
    expiresIn: "7d"
  });

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await User.create({ email, password, name, role });
  const token = signToken(user);
  res.json({ user: { id: user._id, email, name, role: user.role }, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Email/Password ไม่ถูกต้อง" });
  }
  const token = signToken(user);
  res.json({ user: { id: user._id, email, name: user.name, role: user.role }, token });
};
