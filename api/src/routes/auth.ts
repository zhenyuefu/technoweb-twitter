import express = require("express");
import User from "../db/models/user.models";
import bcrypt = require("bcrypt");
import passport = require("passport");
import passportlocal = require("passport-local");

const LocalStrategy = passportlocal.Strategy;
const router = express.Router();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ username }).exec();
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
    } catch (error) {
      return cb(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  console.log("serializeUser", user);
  process.nextTick(function () {
    cb(null, user.id);
  });
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();

    if (!user) {
      return done(null, false);
    }
    done(null, { id: String(user._id), username: user.username });
  } catch (error) {
    done(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/" + req.user?.username);
  }
);

router.post("/logout", async (req, res) => {
  req.logout();
  res.redirect("/i/flow/login");
});

// async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(422).json({
//       message: "username, password are required",
//     });
//   }
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(422).json({
//         message: "username or password is incorrect",
//       });
//     }
//     if (!bcrypt.compareSync(password, user.password)) {
//       return res.status(422).json({
//         message: "username or password is incorrect",
//       });
//     }
//     req.session.userId = String(user._id);
//     res.send({
//       user,
//       message: "login success",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// }
// );

export = router;
