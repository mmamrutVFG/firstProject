const createError = require("http-errors");
const { User, Person } = require("../models");

exports.getUsersData = async () => {
  try {
    return User.findAll({
      include: [{ model: Person }],
    });
  } catch (err) {
    throw createError(500, "Db error"); // {attributes: {nombre:data.nombre}} pasarle mas datos para identificar el error
  }
};

exports.createUserData = async (data) => {
  try {
    await User.create(data, { include: Person });
  } catch (err) {
    throw createError(501, "Not able to create user", {
      attributes: { name: data.name },
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
