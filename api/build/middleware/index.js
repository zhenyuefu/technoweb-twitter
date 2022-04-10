"use strict";
// 专门注册中间件
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const routes_1 = __importDefault(require("../routes"));
const SESSION_SECRET = process.env.SESSION_SECRET || "";
if (!SESSION_SECRET) {
    throw new Error("Please define the SESSION_SECRET environment variable inside .env");
}
const uri = process.env.MONGODB_URI || "";
if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}
module.exports = (app) => {
    // CORS跨域
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    // 解析请求体数据
    app.use(express.json());
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: uri,
            stringify: false,
            // 每天只更新1次
            touchAfter: 24 * 3600,
        }),
    }));
    app.use(passport.authenticate("session"));
    // 路由
    (0, routes_1.default)(app);
    // 静态文件
    app.use(express.static(path.join(__dirname, "../../", "dist")));
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../../", "dist", "/index.html"));
    });
};
