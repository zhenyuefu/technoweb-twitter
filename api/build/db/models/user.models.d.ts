import mongoose = require("../db");
interface IUser {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
    updatedAt?: Date;
}
declare const User: mongoose.Model<IUser>;
export = User;
