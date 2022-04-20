const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const nodemailer = require("nodemailer");

const { User, Person, Product, Supplier } = require("../models");

const confirmationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
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

exports.getUsersData = async () => {
  try {
    const users = await User.findAll({
      include: [{ model: Person }, { model: Product }],
      // raw: true,
    });

    const data = users.map((user) => {
      const aux = {};

      aux.id = user.id;
      aux.name = user.person.name;
      aux.products = user.products.map((product) => product.name).join(" - ");
      return aux;
    });
    return data;
  } catch (err) {
    throw createError(500, "Db error"); // {attributes: {nombre:data.nombre}} pasarle mas datos para identificar el error
  }
};

exports.getUserById = async ({ id }) => {
  try {
    return await User.findOne({ where: { id } });
  } catch (err) {
    throw createError(500, "Db error");
  }
};

exports.createUserData = async (rawData) => {
  try {
    const data = { ...rawData, person: { ...rawData.person } }; // ... hace una copia, si no lo pongo hace solo un puntero
    const passwordHashed = await bcryptjs.hash(
      data.password,
      +process.env.SALT_ROUNDS
    );
    data.password = passwordHashed;
    const user = await User.create(data, { include: Person });
    confirmationEmail(user);
    return user;
  } catch (err) {
    throw createError(501, "Not able to create user", {
      attributes: { name: rawData.name },
    });
  }
};

exports.login = async (rawData) => {
  try {
    const data = { ...rawData };
    const user = await User.findOne({
      where: { email: data.email },
      include: [{ model: Person, attributes: ["celphone", "name"] }],
    });
    if (!user || !bcryptjs.compare(data.password, user.password)) {
      throw createError(401, "Incorrect user or password");
    }
    const { id, email, role, person } = user;
    return jwt.sign({ id, email, role, person }, process.env.JWT_SECRET, {});
  } catch (err) {
    throw createError(401, "Not able to login");
  }
};

exports.deleteUserById = async ({ id }) => {
  try {
    await User.destroy({ where: { id } });
  } catch (err) {
    throw createError(501, "Not able to delete the user", {
      attributes: { id },
    });
  }
};

exports.deleteAllUsers = async () => {
  try {
    await User.destroy({ where: {} });
  } catch {
    createError(501, "Note able to delete all users");
  }
};

exports.productSuppliersByUser = async (userId) => {
  try {
    return User.findByPk(userId, {
      include: [
        {
          model: Product,
          attributes: ["name"],
          include: [
            {
              model: Supplier,
              through: { where: { stock: 1 }, attributes: ["stock"] },
              attributes: ["name"],
            },
          ],
        },
        {
          model: Person,
          required: true, // Trae a todos los usuarios que necesariamente tienen persona asociada
          attributes: ["name"],
        },
      ],
      logging: console.log,
    });
  } catch (err) {
    throw createError(500, "Db error"); // {attributes: {nombre:data.nombre}} pasarle mas datos para identificar el error
  }
};
