const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const CTRL = require("../comment/controller/CommentController")

router.post("/uploadComment",auth, CTRL.input.uploadComment);

router.post("/getComment", CTRL.input.getComment);


module.exports = router;