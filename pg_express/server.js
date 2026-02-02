// 应用入口
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const pool = require("./config/db");

const app = express();

// 中间件
app.use(bodyParser.json());
app.use("/api", userRoutes);

// 健康检查端点
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "OK" });
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// POST 接口：查询 test 表
app.post("/data", async (req, res) => {
  try {
    // 执行查询
    const result = await pool.query("SELECT * FROM test");

    console.log("Query result:", result); // Add this line


    // 返回查询结果
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    // 记录错误日志
    console.error("Database query error:", err);

    // 返回错误响应
    res.status(500).json({
      error: "Failed to fetch data",
      details: err.message,
    });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});