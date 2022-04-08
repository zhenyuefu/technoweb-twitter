import express from "express";
import userRouter = require("./users");
import loginRouter = require("./login");
// const chatRouter = require("./chat");
// const testRouter = require("./test");

const routes: (app: express.Application) => void = (app) => {
  app.use("/api/login", loginRouter);
  app.use("/api/user", userRouter);
};

export = routes;
