const bcryptjs = require("bcryptjs");
const createError = require("http-errors");
const { User, Person, Product, Supplier } = require("../models");

exports.getUsersData = async () => {
  try {
    return User.findAll({
      include: [{ model: Person }, { model: Product }],
    });
  } catch (err) {
    throw createError(500, "Db error"); // {attributes: {nombre:data.nombre}} pasarle mas datos para identificar el error
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
    await User.create(data, { include: Person });
  } catch (err) {
    throw createError(501, "Not able to create user", {
      attributes: { name: rawData.name },
    });
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
