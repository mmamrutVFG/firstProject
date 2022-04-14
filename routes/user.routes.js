const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
const userController = require("../controllers/user.controller");
const { idSchema } = require("../utils/generalValidator");
const { createUserSchema } = require("../utils/userValidators");
const {
  validateBodyMW,
  validateParamsMW,
} = require("../utils/validateSchemas");

// Esta función va acá o en el controller?
const confirmationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "d249965b1a0647",
      pass: "abaa1156a13242",
    },
  });

  await transporter.sendMail({
    from: "maurimamrut@gmail.com", // sender address
    to: user.email, // list of receivers
    subject: `${user.person.name} , your user was created succesfully`,
    text: "User created",
    html: "<b>Welcome</b>",
  });
};

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
      const user = await userController.createUserData(req.body);
      confirmationEmail(user);
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
