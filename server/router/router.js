"use strict";

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const CTRL = require("../user/controller/UserController")


router.get("/", (req, res) => {
  res.render("login");
});

router.get("/sign", (req, res) => {
  res.render("signUp");
});

router.get("/api/hello", (req, res) => {
  res.send("hello");
});


router.post("/api/users/signUp", CTRL.input.signUp);

router.post("/api/users/login", CTRL.input.login);

router.get('/api/users/logout', auth, CTRL.input.loginOut)

router.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,

  })
})


module.exports = router;