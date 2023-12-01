const express = require('express');
const app = express();

app.use(express.json()); // 用于解析JSON请求体

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});