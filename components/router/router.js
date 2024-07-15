"use strict";

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const userSchema = require("../user/entity/UserEntity")
const {UserMiddleware} = require("../user/dao/UserDao")

const userMdw = UserMiddleware.PwBcrypt(userSchema)
const User = mongoose.model('User', userMdw);

router.get("/",(req,res) => {
    res.render("login");
});

router.get("/sign",(req,res) => {
    res.render("signUp");
});


router.post("/signUp", async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save();
        return res.status(200).json({success:true})
      } catch (err) {
        console.log('============ '+ err +' ============' )
        return res.json({success:false, err})
      }
    })

router.post("/login",(req,res) => {
      //요청된 id,pw가 db에 있는지 확인
      //있으면 비교 후 맞다면 토큰 생성

      User.findOne({userId:req.body.userId}, (err,userInfo) => {
        if(!userInfo) {
          return res.json({
            loginSuccess: false,
            message: "계정이 존재하지 않습니다"
          })
        }
      });

      user.comparePassword(req.body.password)
      
  });

module.exports = router;