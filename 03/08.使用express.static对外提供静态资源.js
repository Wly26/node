const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
// http://127.0.0.1/files
app.use('/files', express.static('./files'))
// http://127.0.0.1
app.use(express.static('./clock'))

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
