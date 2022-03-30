const express = require("express");

const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/getAll", async (req, res) => {
  const result = await userController.getUsersData();
  res.status(200).json(result);
});

router.post("/create", async (req, res) => {
  await userController.createUserData(req.body);
  res.sendStatus(201);
});

router.delete("/delete/:id", async (req, res) => {
  await userController.deleteUserById(req.params); // params se usa cuando paso la info dentro del URL
  res.sendStatus(200);
});

module.exports = router;
