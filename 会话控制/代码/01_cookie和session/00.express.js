// 导入 express
const express = require('express');
//创建应用对象
const app = express();

//创建路由规则
app.get("/", (req, res) => {
  res.send("express基础模版");
});

//启动服务
app.listen(3000);