// 专门注册中间件

import express = require("express");
import cors = require("cors");
import path = require("path");

import routes from "../routes";

export = (app: express.Application) => {
  // CORS跨域
  app.use(cors());

  // 静态文件托管
  app.use(express.static(path.join(__dirname, "public")));

  // 解析请求体数据
  app.use(express.json());

  // 路由
  routes(app);
};
