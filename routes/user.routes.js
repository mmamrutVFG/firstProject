const { stringify } = require("csv-stringify");
const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");
const { idSchema } = require("../utils/generalValidator");
const { createUserSchema } = require("../utils/userValidators");
const {
  validateBodyMW,
  validateParamsMW,
} = require("../utils/validateSchemas");

const usersReport = (res, data) => {
  res.set({
    "Content-Disposition": `attachment; filename="UserReport.csv"`,
    "attachment-filename": `UserReport.csv`,
    "Access-Control-Expose-Headers": `attachment-filename`,
  });
  // const columns = ["ID", "NAME", "PRODUCTS"];

  stringify(data, { delimiter: ";", header: true }).pipe(res);
};

router.get("/getAll", async (req, res, next) => {
  try {
    const result = await userController.getUsersData();
    usersReport(res, result);
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

router.post("/login", async (req, res, next) => {
  try {
    const token = await userController.login(req.body);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

router.delete(
  "/delete/:id",
  validateParamsMW(idSchema),
  async (req, res, next) => {
    try {
      await userController.deleteUserById(req.params); // params se usa cuando paso la info dentro del URL
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/deleteAll", async (req, res, next) => {
  try {
    await userController.deleteAllUsers();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/productSuppliersByUser/:id",
  validateParamsMW(idSchema),
  async (req, res, next) => {
    try {
      const result = await userController.productSuppliersByUser(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
