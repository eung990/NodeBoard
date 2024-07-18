"use strict";

const express = require("express");
const router = express.Router();
const User = require("../user/model/UserModel")
const { auth } = require("../middleware/auth");
const CTRL = require("../user/controller/UserController")


router.get("/", (req, res) => {
  res.render("login");
});

router.get("/sign", (req, res) => {
  res.render("signUp");
});


router.post("/signUp", CTRL.input.signUp);

router.post("/login", CTRL.input.login);

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

router.get('/api/users/logout', auth, async (req, res) => {
  //유저를 찾아서 업데이트 시킴
  console.log("====req.user._id=====" + req.user._id + "==========")
  console.log("====req.token=====" + req.token + "==========")
  var userUpdate = await User.findOneAndUpdate({ token: "" });
  console.log("====userUpdate=====" + userUpdate + "==========")
  if (!userUpdate) {
    return res.json({
      success: false,

    })
  }

  return res.status(200).send({
    success: true
  })

})
module.exports = router;