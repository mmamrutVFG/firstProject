const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");
const { createUserSchema } = require("../utils/userValidators");
const { validateBodyMW } = require("../utils/validateSchemas");

router.get("/getAll", async (req, res, next) => {
  try {
    const result = await userController.getUsersData();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/create",
  validateBodyMW(createUserSchema),
  async (req, res, next) => {
    try {
      await userController.createUserData(req.body);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/delete/:id", async (req, res, next) => {
  try {
    await userController.deleteUserById(req.params); // params se usa cuando paso la info dentro del URL
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteAll", async (req, res, next) => {
  try {
    await userController.deleteAllUsers();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get("/productSuppliersByUser/:id", async (req, res, next) => {
  try {
    const result = await userController.productSuppliersByUser(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
