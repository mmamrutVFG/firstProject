const express = require("express");

const router = express.Router();
const supplierController = require("../controllers/supplier.controller");

router.get("/getAll", async (req, res, next) => {
  try {
    const result = await supplierController.getSupplierData();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await supplierController.createSupplierData(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    await supplierController.deleteSupplierById(req.params);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

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

module.exports = router;
