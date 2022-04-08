import express from "express";
import User from "../db/models/user.models";
const router = express.Router();

// handle login
router.get("/", (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    return res.status(400).json({
      message: "username, password are required",
    });
  }
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "username or password is incorrect",
        });
      }
      if (user.password !== password) {
        return res.status(400).json({
          message: "username or password is incorrect",
        });
      }
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    });
});

export = router;
