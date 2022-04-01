const express = require("express");

const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/getAll", async (req, res, next) => {
  try {
    const result = await userController.getUsersData();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await userController.createUserData(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

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

module.exports = router;
