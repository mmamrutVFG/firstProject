const express = require("express");
const passport = require("passport");
const Twilio = require("twilio");

const accountSid = "AC7ebbeae3ed62a7ef155a1246a53d6088";
const authToken = "b250eab754ed52a6715f598898ef743e";

const router = express.Router();
const productController = require("../controllers/product.controller");
const { idSchema } = require("../utils/generalValidator");
const { createProductSchema } = require("../utils/productValidator");
const {
  validateBodyMW,
  validateParamsMW,
} = require("../utils/validateSchemas");
const { rolAuthenticator } = require("../utils/roles");
const upload = require("../utils/uploadingFiles");

router.get(
  "/getAll",
  // passport.authenticate("jwt", { session: false }),
  // rolAuthenticator("Admin"),
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

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    await productController.upload(req.file);
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});

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
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await productController.associateUser(req.params.id, req.body.userId);
      const client = new Twilio(accountSid, authToken);
      const { name } = req.user.person;
      const productName = await productController.getProductById(req.params.id);

      client.messages
        .create({
          body: `Dear ${name} you have been assigned product ${productName.name} correctly`,
          to: req.user.person.celphone, // Text this number
          from: "+19374428740", // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
