// 业务逻辑处理
const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create(name, email);
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
