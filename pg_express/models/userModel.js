// 数据库模型
const db = require("../config/db");

const User = {
  create: async (name, email) => {
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    return await db.query(query, [name, email]);
  },
  findAll: async () => {
    const query = "SELECT * FROM users";
    return await db.query(query);
  },
};

module.exports = User;
