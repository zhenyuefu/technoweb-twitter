"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGODB_URI || "";
if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});
module.exports = mongoose_1.default;
