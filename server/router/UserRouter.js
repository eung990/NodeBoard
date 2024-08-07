"use strict";

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const CTRL = require("../user/controller/UserController")

router.post("/signUp", CTRL.input.signUp);

router.post("/login", CTRL.input.login);

router.get('/logout', auth, CTRL.input.loginOut)

router.get('/auth', auth, CTRL.input.userAuth)

router.get('/findAllUsers', auth, CTRL.input.findAllUsers)

router.delete('/deleteUser', auth, CTRL.input.deleteUser)



module.exports = router;