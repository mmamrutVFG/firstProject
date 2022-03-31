const createError = require("http-errors");
const { User } = require("../models");

exports.getUsersData = async () => {
  try {
    await User.findAll();
  } catch (err) {
    throw createError(500, "Db error"); // {attributes: {nombre:data.nombre}} pasarle mas datos para identificar el error
  }
};

exports.createUserData = async (data) => {
  try {
    User.create(data);
  } catch (err) {
    throw createError(501, "Not able to create user", {
      attributes: { name: data.name },
    });
  }
};

exports.deleteUserById = async ({ id }) => {
  try {
    User.destroy({ where: { id } });
  } catch (err) {
    throw createError(501, "Not able to delete the user", {
      attributes: { id },
    });
  }
};
