const createError = require("http-errors");
const { Product } = require("../models");

exports.getProductData = async () => {
  try {
    return Product.findAll();
  } catch (err) {
    throw createError(500, "Db error"); // {attributes: {nombre:data.nombre}} pasarle mas datos para identificar el error
  }
};

exports.createProductData = async (data) => {
  try {
    await Product.create(data);
  } catch (err) {
    throw createError(501, "Not able to create product", {
      attributes: { id: data.id },
    });
  }
};

exports.deleteProductById = async ({ id }) => {
  try {
    await Product.destroy({ where: { id } });
  } catch (err) {
    throw createError(501, "Not able to delete the product", {
      attributes: { id },
    });
  }
};

exports.deleteAllProducts = async ({ id }) => {
  try {
    await Product.destroy({ where: {} });
  } catch (err) {
    throw createError(501, "Not able to delete the product", {
      attributes: { id },
    });
  }
};
