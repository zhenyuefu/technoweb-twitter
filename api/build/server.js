"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const middleware_1 = __importDefault(require("./middleware"));
// 注册中间件
(0, middleware_1.default)(app);
// app.listen(8000, () => {
//   console.log(`http://localhost:8000`);
// });
module.exports = app;
