"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require("express");
const user_models_1 = __importDefault(require("../db/models/user.models"));
const router = express.Router();
router.post("/", async (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email) {
        return res.status(422).json({
            message: "username, password, email are required",
        });
    }
    try {
        const user = await user_models_1.default.findOne({ username });
        if (user) {
            return res.status(422).json({
                message: "username already exists",
            });
        }
        const newUser = await user_models_1.default.create({
            username,
            password,
            email,
            firstName,
            lastName,
        });
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
module.exports = router;
