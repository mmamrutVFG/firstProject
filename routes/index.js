const express = require("express");
const passport = require("passport");

const router = express.Router();
const userRoute = require("./user.routes");
const productRoute = require("./product.routes");
const supplierRoute = require("./supplier.routes");

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use(
  "/supplier",
  passport.authenticate("jwt", { session: false }),
  supplierRoute
);

module.exports = router;
