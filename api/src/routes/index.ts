import express = require("express");
import userRouter from "./user";
import authRouter from "./auth";

const routes: (app: express.Application) => void = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/auth", authRouter);
};

export = routes;
