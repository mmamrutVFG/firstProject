const express = require("express");

const router = express.Router();
const userRoute = require("./user.routes");
const productRoute = require("./product.routes");

router.use("/user", userRoute);
router.use("/product", productRoute);

module.exports = router;
