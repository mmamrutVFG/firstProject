const express = require("express");
const passport = require("passport");

const router = express.Router();
const productController = require("../controllers/product.controller");
const { idSchema } = require("../utils/generalValidator");
const { createProductSchema } = require("../utils/productValidator");
const {
  validateBodyMW,
  validateParamsMW,
} = require("../utils/validateSchemas");
const { rolAuthenticator } = require("../utils/roles");

router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  rolAuthenticator("Admin"),
  async (req, res, next) => {
    try {
      const result = await productController.getProductData();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/create",
  validateBodyMW(createProductSchema),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await productController.createProductData(req.body);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/delete/:id",
  validateParamsMW(idSchema),
  async (req, res, next) => {
    try {
      await productController.deleteProductById(req.params); // params se usa cuando paso la info dentro del URL
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/deleteAll", async (req, res, next) => {
  try {
    await productController.deleteAllProducts();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/associateTo/:id",
  validateParamsMW(idSchema),
  async (req, res, next) => {
    try {
      await productController.associateUser(req.params.id, req.body.userId);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
