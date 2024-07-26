const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const CTRL = require("../product/controller/ProductController")

router.post("/uploadImage",auth, CTRL.input.uploadImage);

router.post("/uploadProduct",auth, CTRL.input.uploadProduct);

// router.get("/getProduct",auth, CTRL.input.getProduct);

router.get("/getProduct", CTRL.input.getProduct);

router.get("/products_by_id", CTRL.input.getProductById);

router.delete("/delete_product",auth, CTRL.input.deleteProduct);

module.exports = router;