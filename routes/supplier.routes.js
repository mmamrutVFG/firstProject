const express = require("express");

const router = express.Router();
const supplierController = require("../controllers/supplier.controller");
const { idSchema } = require("../utils/generalValidator");
const { createSupplierSchema } = require("../utils/supplierValidator");
const {
  validateBodyMW,
  validateParamsMW,
} = require("../utils/validateSchemas");

router.get("/getAll", async (req, res, next) => {
  try {
    const result = await supplierController.getSupplierData();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/create",
  validateBodyMW(createSupplierSchema),
  async (req, res, next) => {
    try {
      await supplierController.createSupplierData(req.body);
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
      await supplierController.deleteSupplierById(req.params);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/deleteAll", async (req, res, next) => {
  try {
    await supplierController.deleteAllSuppliers();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put("/associateTo/:id", async (req, res, next) => {
  try {
    await supplierController.associateSupplier(
      req.params.id,
      req.body.productId
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/numberOfProducts/:id",
  validateParamsMW(idSchema),
  async (req, res, next) => {
    try {
      const result = await supplierController.numberOfProducts(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/productNameBySupplier/:id",
  validateParamsMW(idSchema),
  async (req, res, next) => {
    try {
      const result = await supplierController.productNameBySupplier(
        req.params.id
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
