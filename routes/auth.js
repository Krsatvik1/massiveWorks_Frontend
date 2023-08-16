const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
/* POST login. */
router.post("/login", async function (req, res, next) {
  const captcha = req.body.captcha;

  try {
    // Send a POST request to the Google reCAPTCHA API
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      {},
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha,
        },
      }
    );

    // Check the score to see if the captcha is valid
    if (response.data.score < 0.5) {
      // The captcha is not valid, return an error
      return res
        .status(400)
        .json({ success: false, message: "reCAPTCHA failed" });
    }
  } catch (err) {
    // There was an error with the reCAPTCHA API
    return res
      .status(500)
      .json({ success: false, message: "Error verifying reCAPTCHA" });
  }
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(user, err);
    if (!user) {
      console.log("ekd;eokd;qojelgw" + user);
      return res.status(401).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      console.log(user.id)
      const token = jwt.sign( {user_id : user.id} , process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res
        .cookie("jwt", token, {
          httpOnly: true,
          signed: true,
          secure: true,
        })
        .status(200)
        .json({ userid: user.id, name: user.name, role: user.role, field: user.field});
    });
  })(req, res);
});

module.exports = router;
