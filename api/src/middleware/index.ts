// 专门注册中间件

import express from "express";
import cors from "cors";
import path from "path";

import routes from "../routes";

export = (app: express.Application) => {
  // CORS跨域
  const corsOpt = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOpt));

  // 静态文件托管
  app.use(express.static(path.join(__dirname, "public")));

  // 解析请求体数据
  app.use(express.json());

  // 路由
  routes(app);
};
