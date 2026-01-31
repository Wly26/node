// 数据库连接配置
const pgp = require("pg-promise")(); // Initialize pg-promise
require("dotenv").config();

// Create a database instance
const db = pgp({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "test",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
});

module.exports = db;
