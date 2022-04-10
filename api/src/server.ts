import dotenv = require("dotenv");
dotenv.config();

import express = require("express");
const app = express();

import middleware from "./middleware";

// 注册中间件
middleware(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(`http://localhost:443`);
});

// module.exports = app;
