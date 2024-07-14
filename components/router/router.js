"use strict";

const express = require("express");
const {User} = require("../user/entity/UserEntity")
const router = express.Router();

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
        console.log('============'+ err +'============' )
        return res.json({success:false, err})
      }
    })


module.exports = router;