const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const CTRL = require("../comment/controller/CommentController")

router.post("/uploadComment",auth, CTRL.input.uploadComment);

module.exports = router;