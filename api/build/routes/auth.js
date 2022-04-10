"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require("express");
const user_models_1 = __importDefault(require("../db/models/user.models"));
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportlocal = require("passport-local");
const LocalStrategy = passportlocal.Strategy;
const router = express.Router();
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await user_models_1.default.findOne({ username }).exec();
        if (!user) {
            return cb(null, false, { message: "Incorrect username or password" });
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return cb(null, false, { message: "Incorrect username or password" });
        }
        return cb(null, {
            id: String(user._id),
            username: user.username,
        });
    }
    catch (error) {
        return cb(error);
    }
}));
passport.serializeUser((user, cb) => {
    console.log("serializeUser", user);
    cb(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await user_models_1.default.findById(id).exec();
        if (!user) {
            return done(null, false);
        }
        done(null, { id: String(user._id), username: user.username });
    }
    catch (error) {
        done(error);
    }
});
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        return res.send({
            auth: true,
            id: req.user.id,
            username: req.user.username,
        });
    }
    return res.send({ auth: false });
});
router.post("/login", (req, res, next) => {
    if (req.body.remember) {
        // cookies 有效期7天
        req.session.cookie.maxAge = 7 * 24 * 3600 * 1000;
    }
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({
                message: "Login successful",
                uid: user.id,
                username: user.username,
            });
        });
    })(req, res, next);
});
// (req, res, next) => {
//   req.session.save((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.send({
//       message: "Login successful",
//       user: req.user,
//     });
//   });
// }
// );
router.post("/logout", async (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.send({ message: "Logout successful" });
    });
});
module.exports = router;