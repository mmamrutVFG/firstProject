const express = require("express");

const router = express.Router();
const userRoute = require("./user.routes");
const productRoute = require("./product.routes");
const supplierRoute = require("./supplier.routes");

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/supplier", supplierRoute);

module.exports = router;
