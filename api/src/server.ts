import express from "express";
const app = express();

import dotenv = require("dotenv");
dotenv.config();

import client from "./db/db";

client.then(() => {
  console.log("db connected");
});

// 注册中间件
import middleware = require("./middleware");
middleware(app);

app.use((req, res) => {
  res.redirect("/404");
});

app.listen(8000, () => {
  console.log(`http://localhost:8000`);
});
