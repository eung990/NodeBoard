"use strict";

const express = require("express");
const router = express.Router();
const User = require("../user/model/UserModel")
const { auth } = require("../../middleware/auth");
const { reserved } = require("mongoose/lib/schema");

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/sign", (req, res) => {
  res.render("signUp");
});


router.post("/signUp", async (req, res) => {
  const user = new User(req.body)

  try {
    const isEmail = await User.findOne({ email: req.body.email });
    if (isEmail) return res.json({ success: false, message: "이미 존재하는 이메일입니다" });
    const isName = await User.findOne({ userName: req.body.userName });
    if (isName) return res.json({ success: false, message: "이미 존재하는 이름입니다" });

    await user.save();
    return res.status(200).json({ success: true })
  } catch (err) {
    console.log('============ ' + err + ' ============')
    return res.json({ success: false, err })
  }
});

router.post("/login", async (req, res) => {
  //요청된 id,pw가 db에 있는지 확인
  //있으면 비교 후 맞다면 토큰 생성

  // const user =  new User(req.body);

  await User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "계정이 존재하지 않습니다"
        })
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다"
          });
        }
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, _id: user._id })
        })
      })

    })

    .catch((err) => {
      console.log(err);
    });
});

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

router.get('/api/users/logout', auth, (req, res) => {
  //유저를 찾아서 업데이트 시킴
  var userUpdate = User.findOneAndUpdate({_id:req.user._id},{token:""});

  if(!userUpdate){
    return res.json({
      success:  false,
      err
    })
  }

  return res.status(200).send({
    success:true
  })

  //   User.findOneAndUpdate(
//     { _id: req.user._id }
//     , { token: "" }
//     , (err, user) => {
//       if (err) return res.json({
//         success: false, err

//       })
//       return res.status(200).send({
//         success: true,
//       })
//     })
 })
module.exports = router;