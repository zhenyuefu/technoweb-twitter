import dotenv = require("dotenv");
dotenv.config();

import express = require("express");
const app = express();
import path = require("path");
import middleware from "./middleware";
import passport = require("passport");

import session = require("express-session");
import MongoStore = require("connect-mongo");

const SESSION_SECRET = process.env.SESSION_SECRET || "";
if (!SESSION_SECRET) {
  throw new Error(
    "Please define the SESSION_SECRET environment variable inside .env"
  );
}

const uri = process.env.MONGODB_URI || "";
if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri,
      stringify: false,
      touchAfter: 24 * 3600,
    }),
  })
);

app.use(passport.authenticate("session"));
app.use(express.json());

// 注册中间件
middleware(app);

app.use(express.static(path.join(__dirname, "../../", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "dist", "/index.html"));
});

app.listen(8000, () => {
  console.log(`http://localhost:8000`);
});
