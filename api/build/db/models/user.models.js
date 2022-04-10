"use strict";
const mongoose = require("../db");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        set: (password) => {
            return bcrypt.hashSync(password, 10);
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
