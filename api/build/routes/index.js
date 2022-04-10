"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const routes = (app) => {
    app.all("/api", (req, res) => {
        // res.setHeader("Content-Type", "text/html");
        res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    });
    app.use("/api/user", user_1.default);
    app.use("/api/auth", auth_1.default);
};
module.exports = routes;
