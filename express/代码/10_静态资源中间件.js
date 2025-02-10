//导入 express
const express = require('express');

//创建应用对象
const app = express();

// 路由和中间件，谁在前，谁先响应，这里是先响应中间件

//静态资源中间件设置
//__dirname 当前文件所在的目录
// http://localhost:3000/css/app.css
// http://localhost:3000/index.html
app.use(express.static(__dirname + '/public'));

//创建路由
app.get('/', (req, res) => {
  res.send('我才是首页~~~');
});

//监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口 3000 正在监听中....')
})